"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-zinc-50 to-indigo-50">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 md:px-8 py-6 max-w-7xl mx-auto">
        <h1 className="text-xl font-semibold tracking-tight">AI PM</h1>

        <div className="flex items-center gap-4 md:gap-6">
          <Link
            href="#features"
            className="text-sm text-zinc-600 hover:text-black transition"
          >
            Features
          </Link>

          <Link
            href="#how-it-works"
            className="text-sm text-zinc-600 hover:text-black transition"
          >
            How it works
          </Link>

          <Link href="/login">
            <Button variant="ghost" className="hidden sm:inline-flex">
              Login
            </Button>
          </Link>

          <Link href="/register">
            <Button className="px-4">Sign Up</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center px-6 mt-24">
        <span className="text-xs px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full mb-6">
          AI-powered product workflow
        </span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold leading-tight max-w-4xl tracking-tight"
        >
          Turn ideas into execution,
          <span className="block bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
            without the chaos.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-base md:text-lg text-zinc-600 max-w-2xl"
        >
          Plan faster, generate structured documents, and build actionable
          roadmaps — all powered by AI.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex gap-4 mt-10"
        >
          <Link href="/register">
            <Button size="lg" className="px-8 text-sm cursor-pointer">
              Get Started Free
            </Button>
          </Link>
        </motion.div>

        {/* Mock Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 w-full max-w-5xl"
        >
          <div className="rounded-2xl border border-zinc-200 bg-white shadow-lg p-4">
            <div className="h-40 md:h-64 bg-zinc-100 rounded-xl flex items-center justify-center text-zinc-400 text-sm">
              Your dashboard preview
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="mt-32 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">
          Everything you need to build products
        </h2>

        <p className="text-center text-zinc-600 max-w-2xl mx-auto mb-12">
          Replace scattered tools with a single intelligent workspace built for
          modern product teams.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "AI Roadmaps",
              desc: "Instantly generate structured, step-by-step roadmaps with timelines and priorities.",
            },
            {
              title: "Document Generation",
              desc: "Create PRDs, specs, and product docs in seconds with clean structure.",
            },
            {
              title: "Idea Workspace",
              desc: "Capture, organize, and evolve product ideas without losing context.",
            },
            {
              title: "Iteration Friendly",
              desc: "Regenerate, refine, and adapt your roadmap as your product evolves.",
            },
            {
              title: "Clarity for Teams",
              desc: "Align stakeholders with clear outputs instead of messy notes.",
            },
            {
              title: "Built for Speed",
              desc: "Move from idea → execution faster than traditional workflows.",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6 }}
              className="p-6 bg-white rounded-2xl border border-zinc-200 shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-base font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="mt-32 px-6 max-w-6xl mx-auto text-center"
      >
        <h2 className="text-3xl font-bold mb-4">How it works</h2>

        <p className="text-zinc-600 max-w-2xl mx-auto mb-12">
          A simple workflow designed to take you from raw idea to
          execution-ready plan.
        </p>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              step: "01",
              title: "Start with an idea",
              desc: "Describe your product idea or goal in a few sentences.",
            },
            {
              step: "02",
              title: "Generate structure",
              desc: "AI builds documents and a clear roadmap instantly.",
            },
            {
              step: "03",
              title: "Refine & execute",
              desc: "Edit, regenerate, and move forward with confidence.",
            },
          ].map((item, i) => (
            <div key={i}>
              <div className="text-indigo-600 font-bold mb-2">{item.step}</div>
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-zinc-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-32 py-10 text-center text-sm text-zinc-500">
        © {new Date().getFullYear()} AI PM. All rights reserved.
      </footer>
    </main>
  );
}
