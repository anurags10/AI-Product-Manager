"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setLoading(true);

    await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/dashboard",
    });

    setLoading(false);
  }

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-white">
      {/* LEFT SIDE (Branding) */}
      <div className="hidden md:flex flex-col justify-center px-16 bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
        <h1 className="text-4xl font-bold leading-tight">
          Welcome back to AI PM
        </h1>

        <p className="mt-6 text-lg text-indigo-100 max-w-md">
          Build product roadmaps, generate structured docs, and move from idea
          to execution — faster than ever.
        </p>

        <div className="mt-10 space-y-4 text-sm text-indigo-100">
          <p>✔ AI-powered roadmap generation</p>
          <p>✔ Structured product documentation</p>
          <p>✔ Built for modern product teams</p>
        </div>
      </div>

      {/* RIGHT SIDE (Form) */}
      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md space-y-6">
          {/* Heading */}
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Login to your account
            </h2>
            <p className="text-sm text-zinc-500 mt-1">
              Enter your credentials to continue
            </p>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <Input
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
            />

            <Input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Login Button */}
          <Button
            className="w-full cursor-pointer"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Login"}
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-4 text-sm text-zinc-400">
            <div className="flex-1 h-px bg-zinc-200" />
            OR
            <div className="flex-1 h-px bg-zinc-200" />
          </div>

          {/* Google Login */}
          <Button
            variant="outline"
            className="w-full cursor-pointer"
            onClick={() =>
              signIn("google", {
                callbackUrl: "/dashboard",
              })
            }
          >
            Continue with Google
          </Button>

          {/* Footer */}
          <p className="text-sm text-center text-zinc-500">
            Don’t have an account?{" "}
            <a href="/register" className="text-indigo-600 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
