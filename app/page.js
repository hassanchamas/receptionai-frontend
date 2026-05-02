'use client';
import { useState, useEffect } from "react";
import AuthFlow from "../components/AuthFlow";
import Dashboard from "../components/Dashboard";

export default function Home() {
  const [authed, setAuthed]       = useState(false);
  const [checking, setChecking]   = useState(true);

  useEffect(() => {
    // Check if already logged in
    const token    = localStorage.getItem("token");
    const business = localStorage.getItem("business");
    if (token && business) setAuthed(true);
    setChecking(false);
  }, []);

  if (checking) {
    // Brief loading screen while checking token
    return (
      <div style={{
        minHeight:"100vh", display:"flex", alignItems:"center",
        justifyContent:"center", background:"#040D1E"
      }}>
        <div style={{
          width:32, height:32, border:"2px solid rgba(30,136,255,0.2)",
          borderTop:"2px solid #1E88FF", borderRadius:"50%",
          animation:"spin 0.8s linear infinite"
        }} />
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    );
  }

  if (!authed) {
    return <AuthFlow onAuthenticated={() => setAuthed(true)} />;
  }

  return <Dashboard />;
}
