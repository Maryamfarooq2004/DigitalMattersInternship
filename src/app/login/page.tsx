"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { loginUser, initializeDummyData, addActivity } from "@/lib/localStorageData";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        initializeDummyData();
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        
        if (loginUser(email, password)) {
            addActivity("Logged in");
            router.push("/dashboard");
        } else {
            setError("Invalid email or password");
        }
    };

    return (
        <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
            <h1>Login</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <div>
                    <label>Email: </label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        style={{ padding: "5px", width: "100%", border: "1px solid #ccc" }}
                    />
                </div>
                <div>
                    <label>Password: </label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        style={{ padding: "5px", width: "100%", border: "1px solid #ccc" }}
                    />
                </div>
                <button type="submit" style={{ padding: "10px", cursor: "pointer", border: "1px solid #333", background: "#eee" }}>
                    Login
                </button>
            </form>
            <p style={{ marginTop: "20px" }}>
                Don't have an account? <a href="/signup" style={{ textDecoration: "underline" }}>Sign up</a>
            </p>
        </div>
    );
}