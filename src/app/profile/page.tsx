"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated, getCurrentUser } from "@/lib/localStorageData";

export default function ProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isAuthenticated()) {
            router.push("/login");
        } else {
            setUser(getCurrentUser());
            setLoading(false);
        }
    }, [router]);

    if (loading) return <div style={{ padding: "20px" }}>Loading...</div>;

    return (
        <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto", border: "2px dashed #666" }}>
            <h2>User Profile</h2>
            <div style={{ marginTop: "20px" }}>
                <p><strong>Username:</strong> {user?.username || "N/A"}</p>
                <p><strong>Email:</strong> {user?.email || "N/A"}</p>
            </div>
            <div style={{ marginTop: "30px", fontSize: "12px", color: "#666" }}>
                * Profile details are read from local storage.
            </div>
        </div>
    );
}