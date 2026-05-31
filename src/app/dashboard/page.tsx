"use client";

import { DashboardLayout } from "@/components/layout";
import { StatCard, ScoreCard, EmptyState } from "@/components/ui";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { motion } from "framer-motion";
import {
  Sparkles,
  TrendingUp,
  Clock,
  Star,
  Download,
  Brain,
  Eye,
  Zap,
  Plus,
  ArrowRight,
  FlaskConical,
  Workflow,
  Image,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const activityData = [
  { name: "Mon", prompts: 12, enhancements: 8 },
  { name: "Tue", prompts: 19, enhancements: 15 },
  { name: "Wed", prompts: 15, enhancements: 12 },
  { name: "Thu", prompts: 22, enhancements: 18 },
  { name: "Fri", prompts: 28, enhancements: 24 },
  { name: "Sat", prompts: 18, enhancements: 14 },
  { name: "Sun", prompts: 24, enhancements: 20 },
];

const scoreData = [
  { name: "Week 1", avgScore: 45 },
  { name: "Week 2", avgScore: 58 },
  { name: "Week 3", avgScore: 67 },
  { name: "Week 4", avgScore: 78 },
];

const categoryData = [
  { name: "Coding", value: 35, color: "#6366f1" },
  { name: "Content", value: 25, color: "#a855f7" },
  { name: "Image", value: 20, color: "#06b6d4" },
  { name: "Business", value: 15, color: "#f59e0b" },
  { name: "Other", value: 5, color: "#ec4899" },
];

const recentPrompts = [
  {
    id: "1",
    title: "React Component Generator",
    category: "coding",
    score: 92,
    model: "chatgpt",
    createdAt: new Date(Date.now() - 1000 * 60 * 30),
  },
  {
    id: "2",
    title: "Product Launch Email",
    category: "content",
    score: 87,
    model: "claude",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
  {
    id: "3",
    title: "Cinematic Cityscape",
    category: "image",
    score: 95,
    model: "midjourney",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
  },
  {
    id: "4",
    title: "Market Analysis Report",
    category: "business",
    score: 78,
    model: "gemini",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },
];

const trendingTemplates = [
  {
    id: "1",
    title: "SaaS App Builder",
    description: "Complete SaaS application generation workflow",
    uses: 1245,
    rating: 4.9,
  },
  {
    id: "2",
    title: "YouTube Script Master",
    description: "Generate engaging video scripts",
    uses: 892,
    rating: 4.8,
  },
  {
    id: "3",
    title: "Code Review Expert",
    description: "Comprehensive code review prompts",
    uses: 756,
    rating: 4.7,
  },
];

const quickActions = [
  { icon: FlaskConical, label: "Enhance Prompt", href: "/lab", color: "primary" as const },
  { icon: Workflow, label: "Build Workflow", href: "/workflows", color: "purple" as const },
  { icon: Image, label: "Image Prompt", href: "/image-studio", color: "cyan" as const },
];

export default function DashboardPage() {
  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      coding: "badge-primary",
      content: "badge-cyan",
      image: "badge-purple",
      business: "badge-amber",
    };
    return colors[category] || "badge-primary";
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="glass-card rounded-2xl p-6 md:p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl" />
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  Welcome back! 👋
                </h2>
                <p className="text-slate-400">
                  Your prompts are getting better. Keep enhancing!
                </p>
              </div>
              <div className="flex gap-3">
                {quickActions.map((action) => {
                  const Icon = action.icon;
                  const colorClasses = {
                    primary: "from-primary-600 to-primary-500",
                    purple: "from-accent-purple to-purple-600",
                    cyan: "from-accent-cyan to-cyan-600",
                  };
                  return (
                    <Link
                      key={action.href}
                      href={action.href}
                      className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r text-white rounded-xl font-medium hover:shadow-glow transition-all duration-300 hover:scale-105"
                      style={{
                        background: action.color === "primary" 
                          ? "linear-gradient(to right, #4f46e5, #6366f1)"
                          : action.color === "purple"
                          ? "linear-gradient(to right, #a855f7, #9333ea)"
                          : "linear-gradient(to right, #06b6d4, #0891b2)"
                      }}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="hidden sm:inline">{action.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Total Prompts"
            value="156"
            icon={Sparkles}
            trend="+24 this week"
            color="primary"
          />
          <StatCard
            label="Avg. Score"
            value="78"
            icon={TrendingUp}
            trend="+12% improvement"
            color="emerald"
          />
          <StatCard
            label="Saved Prompts"
            value="42"
            icon={Star}
            color="purple"
          />
          <StatCard
            label="Templates Used"
            value="18"
            icon={Download}
            color="cyan"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ScoreCard
            title="Prompt Quality"
            value={78}
            icon={Brain}
            trend="up"
            color="primary"
          />
          <ScoreCard
            title="AI Readiness"
            value={85}
            icon={Zap}
            trend="up"
            color="purple"
          />
          <ScoreCard
            title="Clarity Score"
            value={72}
            icon={Eye}
            trend="neutral"
            color="cyan"
          />
          <ScoreCard
            title="Efficiency"
            value={91}
            icon={Clock}
            trend="up"
            color="emerald"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 glass-card rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Activity Overview</h3>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary-500" />
                  <span className="text-slate-400">Prompts</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-accent-purple" />
                  <span className="text-slate-400">Enhanced</span>
                </div>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#21262d" />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                  <YAxis stroke="#94a3b8" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#161b22",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "12px",
                      color: "#f8fafc",
                    }}
                  />
                  <Bar dataKey="prompts" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="enhancements" fill="#a855f7" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-2xl p-6"
          >
            <h3 className="text-lg font-semibold text-white mb-6">Categories</h3>
            <div className="h-48 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#161b22",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "12px",
                      color: "#f8fafc",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              {categoryData.map((cat) => (
                <div key={cat.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: cat.color }}
                    />
                    <span className="text-sm text-slate-400">{cat.name}</span>
                  </div>
                  <span className="text-sm font-medium text-white">{cat.value}%</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 glass-card rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Recent Prompts</h3>
              <Link
                href="/saved"
                className="text-sm text-primary-400 hover:text-primary-300 flex items-center gap-1 transition-colors"
              >
                View All
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="space-y-3">
              {recentPrompts.map((prompt, i) => (
                <motion.div
                  key={prompt.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center justify-between p-4 rounded-xl bg-dark-800/50 hover:bg-white/5 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500/20 to-accent-purple/20 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-primary-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white group-hover:text-primary-400 transition-colors">
                        {prompt.title}
                      </h4>
                      <div className="flex items-center gap-3 mt-1">
                        <span className={cn("badge", getCategoryColor(prompt.category))}>
                          {prompt.category}
                        </span>
                        <span className="text-xs text-slate-500">
                          {formatTimeAgo(prompt.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className={cn(
                        "text-lg font-bold",
                        prompt.score >= 80 ? "text-accent-emerald" : prompt.score >= 60 ? "text-accent-amber" : "text-accent-pink"
                      )}>
                        {prompt.score}
                      </div>
                      <div className="text-xs text-slate-500">score</div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-600 group-hover:text-primary-400 group-hover:translate-x-1 transition-all" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-2xl p-6"
          >
            <h3 className="text-lg font-semibold text-white mb-6">Score Progress</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={scoreData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#21262d" />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                  <YAxis stroke="#94a3b8" fontSize={12} domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#161b22",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "12px",
                      color: "#f8fafc",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="avgScore"
                    stroke="#6366f1"
                    strokeWidth={3}
                    dot={{ fill: "#6366f1", strokeWidth: 2 }}
                    activeDot={{ r: 6, fill: "#6366f1" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 p-4 rounded-xl bg-accent-emerald/10 border border-accent-emerald/20">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-accent-emerald" />
                <span className="text-sm font-medium text-accent-emerald">+73% improvement in 4 weeks</span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Trending Templates</h3>
            <Link
              href="/marketplace"
              className="text-sm text-primary-400 hover:text-primary-300 flex items-center gap-1 transition-colors"
            >
              View Marketplace
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {trendingTemplates.map((template, i) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-5 rounded-xl bg-dark-800/50 border border-glass-border hover:border-primary-500/30 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500/20 to-accent-purple/20 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-primary-400" />
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-accent-amber fill-current" />
                    <span className="text-sm font-medium text-white">{template.rating}</span>
                  </div>
                </div>
                <h4 className="font-semibold text-white mb-1 group-hover:text-primary-400 transition-colors">
                  {template.title}
                </h4>
                <p className="text-sm text-slate-400 mb-3">{template.description}</p>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Download className="w-3 h-3" />
                  {template.uses.toLocaleString()} uses
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
