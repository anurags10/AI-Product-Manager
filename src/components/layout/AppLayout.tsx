"use client";

import { ReactNode, useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "next-themes";
import { signOut, useSession } from "next-auth/react";
import {
  LayoutDashboard,
  Settings,
  FolderKanban,
  FileText,
  Search,
  Bell,
  Sun,
  Moon,
  Menu,
  ChevronLeft,
  ChevronRight,
  LogOut,
  User,
} from "lucide-react";

type NavItem = {
  href: string;
  label: string;
  icon: React.ElementType;
};

const mainNavItems: NavItem[] = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/projects", label: "Projects", icon: FolderKanban },
  { href: "/dashboard/docs", label: "Documents", icon: FileText },
];

const bottomNavItems: NavItem[] = [
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function AppLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { data: session } = useSession();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLElement>(null);

  // Close profile dropdown and sidebar when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // Handle Profile Dropdown
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }

      // Handle Sidebar Collapse
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        !isSidebarCollapsed
      ) {
        setIsSidebarCollapsed(true);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarCollapsed]);

  // Generate breadcrumbs from pathname
  const paths = pathname.split("/").filter(Boolean);
  const breadcrumbs = paths.map((p, i) => {
    const href = "/" + paths.slice(0, i + 1).join("/");
    return {
      label: p.charAt(0).toUpperCase() + p.slice(1),
      href,
    };
  });

  return (
    <div className="flex h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 overflow-hidden font-sans transition-colors duration-300">
      {/* Sidebar */}
      <motion.aside
        ref={sidebarRef}
        initial={false}
        animate={{ width: isSidebarCollapsed ? 80 : 260 }}
        transition={{ type: "spring", bounce: 0, duration: 0.3 }}
        className="relative z-20 flex flex-col bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 shadow-sm"
      >
        {/* Logo / Brand */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-zinc-200 dark:border-zinc-800">
          <AnimatePresence mode="popLayout">
            {!isSidebarCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="font-bold text-lg tracking-tight truncate flex items-center gap-2"
              >
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                  <LayoutDashboard size={18} />
                </div>
                <span>AI PM</span>
              </motion.div>
            )}
          </AnimatePresence>
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 transition-colors"
          >
            {isSidebarCollapsed ? (
              <Menu size={20} />
            ) : (
              <ChevronLeft size={20} />
            )}
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 flex flex-col justify-between py-6 overflow-y-auto overflow-x-hidden no-scrollbar">
          <nav className="px-3 space-y-1">
            {!isSidebarCollapsed && (
              <div className="px-3 mb-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                Workspace
              </div>
            )}
            {mainNavItems.map((item) => (
              <SidebarItem
                key={item.href}
                item={item}
                active={
                  pathname === item.href || pathname.startsWith(item.href + "/")
                }
                collapsed={isSidebarCollapsed}
              />
            ))}
          </nav>

          <nav className="px-3 space-y-1 mt-8">
            {!isSidebarCollapsed && (
              <div className="px-3 mb-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                System
              </div>
            )}
            {bottomNavItems.map((item) => (
              <SidebarItem
                key={item.href}
                item={item}
                active={pathname === item.href}
                collapsed={isSidebarCollapsed}
              />
            ))}

            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className={`w-full flex items-center gap-3 px-3 py-2 mt-2 rounded-lg text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30 dark:hover:text-red-400 transition-colors ${
                isSidebarCollapsed ? "justify-center" : "justify-start"
              }`}
            >
              <LogOut size={18} />
              <AnimatePresence>
                {!isSidebarCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0, display: "none" }}
                    animate={{ opacity: 1, width: "auto", display: "block" }}
                    exit={{ opacity: 0, width: 0, display: "none" }}
                    transition={{ duration: 0.2 }}
                    className="whitespace-nowrap"
                  >
                    Logout
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </nav>
        </div>
      </motion.aside>

      {/* Main Container */}
      <main className="flex-1 flex flex-col min-w-0 bg-zinc-50/50 dark:bg-zinc-950/50">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-6 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-10">
          {/* Breadcrumbs */}
          <div className="flex items-center text-sm">
            {breadcrumbs.map((crumb, index) => (
              <div key={crumb.href} className="flex items-center">
                {index > 0 && (
                  <ChevronRight size={14} className="mx-2 text-zinc-400" />
                )}
                <Link
                  href={crumb.href}
                  className={`capitalize transition-colors ${
                    index === breadcrumbs.length - 1
                      ? "font-medium text-zinc-900 dark:text-zinc-100"
                      : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300"
                  }`}
                >
                  {crumb.label}
                </Link>
              </div>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block group">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-400 group-focus-within:text-indigo-500 transition-colors" />
              <input
                type="text"
                placeholder="Search..."
                className="w-64 h-9 pl-9 pr-4 rounded-full bg-zinc-100 dark:bg-zinc-800/50 border border-transparent focus:border-indigo-500/50 focus:bg-white dark:focus:bg-zinc-900 focus:ring-2 focus:ring-indigo-500/20 text-sm outline-none transition-all placeholder:text-zinc-500"
              />
              <div className="absolute right-3 top-2.5 flex items-center gap-1">
                <kbd className="hidden sm:inline-block px-1.5 rounded bg-zinc-200 dark:bg-zinc-700 font-mono text-[10px] font-medium text-zinc-500 dark:text-zinc-400">
                  ⌘K
                </kbd>
              </div>
            </div>

            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button className="relative p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 transition-colors outline-none">
              <Bell size={18} />
              <span className="absolute top-1.5 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-zinc-900"></span>
            </button>

            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white text-sm font-medium shadow-sm border-2 border-white dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              >
                {(session?.user as any)?.name ? (
                  (session?.user as any).name.charAt(0).toUpperCase()
                ) : (
                  <User size={16} />
                )}
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-56 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-lg overflow-hidden flex flex-col z-50"
                  >
                    <div className="px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
                      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate">
                        {(session?.user as any)?.name || "User"}
                      </p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                        {session?.user?.email || "No email"}
                      </p>
                    </div>

                    <div className="p-1">
                      <Link
                        href="/dashboard/settings"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer"
                      >
                        <Settings size={16} />
                        Settings
                      </Link>
                    </div>

                    <div className="p-1 border-t border-zinc-200 dark:border-zinc-800">
                      <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer text-left"
                      >
                        <LogOut size={16} />
                        Log out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="max-w-7xl mx-auto"
          >
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
}

function SidebarItem({
  item,
  active,
  collapsed,
}: {
  item: NavItem;
  active: boolean;
  collapsed: boolean;
}) {
  return (
    <Link href={item.href}>
      <div className="relative flex items-center px-3 py-2.5 my-1 rounded-lg group cursor-pointer">
        {active && (
          <motion.div
            layoutId="active-nav-pill"
            className="absolute inset-0 bg-zinc-100 dark:bg-zinc-800/80 rounded-lg"
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
          />
        )}
        <div
          className={`relative z-10 flex items-center gap-3 w-full ${
            active
              ? "text-indigo-600 dark:text-indigo-400 font-medium"
              : "text-zinc-600 dark:text-zinc-400 font-normal group-hover:text-zinc-900 dark:group-hover:text-zinc-200"
          } transition-colors ${collapsed ? "justify-center" : "justify-start"}`}
        >
          <item.icon
            size={18}
            className={active ? "text-indigo-600 dark:text-indigo-400" : ""}
          />

          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0, display: "none" }}
                animate={{ opacity: 1, width: "auto", display: "block" }}
                exit={{ opacity: 0, width: 0, display: "none" }}
                transition={{ duration: 0.2 }}
                className="whitespace-nowrap pl-1"
              >
                {item.label}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Link>
  );
}
