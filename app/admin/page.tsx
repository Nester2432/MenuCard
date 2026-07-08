"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, User, Eye, EyeOff, ChefHat } from "lucide-react";
import { useMenu } from "@/lib/store/MenuContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Demo credentials — replace with real auth when connecting a backend
const DEMO_USER = "admin";
const DEMO_PASS = "admin123";

export default function AdminLoginPage() {
  const { dispatch } = useMenu();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    // Simulate async auth check
    await new Promise((r) => setTimeout(r, 600));
    if (username === DEMO_USER && password === DEMO_PASS) {
      dispatch({ type: "LOGIN" });
      router.push("/admin/dashboard");
    } else {
      setError("Usuario o contraseña incorrectos");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-950 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-sm"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-500 rounded-2xl mb-4 shadow-elevated">
            <ChefHat className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Panel de Admin</h1>
          <p className="text-neutral-400 text-sm mt-1">La Trattoria · Gestión de carta</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl p-7 shadow-elevated">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">
                Usuario
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                <Input
                  type="text"
                  placeholder="admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10"
                  autoComplete="username"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                <Input
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                >
                  {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-500 text-center font-medium"
              >
                {error}
              </motion.p>
            )}

            <Button type="submit" className="w-full mt-2" disabled={loading}>
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Ingresando...
                </span>
              ) : (
                "Ingresar"
              )}
            </Button>
          </form>

          <p className="text-xs text-neutral-400 text-center mt-5">
            Demo: <span className="font-mono text-neutral-600">admin</span> /{" "}
            <span className="font-mono text-neutral-600">admin123</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
