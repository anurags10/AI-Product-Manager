"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import {
  ArrowRight,
  Sparkles,
  LayoutDashboard,
  FileText,
  Map,
  Users,
  Zap,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

export default function HomePage() {
  const containerVariants: any = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 selection:bg-indigo-500/30 overflow-hidden font-sans">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-indigo-500/10 dark:bg-indigo-500/5 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] rounded-full bg-purple-500/10 dark:bg-purple-500/5 blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dzl9yxixg/image/upload/v1714416045/grid_sdbvcc.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20 dark:opacity-10" />
      </div>

      {/* Navbar */}
      <header className="fixed top-0 inset-x-0 z-50 h-16 border-b border-zinc-200/50 dark:border-zinc-800/50 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-xl transition-all">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-lg tracking-tight">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-sm">
              <LayoutDashboard size={18} />
            </div>
            <span>AI PM</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600 dark:text-zinc-300">
            {/* Navigation links removed per user request */}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="hidden sm:block text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              Log in
            </Link>
            <Link href="/register">
              <Button className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 shadow-sm rounded-full px-5 h-9">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10 pt-32 pb-16">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 text-xs font-medium text-zinc-600 dark:text-zinc-300 mb-8 backdrop-blur-sm"
          >
            <Sparkles size={14} className="text-indigo-500" />
            <span>AI PM 2.0 is now live</span>
            <span className="w-px h-3 bg-zinc-300 dark:bg-zinc-700 mx-1" />
            <Link
              href="/register"
              className="text-indigo-600 dark:text-indigo-400 flex items-center hover:underline"
            >
              Read the launch notes <ChevronRight size={14} className="ml-1" />
            </Link>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight max-w-4xl text-zinc-900 dark:text-white leading-[1.1]"
          >
            The intelligence layer for <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
              modern product teams
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed"
          >
            Add a project and a PRD, and we instantly generate two distinct
            3-month execution roadmaps for your engineering team to hit the
            ground running.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center mt-10"
          >
            <Link href="/register">
              <Button
                size="lg"
                className="h-12 px-8 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-base shadow-lg shadow-indigo-500/20 group cursor-pointer transition-all"
              >
                Start building for free
                <ArrowRight
                  size={18}
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                />
              </Button>
            </Link>
          </motion.div>

          {/* Hero Image / Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.4,
              type: "spring",
              bounce: 0,
            }}
            className="mt-20 w-full max-w-5xl relative"
          >
            {/* Glow behind image */}
            <div className="absolute inset-x-10 -top-10 -bottom-10 bg-gradient-to-tr from-indigo-500/30 to-purple-500/30 blur-3xl opacity-50 dark:opacity-30 -z-10 rounded-[3rem]" />

            <div className="rounded-2xl md:rounded-[2rem] border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-2xl shadow-2xl p-2 pb-0 md:p-4 md:pb-0 overflow-hidden">
              <div className="rounded-t-xl md:rounded-t-[1.5rem] border border-b-0 border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 flex flex-col h-[400px] md:h-[600px] overflow-hidden relative shadow-inner">
                {/* Mock Header */}
                <div className="h-12 border-b border-zinc-200 dark:border-zinc-800 flex items-center px-4 gap-4 bg-white/80 dark:bg-zinc-950/80">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-rose-500" />
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  </div>
                  <div className="flex-1 max-w-md mx-auto h-6 bg-zinc-100 dark:bg-zinc-800 rounded-md flex items-center justify-center text-[10px] text-zinc-400 font-mono">
                    ai-pm.app/dashboard
                  </div>
                </div>
                {/* Mock Content area */}
                <div className="flex flex-1 overflow-hidden">
                  {/* Mock Sidebar */}
                  <div className="w-48 border-r border-zinc-200 dark:border-zinc-800 p-4 hidden md:flex flex-col gap-2 bg-zinc-50 dark:bg-zinc-900/50">
                    <div className="h-8 bg-zinc-200/50 dark:bg-zinc-800/50 rounded-md w-full mb-4" />
                    <div className="h-8 bg-zinc-200/80 dark:bg-zinc-800/80 rounded-md w-full" />
                    <div className="h-8 bg-zinc-200/50 dark:bg-zinc-800/50 rounded-md w-full" />
                    <div className="h-8 bg-zinc-200/50 dark:bg-zinc-800/50 rounded-md w-3/4" />
                  </div>
                  {/* Mock Main Content */}
                  <div className="flex-1 p-6 flex flex-col gap-6 bg-white dark:bg-zinc-950">
                    <div className="flex gap-4">
                      <div className="flex-1 h-32 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/50 flex flex-col p-4 justify-between">
                        <div className="h-4 w-1/2 bg-zinc-200 dark:bg-zinc-800 rounded-md" />
                        <div className="text-xs text-zinc-500 font-medium">
                          Project Alpha
                        </div>
                      </div>
                      <div className="flex-1 h-32 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/50 hidden sm:flex flex-col p-4 justify-between">
                        <div className="h-4 w-2/3 bg-zinc-200 dark:bg-zinc-800 rounded-md" />
                        <div className="text-xs text-zinc-500 font-medium">
                          Roadmap Option 1
                        </div>
                      </div>
                      <div className="flex-1 h-32 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/50 hidden lg:flex flex-col p-4 justify-between">
                        <div className="h-4 w-1/3 bg-zinc-200 dark:bg-zinc-800 rounded-md" />
                        <div className="text-xs text-zinc-500 font-medium">
                          Roadmap Option 2
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 rounded-xl bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:from-indigo-900/10 dark:to-purple-900/10 border border-indigo-100 dark:border-indigo-500/10 flex items-center justify-center p-8">
                      {/* Mock Roadmap Graph */}
                      <div className="w-full h-full border-t-2 border-dashed border-indigo-300 dark:border-indigo-500/30 relative flex items-center mt-8">
                        <div className="absolute left-[10%] -top-4 w-8 h-8 rounded-full bg-indigo-500 shadow-lg shadow-indigo-500/40 border-4 border-white dark:border-zinc-900" />
                        <div className="absolute left-[45%] -top-4 w-8 h-8 rounded-full bg-purple-500 shadow-lg shadow-purple-500/40 border-4 border-white dark:border-zinc-900" />
                        <div className="absolute left-[80%] -top-4 w-8 h-8 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/40 border-4 border-white dark:border-zinc-900" />
                        {/* Details */}
                        <div className="absolute left-[10%] top-6 whitespace-nowrap text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                          Month 1
                        </div>
                        <div className="absolute left-[45%] top-6 whitespace-nowrap text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                          Month 2
                        </div>
                        <div className="absolute left-[80%] top-6 whitespace-nowrap text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                          Month 3
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Features Bento Grid */}
        <section
          id="features"
          className="max-w-7xl mx-auto px-6 mt-32 md:mt-48"
        >
          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Everything you need to ship faster
            </h2>
            <p className="mt-4 text-zinc-600 dark:text-zinc-400 max-w-2xl text-lg">
              AI PM transforms your product requirements into detailed 3-month
              roadmaps, generating up to two distinct path variations per
              project automatically.
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Feature 1 - Large */}
            <motion.div
              variants={itemVariants}
              className="md:col-span-2 group relative overflow-hidden rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 shadow-sm hover:shadow-md transition-all"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <FileText size={180} />
              </div>
              <div className="relative z-10 w-12 h-12 flex items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500 mb-6">
                <FileText size={24} />
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
                Automated PRD Generation
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 max-w-md">
                Stop writing boilerplate. AI transforms your 2-sentence idea
                into a comprehensive, professionally structured Product
                Requirements Document instantly.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              variants={itemVariants}
              className="group relative overflow-hidden rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 shadow-sm hover:shadow-md transition-all"
            >
              <div className="relative z-10 w-12 h-12 flex items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500 mb-6">
                <Map size={24} />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
                Dual Roadmap Options
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                For every project, AI generates 2 independent roadmap strategies
                to choose from, giving you flexibility in execution.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              variants={itemVariants}
              className="group relative overflow-hidden rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 shadow-sm hover:shadow-md transition-all"
            >
              <div className="relative z-10 w-12 h-12 flex items-center justify-center rounded-xl bg-amber-500/10 text-amber-500 mb-6">
                <Zap size={24} />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
                3-Month Timelines
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                Each roadmap clearly outlines month-over-month engineering
                tasks, breaking down the launch into 3 distinct monthly phases.
              </p>
            </motion.div>

            {/* Feature 4 - Large */}
            <motion.div
              variants={itemVariants}
              className="md:col-span-2 group relative overflow-hidden rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 shadow-sm hover:shadow-md transition-all"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 to-indigo-50/30 dark:from-zinc-900 dark:to-indigo-900/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10 w-12 h-12 flex items-center justify-center rounded-xl bg-purple-500/10 text-purple-500 mb-6">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
                Enterprise-Grade Architecture
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 max-w-md">
                Built on Next.js 15, Drizzle ORM, and securely hosted. AI PM
                ensures your product strategy and intellectual property remain
                securely encrypted layer by layer.
              </p>
            </motion.div>
          </motion.div>
        </section>

        {/* Call to Action */}
        <section className="max-w-5xl mx-auto px-6 mt-32 md:mt-48">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-zinc-900 text-white p-10 md:p-20 text-center flex flex-col items-center">
            {/* Dark background glow */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e5_0%,#a855f7_100%)] opacity-20" />

            <h2 className="relative z-10 text-3xl md:text-5xl font-bold tracking-tight mb-6 mt-4">
              Ready to ship better products?
            </h2>
            <p className="relative z-10 text-zinc-300 max-w-xl text-lg mb-10">
              Join leading product teams who use AI PM to turn PRDs into 3-month
              execution roadmaps.
            </p>
            <Link href="/register" className="relative z-10">
              <Button
                size="lg"
                className="h-14 px-10 rounded-full bg-white text-zinc-900 hover:bg-zinc-100 text-base font-semibold shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all"
              >
                Get Started for Free
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 font-bold tracking-tight text-zinc-900 dark:text-white">
            <LayoutDashboard
              size={18}
              className="text-indigo-600 dark:text-indigo-400"
            />
            <span>AI PM</span>
          </div>

          <div className="flex gap-6 text-sm text-zinc-500 dark:text-zinc-400">
            <Link
              href="#"
              className="hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              Twitter (X)
            </Link>
          </div>

          <div className="text-sm text-zinc-500 dark:text-zinc-400">
            © {new Date().getFullYear()} AI PM Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
