"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 ">
      {/* Sidebar */}
      <aside className="w-64 bg-white/70 backdrop-blur-xl border-r border-zinc-200 flex flex-col">
        <div className="h-16 flex items-center px-6 font-semibold text-lg">
          AI Product Manager
        </div>

        <nav className="flex-1 px-3 space-y-1">
          <SidebarItem
            href="/dashboard"
            label="Projects"
            active={pathname === "/dashboard"}
          />
        </nav>

        <div className="p-4 border-t border-zinc-200">
          <Button className="w-full text-shadow-white hover:text-shadow-teal-100 transition cursor-pointerp">
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Top bar */}
        <div className="h-16 border-b border-zinc-200 bg-white/60 backdrop-blur-xl flex items-center justify-between px-6">
          <h1 className="text-lg font-semibold tracking-tight">Dashboard</h1>

          <div className="flex items-center gap-4">
            <div className="h-9 w-9 rounded-full bg-zinc-900 text-white flex items-center justify-center text-sm font-medium">
              U
            </div>
          </div>
        </div>

        {/* Page Content with Animation */}
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="p-6"
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}

function SidebarItem({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link href={href}>
      <div className="relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200">
        {active && (
          <motion.div
            layoutId="active-pill"
            className="absolute inset-0 bg-zinc-900 rounded-lg"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
        <span
          className={`relative z-10 ${
            active ? "text-white" : "text-zinc-600 hover:text-black"
          }`}
        >
          {label}
        </span>
      </div>
    </Link>
  );
}
