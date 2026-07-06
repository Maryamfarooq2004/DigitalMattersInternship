"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated, addActivity, logoutUser } from "@/lib/localStorageData";

export default function SettingsPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isAuthenticated()) {
            router.push("/login");
        } else {
            setLoading(false);
        }
    }, [router]);

    const handleClearAllData = () => {
        if (confirm("Are you sure you want to clear ALL local storage data? This will log you out and delete all tasks and activities.")) {
            localStorage.clear();
            logoutUser(); // also clears state if needed
            router.push("/login");
        }
    };

    if (loading) return <div style={{ padding: "20px" }}>Loading...</div>;

    return (
        <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto", border: "1px solid #000" }}>
            <h2>Settings</h2>
            
            <div style={{ marginTop: "30px", padding: "10px", border: "1px solid red", background: "#fee" }}>
                <h3 style={{ color: "red", margin: "0 0 10px 0" }}>Danger Zone</h3>
                <p>This action cannot be undone.</p>
                <button 
                    onClick={handleClearAllData} 
                    style={{ padding: "10px", cursor: "pointer", border: "1px solid darkred", background: "red", color: "white", fontWeight: "bold" }}
                >
                    Clear All Data & Logout
                </button>
            </div>
        </div>
    );
}
