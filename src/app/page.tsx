"use client";
import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to My App</h1>
      <p>A very simple, hand-made style application.</p>
      
      <div style={{ marginTop: "30px", padding: "20px", border: "1px dashed #999", display: "inline-block" }}>
        <h3>Get Started</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li style={{ margin: "10px 0" }}>
            <Link href="/login" style={{ textDecoration: "underline", color: "blue" }}>Go to Login</Link>
          </li>
          <li style={{ margin: "10px 0" }}>
            <Link href="/signup" style={{ textDecoration: "underline", color: "blue" }}>Go to Sign Up</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
