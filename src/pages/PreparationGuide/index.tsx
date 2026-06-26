import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

import Layout from "./Layout";
import Dashboard from "./Dashboard";
import TopicViewer from "./TopicViewer";
import MockTestEngine from "./MockTestEngine";

const ACCESS_HASH = "cb7926f58653d799fa54fdf0803d1a66434fd0d3a75f61855405d539eb836abf";

async function sha256(message: string) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export default function PreparationGuideRoot() {
  const [isLocked, setIsLocked] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const sessionAuth = sessionStorage.getItem("prepAuth");
    if (sessionAuth === "true") {
      setIsLocked(false);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const hash = await sha256(password);
    if (hash === ACCESS_HASH) {
      sessionStorage.setItem("prepAuth", "true");
      setIsLocked(false);
      setError("");
    } else {
      setError("Incorrect password");
      setPassword("");
    }
  };

  if (isLocked) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-24 pb-16 flex items-center justify-center min-h-[80vh]">
          <div className="max-w-md w-full mx-4 glass-card p-8 rounded-2xl animate-fade-up">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-primary/10 rounded-full">
                <Lock className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-center mb-2">Preparation Guide</h1>
            <p className="text-muted-foreground text-center mb-8 text-sm">
              Please enter the access code to view the interview preparation materials.
            </p>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter access code"
                  className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  autoFocus
                />
              </div>
              {error && <p className="text-destructive text-sm text-center">{error}</p>}
              <Button type="submit" className="w-full py-6 text-md font-semibold">
                Unlock Access
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route element={<Layout setIsLocked={setIsLocked} />}>
        <Route index element={<Dashboard />} />
        <Route path="topic/:categoryId/:topicId" element={<TopicViewer />} />
        <Route path="mock-test" element={<MockTestEngine />} />
      </Route>
    </Routes>
  );
}
