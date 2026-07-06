"use client";
import "./globals.css";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { isAuthenticated, logoutUser } from "@/lib/localStorageData";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loggedIn, setLoggedIn] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setLoggedIn(isAuthenticated());
  }, [pathname]);

  const handleLogout = () => {
    logoutUser();
    setLoggedIn(false);
    router.push("/login");
  };

  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "sans-serif", backgroundColor: "#f9f9f9", color: "#333" }}>
        <nav style={{ padding: "10px 20px", background: "#eee", borderBottom: "1px solid #ccc", display: "flex", justifyContent: "space-between" }}>
          <div style={{ fontWeight: "bold" }}>
            <Link href="/" style={{ textDecoration: "none", color: "#333" }}>My App</Link>
          </div>
          <div style={{ display: "flex", gap: "15px" }}>
            {loggedIn ? (
              <>
                <Link href="/dashboard" style={{ textDecoration: "none", color: "#333" }}>Dashboard</Link>
                <Link href="/activity" style={{ textDecoration: "none", color: "#333" }}>Activity</Link>
                <Link href="/profile" style={{ textDecoration: "none", color: "#333" }}>Profile</Link>
                <Link href="/settings" style={{ textDecoration: "none", color: "#333" }}>Settings</Link>
                <button onClick={handleLogout} style={{ background: "none", border: "none", cursor: "pointer", textDecoration: "underline", color: "#333", padding: 0 }}>Logout</button>
              </>
            ) : (
              <>
                <Link href="/login" style={{ textDecoration: "none", color: "#333" }}>Login</Link>
                <Link href="/signup" style={{ textDecoration: "none", color: "#333" }}>Sign Up</Link>
              </>
            )}
          </div>
        </nav>
        <main style={{ padding: "20px" }}>
          {children}
        </main>
      </body>
    </html>
  );
}
