import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-zinc-100 px-6">
      <h1 className="text-5xl font-bold text-center mb-6">
        AI Product Manager
      </h1>

      <p className="text-lg text-zinc-600 max-w-2xl text-center mb-10">
        Create structured product documents, generate AI roadmaps, and manage
        product ideas in one clean dashboard.
      </p>

      <div className="flex gap-4">
        <Link href="/login">
          <Button size="lg" className="cursor-pointer">
            Login
          </Button>
        </Link>

        <Link href="/register">
          <Button variant="outline" size="lg" className="cursor-pointer">
            Sign Up
          </Button>
        </Link>
      </div>
    </main>
  );
}
