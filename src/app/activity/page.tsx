"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated, getActivities, addActivity } from "@/lib/localStorageData";

export default function ActivityPage() {
    const router = useRouter();
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isAuthenticated()) {
            router.push("/login");
        } else {
            setActivities(getActivities());
            setLoading(false);
        }
    }, [router]);

    const handleClearActivities = () => {
        localStorage.removeItem("activities");
        addActivity("Cleared activity log");
        setActivities(getActivities());
    };

    if (loading) return <div style={{ padding: "20px" }}>Loading...</div>;

    return (
        <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto", border: "1px solid #000" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2>Activity Log</h2>
                <button onClick={handleClearActivities} style={{ padding: "5px", cursor: "pointer", border: "1px solid #333", background: "#eee" }}>
                    Clear
                </button>
            </div>
            
            <ul style={{ listStyle: "circle", paddingLeft: "20px" }}>
                {activities.map((act: any) => (
                    <li key={act.id} style={{ margin: "10px 0" }}>
                        <span style={{ fontWeight: "bold" }}>{act.action}</span>
                        <br />
                        <span style={{ fontSize: "12px", color: "#666" }}>{new Date(act.date).toLocaleString()}</span>
                    </li>
                ))}
            </ul>
            {activities.length === 0 && <p>No activity yet.</p>}
        </div>
    );
}
