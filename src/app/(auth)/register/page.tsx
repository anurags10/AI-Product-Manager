"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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
    <div className="min-h-screen grid md:grid-cols-2 bg-white">
      {/* LEFT SIDE (Branding) */}
      <div className="hidden md:flex flex-col justify-center px-16 bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
        <h1 className="text-4xl font-bold leading-tight">
          Start building with AI PM
        </h1>

        <p className="mt-6 text-lg text-indigo-100 max-w-md">
          Turn your product ideas into structured plans, roadmaps, and
          execution-ready workflows in minutes.
        </p>

        <div className="mt-10 space-y-4 text-sm text-indigo-100">
          <p>✔ Generate product docs instantly</p>
          <p>✔ Build AI-powered roadmaps</p>
          <p>✔ Organize ideas in one place</p>
        </div>
      </div>

      {/* RIGHT SIDE (Form) */}
      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md space-y-6">
          {/* Heading */}
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Create your account
            </h2>
            <p className="text-sm text-zinc-500 mt-1">
              Get started in seconds — no setup required
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

            <p className="text-xs text-zinc-400">
              Password should be at least 8 characters.
            </p>
          </div>

          {/* Register Button */}
          <Button
            className="w-full cursor-pointer"
            onClick={handleRegister}
            disabled={registerMutation.isPending}
          >
            {registerMutation.isPending
              ? "Creating account..."
              : "Create Account"}
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-4 text-sm text-zinc-400">
            <div className="flex-1 h-px bg-zinc-200" />
            OR
            <div className="flex-1 h-px bg-zinc-200" />
          </div>

          {/* Google Signup */}
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
            Already have an account?{" "}
            <a href="/login" className="text-indigo-600 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
