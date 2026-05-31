"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  LayoutDashboard,
  FlaskConical,
  Workflow,
  Image,
  ShoppingBag,
  Save,
  Settings,
  BarChart3,
  Menu,
  X,
  Sparkles,
  ChevronRight,
  LogOut,
  User,
  Crown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard", badge: null },
  { icon: FlaskConical, label: "Prompt Lab", href: "/lab", badge: "NEW" },
  { icon: Workflow, label: "Workflow Builder", href: "/workflows", badge: null },
  { icon: Image, label: "Image Studio", href: "/image-studio", badge: "HOT" },
  { icon: ShoppingBag, label: "Marketplace", href: "/marketplace", badge: null },
  { icon: Save, label: "Saved Prompts", href: "/saved", badge: null },
  { icon: BarChart3, label: "Analytics", href: "/analytics", badge: null },
  { icon: Settings, label: "Settings", href: "/settings", badge: null },
];

export function Sidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 h-full w-72 bg-dark-900/95 backdrop-blur-xl border-r border-glass-border z-50 lg:translate-x-0 lg:static lg:z-0"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-6 border-b border-glass-border">
                <Link href="/dashboard" className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-purple flex items-center justify-center shadow-glow">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold gradient-text">PromptForge</span>
                </Link>
                <button
                  onClick={onClose}
                  className="lg:hidden p-2 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {sidebarItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                        isActive
                          ? "bg-gradient-to-r from-primary-500/20 to-accent-purple/20 border border-primary-500/30 text-white"
                          : "text-slate-400 hover:bg-white/5 hover:text-white"
                      )}
                    >
                      <Icon
                        className={cn(
                          "w-5 h-5 flex-shrink-0",
                          isActive ? "text-primary-400" : "group-hover:text-primary-400"
                        )}
                      />
                      <span className="font-medium flex-1">{item.label}</span>
                      {item.badge && (
                        <span className={cn(
                          "px-2 py-0.5 text-xs font-semibold rounded-full",
                          item.badge === "NEW" && "bg-accent-cyan/20 text-accent-cyan",
                          item.badge === "HOT" && "bg-accent-pink/20 text-accent-pink"
                        )}>
                          {item.badge}
                        </span>
                      )}
                      {isActive && (
                        <ChevronRight className="w-4 h-4 text-primary-400" />
                      )}
                    </Link>
                  );
                })}
              </nav>

              <div className="p-4 border-t border-glass-border">
                {user?.plan !== "free" && (
                  <div className="mb-4 p-4 rounded-xl bg-gradient-to-br from-primary-500/10 to-accent-purple/10 border border-primary-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Crown className="w-4 h-4 text-amber-400" />
                      <span className="text-sm font-semibold text-white capitalize">{user?.plan} Plan</span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Unlimited prompts, advanced analytics, and more
                    </p>
                  </div>
                )}

                {user && (
                  <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-purple flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{user.name}</p>
                      <p className="text-xs text-slate-400 truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={signOut}
                      className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                      title="Sign out"
                    >
                      <LogOut className="w-4 h-4 text-slate-400" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}

export function Header({
  onMenuClick,
}: {
  onMenuClick: () => void;
}) {
  const pathname = usePathname();
  const { user } = useAuth();

  const getPageTitle = () => {
    const titles: Record<string, string> = {
      "/dashboard": "Dashboard",
      "/lab": "Prompt Lab",
      "/workflows": "Workflow Builder",
      "/image-studio": "Image Prompt Studio",
      "/marketplace": "Prompt Marketplace",
      "/saved": "Saved Prompts",
      "/analytics": "Analytics",
      "/settings": "Settings",
    };
    return titles[pathname] || "Dashboard";
  };

  return (
    <header className="sticky top-0 z-30 bg-dark-950/80 backdrop-blur-xl border-b border-glass-border">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-white/5 rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5 text-slate-300" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-white">{getPageTitle()}</h1>
            <p className="text-sm text-slate-400">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
          >
            <Home className="w-4 h-4" />
            Landing
          </Link>

          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent-emerald animate-pulse" />
            <span className="text-xs text-slate-400 hidden sm:inline">AI Online</span>
          </div>

          {user && (
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-500 to-accent-purple flex items-center justify-center cursor-pointer hover:shadow-glow transition-shadow">
              <span className="text-sm font-bold text-white">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
