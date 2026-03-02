"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function handleLogin() {
    await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/dashboard",
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm space-y-4">
        <h2 className="text-2xl font-semibold">Login</h2>

        <Input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
        />

        <Input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
          min={8}
        />

        <Button className="w-full" onClick={handleLogin} type="submit">
          Login
        </Button>

        <Button
          variant="outline"
          className="w-full"
          onClick={() =>
            signIn("google", {
              callbackUrl: "/dashboard",
            })
          }
        >
          Continue with Google
        </Button>
      </div>
    </div>
  );
}
