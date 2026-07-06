export type StoredUser = {
  id: string;
  username: string;
  email: string;
  password: string;
};

export type AuthSession = {
  id: string;
  username: string;
  email: string;
};

export type AuthActivity = {
  id: string;
  type: "signup" | "login" | "logout" | "visit";
  label: string;
  detail: string;
  timestamp: string;
};

const USERS_KEY = "maryam_auth_users";
const SESSION_KEY = "maryam_auth_session";
const ACTIVITY_KEY = "maryam_auth_activity";

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") {
    return fallback;
  }

  const value = window.localStorage.getItem(key);
  if (!value) {
    return fallback;
  }

  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
}

export function getStoredUsers() {
  return readJson<StoredUser[]>(USERS_KEY, []);
}

export function getActivityLog() {
  return readJson<AuthActivity[]>(ACTIVITY_KEY, []);
}

export function recordActivity(type: AuthActivity["type"], label: string, detail: string) {
  const entries = getActivityLog();
  entries.unshift({
    id: crypto.randomUUID(),
    type,
    label,
    detail,
    timestamp: new Date().toISOString(),
  });

  writeJson(ACTIVITY_KEY, entries.slice(0, 20));
}

export function createStoredUser(username: string, email: string, password: string) {
  const users = getStoredUsers();
  const normalizedEmail = email.trim().toLowerCase();

  if (users.some((user) => user.email === normalizedEmail)) {
    throw new Error("User already exists");
  }

  const newUser: StoredUser = {
    id: crypto.randomUUID(),
    username: username.trim(),
    email: normalizedEmail,
    password,
  };

  users.push(newUser);
  writeJson(USERS_KEY, users);
  recordActivity("signup", "Account created", normalizedEmail);
  return newUser;
}

export function loginStoredUser(email: string, password: string) {
  const users = getStoredUsers();
  const normalizedEmail = email.trim().toLowerCase();
  const user = users.find((entry) => entry.email === normalizedEmail);

  if (!user) {
    throw new Error("User does not exist");
  }

  if (user.password !== password) {
    throw new Error("Invalid password");
  }

  const session: AuthSession = {
    id: user.id,
    username: user.username,
    email: user.email,
  };

  writeJson(SESSION_KEY, session);
  recordActivity("login", "Signed in", user.email);
  return session;
}

export function getCurrentSession() {
  return readJson<AuthSession | null>(SESSION_KEY, null);
}

export function logoutStoredUser() {
  const session = getCurrentSession();

  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(SESSION_KEY);
  if (session) {
    recordActivity("logout", "Signed out", session.email);
  }
}

export function getStoredUserById(userId: string) {
  return getStoredUsers().find((user) => user.id === userId) || null;
}