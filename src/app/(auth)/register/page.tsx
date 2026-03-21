"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { motion } from "motion/react";
import { LayoutDashboard, Sparkles, Map as MapIcon, Zap } from "lucide-react";

const GoogleIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="18"
    height="18"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>Google Logo</title>
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

export default function RegisterPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const registerMutation = useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Registration failed");
      }

      return res.json();
    },
    onSuccess: () => {
      toast.success("Account created successfully! Please login.");
      router.push("/login");
    },
    onError: (error: any) => {
      toast.error(error.message || "Something went wrong");
    },
  });

  const handleRegister = () => {
    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    registerMutation.mutate({ email, password });
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-zinc-50 dark:bg-zinc-950 selection:bg-indigo-500/30 font-sans">
      {/* LEFT SIDE (Branding - Hidden on small screens) */}
      <div className="hidden lg:flex flex-col justify-between px-16 py-20 relative overflow-hidden bg-zinc-900 border-r border-zinc-800">
        {/* Background glow and grids */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[80%] h-[80%] rounded-full bg-indigo-600/20 blur-[140px]" />
          <div className="absolute bottom-0 left-0 w-[60%] h-[60%] rounded-full bg-purple-600/20 blur-[120px]" />
          <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dzl9yxixg/image/upload/v1714416045/grid_sdbvcc.svg')] bg-center opacity-10" />
        </div>

        {/* Top Logo */}
        <div className="relative z-10 flex items-center gap-2 font-bold tracking-tight text-white text-xl">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
            <LayoutDashboard size={18} />
          </div>
          <span>AI PM</span>
        </div>

        {/* Center Copy */}
        <div className="relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl xl:text-5xl font-bold leading-tight text-white mb-6"
          >
            Start building with AI PM today.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-zinc-400 max-w-md"
          >
            Turn your product ideas into structured plans, roadmaps, and
            execution-ready workflows in minutes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12 space-y-5"
          >
            <div className="flex items-center gap-3 text-sm text-zinc-300">
              <div className="w-8 h-8 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-indigo-400">
                <Sparkles size={16} />
              </div>
              <span className="font-medium">
                Generate product docs instantly
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm text-zinc-300">
              <div className="w-8 h-8 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400">
                <MapIcon size={16} />
              </div>
              <span className="font-medium">Build AI-powered roadmaps</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-zinc-300">
              <div className="w-8 h-8 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-amber-400">
                <Zap size={16} />
              </div>
              <span className="font-medium">Organize ideas in one place</span>
            </div>
          </motion.div>
        </div>

        {/* Bottom Logo or Legal */}
        <div className="relative z-10 text-xs text-zinc-500">
          © {new Date().getFullYear()} AI PM Inc. All rights reserved.
        </div>
      </div>

      {/* RIGHT SIDE (Form) */}
      <div className="flex items-center justify-center px-6 py-12 relative overflow-hidden">
        {/* Mobile Background Elements */}
        <div className="absolute lg:hidden inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[100%] h-[50%] rounded-full bg-indigo-500/10 dark:bg-indigo-500/5 blur-[120px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-[400px] relative z-10 p-8 rounded-[2rem] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl shadow-zinc-200/50 dark:shadow-none"
        >
          {/* Mobile Logo Logo */}
          <div className="flex lg:hidden items-center justify-center gap-2 font-bold tracking-tight text-zinc-900 dark:text-white text-xl mb-10">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
              <LayoutDashboard size={18} />
            </div>
            <span>AI PM</span>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Create your account
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
              Get started in seconds — no setup required.
            </p>
          </div>

          <div className="space-y-5">
            <div className="space-y-1">
              <label
                htmlFor="email"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Email
              </label>
              <Input
                id="email"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                className="h-11 bg-zinc-50 dark:bg-zinc-950"
              />
            </div>

            <div className="space-y-1">
              <label
                htmlFor="password"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-11 bg-zinc-50 dark:bg-zinc-950"
              />
              <p className="text-xs text-zinc-500 pt-1">
                Password should be at least 8 characters.
              </p>
            </div>

            <Button
              className="w-full h-11 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-md cursor-pointer font-medium mt-2"
              onClick={handleRegister}
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending
                ? "Creating account..."
                : "Create Account"}
            </Button>

            <div className="flex items-center gap-4 text-xs font-semibold text-zinc-400 uppercase py-2">
              <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
              <span>or</span>
              <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
            </div>

            <Button
              variant="outline"
              className="w-full h-11 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300 cursor-pointer shadow-sm gap-3"
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            >
              <GoogleIcon />
              Continue with Google
            </Button>
          </div>

          <p className="text-sm text-center text-zinc-500 font-medium mt-8">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Log in instead
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
