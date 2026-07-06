"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated, getTasks, addTask, toggleTask, addActivity } from "@/lib/localStorageData";

export default function DashboardPage() {
    const router = useRouter();
    const [tasks, setTasks] = useState([]);
    const [newTaskText, setNewTaskText] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isAuthenticated()) {
            router.push("/login");
        } else {
            setTasks(getTasks());
            setLoading(false);
        }
    }, [router]);

    const handleAddTask = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTaskText.trim()) return;
        addTask(newTaskText);
        setTasks(getTasks());
        addActivity(`Added new task: ${newTaskText}`);
        setNewTaskText("");
    };

    const handleToggleTask = (id: number, text: string, currentlyCompleted: boolean) => {
        toggleTask(id);
        setTasks(getTasks());
        addActivity(currentlyCompleted ? `Uncompleted task: ${text}` : `Completed task: ${text}`);
    };

    if (loading) return <div style={{ padding: "20px" }}>Loading...</div>;

    return (
        <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto", border: "1px solid #000" }}>
            <h2>Dashboard - Tasks</h2>
            
            <form onSubmit={handleAddTask} style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
                <input 
                    type="text" 
                    value={newTaskText}
                    onChange={(e) => setNewTaskText(e.target.value)}
                    placeholder="New task..."
                    style={{ flex: 1, padding: "5px", border: "1px solid #999" }}
                />
                <button type="submit" style={{ padding: "5px 10px", cursor: "pointer", border: "1px solid #333", background: "#eee" }}>
                    Add
                </button>
            </form>

            <ul style={{ listStyle: "none", padding: 0 }}>
                {tasks.map((task: any) => (
                    <li key={task.id} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px", borderBottom: "1px solid #eee" }}>
                        <input 
                            type="checkbox" 
                            checked={task.completed} 
                            onChange={() => handleToggleTask(task.id, task.text, task.completed)}
                        />
                        <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
                            {task.text}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
