export const initializeDummyData = () => {
  if (typeof window === "undefined") return;

  if (!localStorage.getItem("users")) {
    localStorage.setItem(
      "users",
      JSON.stringify([{ username: "admin", email: "admin@example.com", password: "password123" }])
    );
  }

  if (!localStorage.getItem("tasks")) {
    localStorage.setItem(
      "tasks",
      JSON.stringify([
        { id: 1, text: "Finish the Next.js project", completed: false },
        { id: 2, text: "Review UI simplicity", completed: true },
        { id: 3, text: "Deploy to Vercel", completed: false },
      ])
    );
  }

  if (!localStorage.getItem("activities")) {
    localStorage.setItem(
      "activities",
      JSON.stringify([
        { id: 1, action: "Logged in", date: new Date().toISOString() },
        { id: 2, action: "Completed task: Review UI simplicity", date: new Date().toISOString() },
      ])
    );
  }
};

export const isAuthenticated = () => {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("isLoggedIn") === "true";
};

export const loginUser = (email: string, password: string) => {
  if (typeof window === "undefined") return false;
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const user = users.find((u: any) => u.email === email && u.password === password);
  if (user) {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("currentUser", JSON.stringify({ username: user.username, email: user.email }));
    return true;
  }
  return false;
};

export const signupUser = (username: string, email: string, password: string) => {
  if (typeof window === "undefined") return false;
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const exists = users.find((u: any) => u.email === email);
  if (exists) return false;

  users.push({ username, email, password });
  localStorage.setItem("users", JSON.stringify(users));
  return true;
};

export const logoutUser = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("currentUser");
};

export const getTasks = () => {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem("tasks") || "[]");
};

export const addTask = (text: string) => {
  if (typeof window === "undefined") return;
  const tasks = getTasks();
  const newTask = { id: Date.now(), text, completed: false };
  localStorage.setItem("tasks", JSON.stringify([...tasks, newTask]));
};

export const toggleTask = (id: number) => {
    if (typeof window === "undefined") return;
    const tasks = getTasks();
    const updated = tasks.map((t: any) => t.id === id ? { ...t, completed: !t.completed } : t);
    localStorage.setItem("tasks", JSON.stringify(updated));
};

export const getActivities = () => {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem("activities") || "[]");
};

export const addActivity = (action: string) => {
  if (typeof window === "undefined") return;
  const activities = getActivities();
  const newActivity = { id: Date.now(), action, date: new Date().toISOString() };
  localStorage.setItem("activities", JSON.stringify([newActivity, ...activities]));
};

export const getCurrentUser = () => {
    if (typeof window === "undefined") return null;
    const userStr = localStorage.getItem("currentUser");
    return userStr ? JSON.parse(userStr) : null;
}
