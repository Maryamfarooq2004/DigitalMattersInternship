"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signupUser, initializeDummyData, addActivity } from "@/lib/localStorageData";

export default function SignupPage() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        initializeDummyData();
    }, []);

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        
        if (signupUser(username, email, password)) {
            addActivity("Created an account");
            router.push("/login");
        } else {
            setError("Email already exists");
        }
    };

    return (
        <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
            <h1>Sign Up</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSignup} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <div>
                    <label>Username: </label>
                    <input 
                        type="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                        style={{ padding: "5px", width: "100%", border: "1px solid #ccc" }}
                    />
                </div>
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
                    Sign Up
                </button>
            </form>
            <p style={{ marginTop: "20px" }}>
                Already have an account? <a href="/login" style={{ textDecoration: "underline" }}>Login</a>
            </p>
        </div>
    );
}