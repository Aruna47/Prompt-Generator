"use client";

import { DashboardLayout } from "@/components/layout";
import {
  BarChart3,
  TrendingUp,
  Sparkles,
  Clock,
  Star,
  Zap,
  Brain,
  Eye,
  AlertTriangle,
  Layers,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { motion } from "framer-motion";
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
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import { cn } from "@/lib/utils";

const weeklyData = [
  { name: "Mon", prompts: 12, enhanced: 8, avgScore: 65 },
  { name: "Tue", prompts: 19, enhanced: 15, avgScore: 72 },
  { name: "Wed", prompts: 15, enhanced: 12, avgScore: 70 },
  { name: "Thu", prompts: 22, enhanced: 18, avgScore: 78 },
  { name: "Fri", prompts: 28, enhanced: 24, avgScore: 82 },
  { name: "Sat", prompts: 18, enhanced: 14, avgScore: 75 },
  { name: "Sun", prompts: 24, enhanced: 20, avgScore: 79 },
];

const monthlyData = [
  { name: "Week 1", prompts: 45, enhanced: 32, saved: 12 },
  { name: "Week 2", prompts: 58, enhanced: 45, saved: 18 },
  { name: "Week 3", prompts: 72, enhanced: 58, saved: 24 },
  { name: "Week 4", prompts: 89, enhanced: 76, saved: 31 },
];

const scoreTrendData = [
  { name: "W1", score: 58, clarity: 55, context: 52, specificity: 48 },
  { name: "W2", score: 65, clarity: 62, context: 58, specificity: 55 },
  { name: "W3", score: 72, clarity: 70, context: 68, specificity: 62 },
  { name: "W4", score: 78, clarity: 76, context: 74, specificity: 72 },
];

const categoryData = [
  { name: "Coding", value: 35, color: "#6366f1" },
  { name: "Content", value: 28, color: "#06b6d4" },
  { name: "Image", value: 22, color: "#a855f7" },
  { name: "Business", value: 15, color: "#f59e0b" },
];

const radarData = [
  { subject: "Clarity", A: 78, fullMark: 100 },
  { subject: "Context", A: 74, fullMark: 100 },
  { subject: "Specificity", A: 72, fullMark: 100 },
  { subject: "Reasoning", A: 68, fullMark: 100 },
  { subject: "Structure", A: 75, fullMark: 100 },
  { subject: "Control", A: 70, fullMark: 100 },
];

const modelUsageData = [
  { name: "ChatGPT", count: 45 },
  { name: "Claude", count: 32 },
  { name: "Gemini", count: 18 },
  { name: "Midjourney", count: 15 },
  { name: "Other", count: 10 },
];

export default function AnalyticsPage() {
  const stats = [
    {
      label: "Total Prompts",
      value: "156",
      change: "+24%",
      trend: "up",
      icon: Sparkles,
      color: "primary",
    },
    {
      label: "Avg. Score",
      value: "78",
      change: "+12%",
      trend: "up",
      icon: TrendingUp,
      color: "emerald",
    },
    {
      label: "Time Saved",
      value: "42h",
      change: "+8h",
      trend: "up",
      icon: Clock,
      color: "purple",
    },
    {
      label: "Favorites",
      value: "31",
      change: "+5",
      trend: "up",
      icon: Star,
      color: "amber",
    },
  ];

  const colorClasses = {
    primary: "from-primary-500 to-primary-600",
    emerald: "from-accent-emerald to-emerald-600",
    purple: "from-accent-purple to-purple-600",
    amber: "from-accent-amber to-amber-600",
  };

  const bgColorClasses = {
    primary: "bg-primary-500/10",
    emerald: "bg-accent-emerald/10",
    purple: "bg-accent-purple/10",
    amber: "bg-accent-amber/10",
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="glass-card rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-emerald/10 rounded-full blur-3xl" />
          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-accent-emerald/20">
                <BarChart3 className="w-6 h-6 text-accent-emerald" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Analytics</h1>
                <p className="text-slate-400 text-sm">
                  Track your prompt performance and improvement over time
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-2xl p-5 glass-card-hover"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={cn("p-2.5 rounded-xl", bgColorClasses[stat.color as keyof typeof bgColorClasses])}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div
                    className={cn(
                      "flex items-center gap-1 text-xs font-medium",
                      stat.trend === "up" ? "text-accent-emerald" : "text-accent-pink"
                    )}
                  >
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="w-3 h-3" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3" />
                    )}
                    {stat.change}
                  </div>
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 glass-card rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Weekly Activity</h3>
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
                <BarChart data={weeklyData}>
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
                  <Bar dataKey="enhanced" fill="#a855f7" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
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

        <div className="grid lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-accent-purple" />
                <h3 className="text-lg font-semibold text-white">Score Trends</h3>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={scoreTrendData}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorClarity" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                    </linearGradient>
                  </defs>
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
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="#6366f1"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorScore)"
                  />
                  <Area
                    type="monotone"
                    dataKey="clarity"
                    stroke="#06b6d4"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorClarity)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center gap-6 mt-4 justify-center text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary-500" />
                <span className="text-slate-400">Overall Score</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-accent-cyan" />
                <span className="text-slate-400">Clarity</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-card rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-accent-amber" />
                <h3 className="text-lg font-semibold text-white">Prompt Intelligence Radar</h3>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#21262d" />
                  <PolarAngleAxis dataKey="subject" stroke="#94a3b8" fontSize={12} />
                  <PolarRadiusAxis
                    angle={30}
                    domain={[0, 100]}
                    stroke="#484f58"
                    fontSize={10}
                  />
                  <Radar
                    name="Score"
                    dataKey="A"
                    stroke="#6366f1"
                    fill="#6366f1"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#161b22",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "12px",
                      color: "#f8fafc",
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="glass-card rounded-2xl p-6"
          >
            <h3 className="text-lg font-semibold text-white mb-6">Monthly Growth</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
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
                  <Line
                    type="monotone"
                    dataKey="prompts"
                    stroke="#6366f1"
                    strokeWidth={2}
                    dot={{ fill: "#6366f1", strokeWidth: 2 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="enhanced"
                    stroke="#a855f7"
                    strokeWidth={2}
                    dot={{ fill: "#a855f7", strokeWidth: 2 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="saved"
                    stroke="#06b6d4"
                    strokeWidth={2}
                    dot={{ fill: "#06b6d4", strokeWidth: 2 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center gap-6 mt-4 justify-center text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary-500" />
                <span className="text-slate-400">Total Prompts</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-accent-purple" />
                <span className="text-slate-400">Enhanced</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-accent-cyan" />
                <span className="text-slate-400">Saved</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="glass-card rounded-2xl p-6"
          >
            <h3 className="text-lg font-semibold text-white mb-6">Insights</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-accent-emerald/10 border border-accent-emerald/20">
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-accent-emerald flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-accent-emerald mb-1">
                      Great improvement!
                    </p>
                    <p className="text-sm text-slate-300">
                      Your average prompt score has increased by 34% over the last month. Keep it
                      up!
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-accent-amber/10 border border-accent-amber/20">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-accent-amber flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-accent-amber mb-1">
                      Opportunity area
                    </p>
                    <p className="text-sm text-slate-300">
                      Your reasoning scores are lowest. Try using Chain of Thought framework more
                      often.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-primary-500/10 border border-primary-500/20">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-primary-400 mb-1">Pro tip</p>
                    <p className="text-sm text-slate-300">
                      Prompts with explicit output formatting score 27% higher on average. Try
                      using JSON or structured output specifications.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-accent-purple/10 border border-accent-purple/20">
                <div className="flex items-start gap-3">
                  <Layers className="w-5 h-5 text-accent-purple flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-accent-purple mb-1">
                      Framework usage
                    </p>
                    <p className="text-sm text-slate-300">
                      You use RTF (Role-Task-Format) most often. Try Tree of Thought for complex
                      problem-solving tasks.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
