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
      toast.success("User Registered Successfully!. Please login");
      router.push("/login");
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong");
    },
  });

  const handleRegister = () => {
    registerMutation.mutate({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm space-y-4">
        <h2 className="text-2xl font-semibold">SignUp</h2>

        <Input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
          type="email"
        />

        <Input
          type="password"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          className="w-full"
          onClick={handleRegister}
          disabled={registerMutation.isPending}
          type="submit"
        >
          {registerMutation.isPending ? "Registering..." : "Register User"}
        </Button>

        <Button
          variant="outline"
          className="w-full"
          onClick={() => signIn("google")}
        >
          Continue with Google
        </Button>
      </div>
    </div>
  );
}
