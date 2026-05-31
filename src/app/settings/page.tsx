"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout";
import {
  Settings,
  User,
  Key,
  Bell,
  Palette,
  Shield,
  HelpCircle,
  CreditCard,
  Users,
  Globe,
  ChevronRight,
  Moon,
  Sun,
  Lock,
  Eye,
  EyeOff,
  Check,
  Copy,
  Plus,
  Trash2,
  RefreshCw,
  LogOut,
  AlertCircle,
  Info,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";

const settingSections = [
  { id: "profile", label: "Profile", icon: User },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "api-keys", label: "API Keys", icon: Key },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "team", label: "Team", icon: Users },
  { id: "security", label: "Security", icon: Shield },
  { id: "support", label: "Support", icon: HelpCircle },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("profile");
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    updates: false,
    marketing: false,
  });
  const [apiKeys, setApiKeys] = useState([
    { id: 1, name: "Production Key", key: "sk-...3x2p", createdAt: "2026-04-15", lastUsed: "2 hours ago" },
    { id: 2, name: "Development Key", key: "sk-...7k9m", createdAt: "2026-03-20", lastUsed: "5 days ago" },
  ]);
  const [showNewKeyModal, setShowNewKeyModal] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const { user, signOut } = useAuth();

  const Toggle = ({
    checked,
    onChange,
  }: {
    checked: boolean;
    onChange: (checked: boolean) => void;
  }) => (
    <button
      onClick={() => onChange(!checked)}
      className={cn(
        "relative w-11 h-6 rounded-full transition-colors duration-200",
        checked ? "bg-primary-500" : "bg-dark-700"
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform duration-200",
          checked && "translate-x-5"
        )}
      />
    </button>
  );

  const addApiKey = () => {
    if (!newKeyName.trim()) return;
    const newKey = {
      id: apiKeys.length + 1,
      name: newKeyName,
      key: `sk-...${Math.random().toString(36).substring(2, 6)}`,
      createdAt: new Date().toISOString().split("T")[0],
      lastUsed: "Never",
    };
    setApiKeys([...apiKeys, newKey]);
    setNewKeyName("");
    setShowNewKeyModal(false);
  };

  const deleteApiKey = (id: number) => {
    setApiKeys(apiKeys.filter((k) => k.id !== id));
  };

  const renderSection = () => {
    switch (activeSection) {
      case "profile":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">Profile</h3>
              <p className="text-sm text-slate-400">Manage your personal information</p>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-dark-800/50 border border-glass-border">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-accent-purple flex items-center justify-center">
                <span className="text-2xl font-bold text-white">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </span>
              </div>
              <div>
                <p className="font-semibold text-white">{user?.name || "User"}</p>
                <p className="text-sm text-slate-400">{user?.email || "user@example.com"}</p>
                <button className="mt-2 text-sm text-primary-400 hover:text-primary-300">
                  Change avatar
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-300 mb-2 block">Full Name</label>
                <input
                  type="text"
                  defaultValue={user?.name || "User"}
                  className="w-full bg-dark-800/50 border border-glass-border rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-primary-500/50 transition-all"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-300 mb-2 block">Email</label>
                <input
                  type="email"
                  defaultValue={user?.email || "user@example.com"}
                  className="w-full bg-dark-800/50 border border-glass-border rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-primary-500/50 transition-all"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-300 mb-2 block">Profession</label>
                <select className="w-full bg-dark-800/50 border border-glass-border rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-primary-500/50 transition-all">
                  <option>Software Developer</option>
                  <option>Product Manager</option>
                  <option>Content Creator</option>
                  <option>Designer</option>
                  <option>Marketer</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-300 mb-2 block">Timezone</label>
                <select className="w-full bg-dark-800/50 border border-glass-border rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-primary-500/50 transition-all">
                  <option>UTC-8 Pacific Time</option>
                  <option>UTC-5 Eastern Time</option>
                  <option>UTC+0 London</option>
                  <option>UTC+1 Paris</option>
                  <option>UTC+8 Singapore</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="btn-primary">Save Changes</button>
              <button className="btn-secondary">Cancel</button>
            </div>
          </div>
        );

      case "appearance":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">Appearance</h3>
              <p className="text-sm text-slate-400">Customize how PromptForge looks</p>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-dark-800/50 border border-glass-border flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2.5 rounded-xl bg-primary-500/10">
                    {darkMode ? <Moon className="w-5 h-5 text-primary-400" /> : <Sun className="w-5 h-5 text-primary-400" />}
                  </div>
                  <div>
                    <p className="font-medium text-white">Dark Mode</p>
                    <p className="text-sm text-slate-400">Use dark theme across the app</p>
                  </div>
                </div>
                <Toggle checked={darkMode} onChange={setDarkMode} />
              </div>

              <div className="p-4 rounded-xl bg-dark-800/50 border border-glass-border">
                <p className="font-medium text-white mb-4">Accent Color</p>
                <div className="flex gap-3">
                  {[
                    { color: "#6366f1", name: "Indigo" },
                    { color: "#a855f7", name: "Purple" },
                    { color: "#06b6d4", name: "Cyan" },
                    { color: "#ec4899", name: "Pink" },
                    { color: "#f59e0b", name: "Amber" },
                    { color: "#10b981", name: "Emerald" },
                  ].map((c) => (
                    <button
                      key={c.name}
                      className={cn(
                        "w-10 h-10 rounded-xl transition-all ring-2 ring-offset-2 ring-offset-dark-950",
                        c.color === "#6366f1" ? "ring-primary-500" : "ring-transparent"
                      )}
                      style={{ backgroundColor: c.color }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-dark-800/50 border border-glass-border">
                <p className="font-medium text-white mb-4">Interface Density</p>
                <div className="grid grid-cols-3 gap-3">
                  {["Compact", "Default", "Comfortable"].map((density, i) => (
                    <button
                      key={density}
                      className={cn(
                        "p-3 rounded-xl text-sm font-medium transition-all text-center",
                        i === 1
                          ? "bg-primary-500/20 text-primary-400 border border-primary-500/30"
                          : "bg-dark-700/50 text-slate-400 border border-glass-border hover:bg-white/5"
                      )}
                    >
                      {density}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case "notifications":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">Notifications</h3>
              <p className="text-sm text-slate-400">Manage how you receive notifications</p>
            </div>

            <div className="space-y-3">
              {[
                {
                  key: "email",
                  title: "Email Notifications",
                  description: "Receive updates via email",
                },
                {
                  key: "push",
                  title: "Push Notifications",
                  description: "Browser push notifications",
                },
                {
                  key: "updates",
                  title: "Product Updates",
                  description: "New features and improvements",
                },
                {
                  key: "marketing",
                  title: "Marketing Emails",
                  description: "Special offers and promotions",
                },
              ].map((item) => (
                <div
                  key={item.key}
                  className="p-4 rounded-xl bg-dark-800/50 border border-glass-border flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium text-white">{item.title}</p>
                    <p className="text-sm text-slate-400">{item.description}</p>
                  </div>
                  <Toggle
                    checked={notifications[item.key as keyof typeof notifications]}
                    onChange={(checked) =>
                      setNotifications({ ...notifications, [item.key]: checked })
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        );

      case "api-keys":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">API Keys</h3>
                <p className="text-sm text-slate-400">Manage your API keys for integration</p>
              </div>
              <button
                onClick={() => setShowNewKeyModal(true)}
                className="flex items-center gap-2 btn-primary"
              >
                <Plus className="w-4 h-4" />
                Create Key
              </button>
            </div>

            <div className="p-4 rounded-xl bg-accent-amber/10 border border-accent-amber/20 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-accent-amber flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-accent-amber">Keep your keys secure</p>
                <p className="text-sm text-slate-400">
                  Never share your API keys in code, client-side apps, or public repositories.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {apiKeys.map((apiKey) => (
                <div
                  key={apiKey.id}
                  className="p-4 rounded-xl bg-dark-800/50 border border-glass-border"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-2.5 rounded-xl bg-primary-500/10">
                        <Key className="w-5 h-5 text-primary-400" />
                      </div>
                      <div>
                        <p className="font-medium text-white">{apiKey.name}</p>
                        <div className="flex items-center gap-4 mt-1 text-xs text-slate-500">
                          <span>Created: {apiKey.createdAt}</span>
                          <span>Last used: {apiKey.lastUsed}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <code className="px-3 py-1.5 bg-dark-700 rounded-lg text-sm text-slate-300 font-mono">
                        {apiKey.key}
                      </code>
                      <button className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors">
                        <Copy className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg text-slate-400 hover:text-accent-pink hover:bg-accent-pink/10 transition-colors">
                        <RefreshCw className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteApiKey(apiKey.id)}
                        className="p-2 rounded-lg text-slate-400 hover:text-accent-pink hover:bg-accent-pink/10 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {showNewKeyModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
                <div className="w-full max-w-md glass-card rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Create New API Key</h3>
                  <div className="mb-4">
                    <label className="text-sm font-medium text-slate-300 mb-2 block">Key Name</label>
                    <input
                      type="text"
                      value={newKeyName}
                      onChange={(e) => setNewKeyName(e.target.value)}
                      placeholder="e.g., Production API Key"
                      className="w-full bg-dark-800/50 border border-glass-border rounded-xl px-4 py-3 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-primary-500/50 transition-all"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button onClick={addApiKey} className="flex-1 btn-primary">
                      Create Key
                    </button>
                    <button
                      onClick={() => setShowNewKeyModal(false)}
                      className="flex-1 btn-secondary"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case "billing":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">Billing & Plan</h3>
              <p className="text-sm text-slate-400">Manage your subscription and payment methods</p>
            </div>

            <div className="p-6 rounded-xl bg-gradient-to-br from-primary-500/10 to-accent-purple/10 border border-primary-500/30">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-primary-500/20">
                    <CreditCard className="w-5 h-5 text-primary-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-white capitalize">{user?.plan || "Pro"} Plan</p>
                      <span className="px-2 py-0.5 bg-accent-emerald/20 text-accent-emerald text-xs font-medium rounded-full">
                        Active
                      </span>
                    </div>
                    <p className="text-sm text-slate-400">Renews on May 15, 2026</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-white">$19<span className="text-sm font-normal text-slate-400">/mo</span></p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="p-3 rounded-xl bg-dark-800/50 text-center">
                  <p className="text-lg font-bold text-white">247</p>
                  <p className="text-xs text-slate-400">Prompts Used</p>
                </div>
                <div className="p-3 rounded-xl bg-dark-800/50 text-center">
                  <p className="text-lg font-bold text-white">Unlimited</p>
                  <p className="text-xs text-slate-400">Enhancements</p>
                </div>
                <div className="p-3 rounded-xl bg-dark-800/50 text-center">
                  <p className="text-lg font-bold text-white">47</p>
                  <p className="text-xs text-slate-400">API Calls</p>
                </div>
              </div>

              <div className="flex gap-3 mt-4">
                <button className="flex-1 btn-secondary">Manage Subscription</button>
                <button className="flex-1 btn-secondary">Update Payment</button>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-dark-800/50 border border-glass-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-dark-700">
                    <CreditCard className="w-5 h-5 text-slate-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white">•••• •••• •••• 4242</p>
                    <p className="text-sm text-slate-400">Visa • Expires 12/27</p>
                  </div>
                </div>
                <button className="text-sm text-primary-400 hover:text-primary-300">Change</button>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-3">Billing History</h4>
              <div className="space-y-2">
                {[
                  { date: "Apr 15, 2026", amount: "$19.00", status: "Paid", invoice: "INV-2026-0415" },
                  { date: "Mar 15, 2026", amount: "$19.00", status: "Paid", invoice: "INV-2026-0315" },
                  { date: "Feb 15, 2026", amount: "$19.00", status: "Paid", invoice: "INV-2026-0215" },
                ].map((invoice, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-dark-800/50 border border-glass-border flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="font-medium text-white">{invoice.date}</p>
                        <p className="text-xs text-slate-500">{invoice.invoice}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="px-2 py-1 bg-accent-emerald/20 text-accent-emerald text-xs font-medium rounded-lg">
                        {invoice.status}
                      </span>
                      <span className="font-semibold text-white">{invoice.amount}</span>
                      <button className="text-sm text-primary-400 hover:text-primary-300">
                        Receipt
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "team":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Team</h3>
                <p className="text-sm text-slate-400">Manage your team members and workspace</p>
              </div>
              <button className="flex items-center gap-2 btn-primary">
                <Plus className="w-4 h-4" />
                Invite Member
              </button>
            </div>

            <div className="p-4 rounded-xl bg-dark-800/50 border border-glass-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-primary-500/10">
                  <Users className="w-5 h-5 text-primary-400" />
                </div>
                <div>
                  <p className="font-medium text-white">Personal Workspace</p>
                  <p className="text-sm text-slate-400">1 member • Pro Plan</p>
                </div>
              </div>
              <button className="text-sm text-primary-400 hover:text-primary-300">Upgrade to Team</button>
            </div>

            <div className="space-y-3">
              {[
                { name: user?.name || "You", email: user?.email || "you@example.com", role: "Owner", avatar: "Y" },
              ].map((member, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-dark-800/50 border border-glass-border flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-purple flex items-center justify-center">
                      <span className="text-sm font-bold text-white">{member.avatar}</span>
                    </div>
                    <div>
                      <p className="font-medium text-white">{member.name}</p>
                      <p className="text-sm text-slate-400">{member.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-1 bg-primary-500/20 text-primary-400 text-xs font-medium rounded-lg">
                      {member.role}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-accent-purple/10 border border-accent-purple/20 flex items-start gap-3">
              <Info className="w-5 h-5 text-accent-purple flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-accent-purple mb-1">Team Features</p>
                <p className="text-sm text-slate-400">
                  Upgrade to Team plan for shared workspaces, collaborative editing, and team
                  management.
                </p>
              </div>
            </div>
          </div>
        );

      case "security":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">Security</h3>
              <p className="text-sm text-slate-400">Manage your account security settings</p>
            </div>

            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-dark-800/50 border border-glass-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-primary-500/10">
                    <Lock className="w-5 h-5 text-primary-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Password</p>
                    <p className="text-sm text-slate-400">Last changed 30 days ago</p>
                  </div>
                </div>
                <button className="text-sm text-primary-400 hover:text-primary-300">Change</button>
              </div>

              <div className="p-4 rounded-xl bg-dark-800/50 border border-glass-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-accent-emerald/10">
                    <Shield className="w-5 h-5 text-accent-emerald" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Two-Factor Authentication</p>
                    <p className="text-sm text-slate-400">Add an extra layer of security</p>
                  </div>
                </div>
                <span className="px-2 py-1 bg-dark-700 text-slate-400 text-xs font-medium rounded-lg">
                  Disabled
                </span>
              </div>

              <div className="p-4 rounded-xl bg-dark-800/50 border border-glass-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-accent-cyan/10">
                    <Globe className="w-5 h-5 text-accent-cyan" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Active Sessions</p>
                    <p className="text-sm text-slate-400">2 active sessions</p>
                  </div>
                </div>
                <button className="text-sm text-primary-400 hover:text-primary-300">Manage</button>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-accent-emerald/10 border border-accent-emerald/20 flex items-start gap-3">
              <Check className="w-5 h-5 text-accent-emerald flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-accent-emerald mb-1">Your account is secure</p>
                <p className="text-sm text-slate-400">
                  We recommend enabling two-factor authentication for maximum security.
                </p>
              </div>
            </div>
          </div>
        );

      case "support":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">Support & Help</h3>
              <p className="text-sm text-slate-400">Get help with PromptForge AI</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-dark-800/50 border border-glass-border hover:bg-white/5 transition-colors cursor-pointer">
                <div className="p-2.5 rounded-xl bg-primary-500/10 w-fit mb-3">
                  <HelpCircle className="w-5 h-5 text-primary-400" />
                </div>
                <h4 className="font-semibold text-white mb-1">Documentation</h4>
                <p className="text-sm text-slate-400">Learn how to use PromptForge features</p>
              </div>

              <div className="p-5 rounded-xl bg-dark-800/50 border border-glass-border hover:bg-white/5 transition-colors cursor-pointer">
                <div className="p-2.5 rounded-xl bg-accent-purple/10 w-fit mb-3">
                  <Users className="w-5 h-5 text-accent-purple" />
                </div>
                <h4 className="font-semibold text-white mb-1">Community Forum</h4>
                <p className="text-sm text-slate-400">Join discussions with other users</p>
              </div>

              <div className="p-5 rounded-xl bg-dark-800/50 border border-glass-border hover:bg-white/5 transition-colors cursor-pointer">
                <div className="p-2.5 rounded-xl bg-accent-cyan/10 w-fit mb-3">
                  <AlertCircle className="w-5 h-5 text-accent-cyan" />
                </div>
                <h4 className="font-semibold text-white mb-1">Report a Bug</h4>
                <p className="text-sm text-slate-400">Help us improve by reporting issues</p>
              </div>

              <div className="p-5 rounded-xl bg-dark-800/50 border border-glass-border hover:bg-white/5 transition-colors cursor-pointer">
                <div className="p-2.5 rounded-xl bg-accent-amber/10 w-fit mb-3">
                  <Sparkles className="w-5 h-5 text-accent-amber" />
                </div>
                <h4 className="font-semibold text-white mb-1">Feature Request</h4>
                <p className="text-sm text-slate-400">Suggest new features and improvements</p>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-dark-800/50 border border-glass-border">
              <h4 className="font-semibold text-white mb-3">Contact Support</h4>
              <p className="text-sm text-slate-400 mb-4">
                Need help? Our support team typically responds within 24 hours.
              </p>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full bg-dark-700/50 border border-glass-border rounded-xl px-4 py-3 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-primary-500/50 transition-all"
                />
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full bg-dark-700/50 border border-glass-border rounded-xl px-4 py-3 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-primary-500/50 transition-all"
                />
                <select className="w-full bg-dark-700/50 border border-glass-border rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-primary-500/50 transition-all">
                  <option>Select a topic</option>
                  <option>Technical Issue</option>
                  <option>Billing Question</option>
                  <option>Feature Request</option>
                  <option>General Inquiry</option>
                </select>
                <textarea
                  placeholder="Describe your issue or question..."
                  rows={4}
                  className="w-full bg-dark-700/50 border border-glass-border rounded-xl px-4 py-3 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-primary-500/50 transition-all resize-none"
                />
                <button className="btn-primary">Send Message</button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-glass-border">
              <button
                onClick={signOut}
                className="flex items-center gap-2 px-4 py-3 text-accent-pink hover:bg-accent-pink/10 rounded-xl transition-colors"
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
              <button className="flex items-center gap-2 px-4 py-3 text-slate-400 hover:text-accent-pink hover:bg-accent-pink/10 rounded-xl transition-colors">
                <Trash2 className="w-5 h-5" />
                Delete Account
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="glass-card rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl" />
          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary-500/20">
                <Settings className="w-6 h-6 text-primary-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Settings</h1>
                <p className="text-slate-400 text-sm">Manage your account and preferences</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <div className="glass-card rounded-2xl p-2 sticky top-24">
              {settingSections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all text-sm",
                      activeSection === section.id
                        ? "bg-primary-500/20 text-primary-400"
                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {section.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-3">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="glass-card rounded-2xl p-6"
            >
              {renderSection()}
            </motion.div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
