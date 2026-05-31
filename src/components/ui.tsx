"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Copy,
  Check,
  Sparkles,
  Brain,
  Eye,
  AlertTriangle,
  FileText,
  Shield,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PromptScore, OutputPrediction, AI_MODELS, PromptFramework } from "@/lib/types";
import { useState } from "react";

export function ScoreCard({
  title,
  value,
  maxValue = 100,
  icon: Icon,
  trend,
  color = "primary",
}: {
  title: string;
  value: number;
  maxValue?: number;
  icon: React.ElementType;
  trend?: "up" | "down" | "neutral";
  color?: "primary" | "purple" | "cyan" | "amber" | "emerald" | "pink";
}) {
  const percentage = (value / maxValue) * 100;
  const colorClasses = {
    primary: "text-primary-400",
    purple: "text-accent-purple",
    cyan: "text-accent-cyan",
    amber: "text-accent-amber",
    emerald: "text-accent-emerald",
    pink: "text-accent-pink",
  };

  const bgColorClasses = {
    primary: "from-primary-500 to-primary-600",
    purple: "from-accent-purple to-purple-600",
    cyan: "from-accent-cyan to-cyan-600",
    amber: "from-accent-amber to-amber-600",
    emerald: "from-accent-emerald to-emerald-600",
    pink: "from-accent-pink to-pink-600",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-2xl p-5 glass-card-hover"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={cn("p-2.5 rounded-xl bg-white/5", colorClasses[color])}>
          <Icon className="w-5 h-5" />
        </div>
        {trend && (
          <div className={cn(
            "flex items-center gap-1 text-xs font-medium",
            trend === "up" ? "text-accent-emerald" : trend === "down" ? "text-accent-pink" : "text-slate-400"
          )}>
            {trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {trend === "up" ? "+12%" : trend === "down" ? "-5%" : "0%"}
          </div>
        )}
      </div>

      <div className="mb-3">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-white">{value}</span>
          <span className="text-sm text-slate-400">/ {maxValue}</span>
        </div>
        <p className="text-sm text-slate-400 mt-1">{title}</p>
      </div>

      <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={cn("h-full bg-gradient-to-r rounded-full", bgColorClasses[color])}
        />
      </div>
    </motion.div>
  );
}

export function ScoreBreakdown({ score }: { score: PromptScore }) {
  const metrics = [
    { name: "Clarity", value: score.clarity, icon: Eye, color: "primary" as const },
    { name: "Context", value: score.context, icon: FileText, color: "purple" as const },
    { name: "Specificity", value: score.specificity, icon: Layers, color: "cyan" as const },
    { name: "Reasoning", value: score.reasoning, icon: Brain, color: "emerald" as const },
    { name: "Hallucination Risk", value: 100 - score.hallucinationRisk, icon: AlertTriangle, color: "amber" as const },
    { name: "Output Control", value: score.outputControl, icon: Shield, color: "pink" as const },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-2xl p-6"
    >
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="w-5 h-5 text-primary-400" />
        <h3 className="text-lg font-semibold text-white">Prompt Intelligence Score</h3>
      </div>

      <div className="space-y-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          const colorClasses = {
            primary: "bg-primary-500",
            purple: "bg-accent-purple",
            cyan: "bg-accent-cyan",
            emerald: "bg-accent-emerald",
            amber: "bg-accent-amber",
            pink: "bg-accent-pink",
          };

          return (
            <motion.div
              key={metric.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-slate-400" />
                  <span className="text-sm font-medium text-slate-300">{metric.name}</span>
                </div>
                <span className={cn(
                  "text-sm font-bold",
                  metric.value >= 70 ? "text-accent-emerald" : metric.value >= 40 ? "text-accent-amber" : "text-accent-pink"
                )}>
                  {metric.value}/100
                </span>
              </div>
              <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${metric.value}%` }}
                  transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                  className={cn("h-full rounded-full", colorClasses[metric.color])}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

export function OutputPredictionCard({ prediction }: { prediction: OutputPrediction }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-2xl p-6"
    >
      <div className="flex items-center gap-2 mb-6">
        <Eye className="w-5 h-5 text-accent-cyan" />
        <h3 className="text-lg font-semibold text-white">Output Prediction</h3>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 rounded-xl bg-dark-800/50 text-center">
          <div className="text-2xl font-bold text-accent-emerald mb-1">
            {prediction.expectedQuality}%
          </div>
          <div className="text-xs text-slate-400">Expected Quality</div>
        </div>
        <div className="p-4 rounded-xl bg-dark-800/50 text-center">
          <div className="text-2xl font-bold text-accent-amber mb-1">
            {prediction.hallucinationProbability}%
          </div>
          <div className="text-xs text-slate-400">Hallucination Risk</div>
        </div>
        <div className="p-4 rounded-xl bg-dark-800/50 text-center">
          <div className="text-2xl font-bold text-accent-cyan mb-1">
            {prediction.estimatedTokens}
          </div>
          <div className="text-xs text-slate-400">Est. Tokens</div>
        </div>
        <div className="p-4 rounded-xl bg-dark-800/50 text-center">
          <div className="text-2xl font-bold text-accent-purple mb-1">
            {prediction.tokenEfficiency}%
          </div>
          <div className="text-xs text-slate-400">Token Efficiency</div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-slate-300 mb-3">Likely Weaknesses</h4>
        <ul className="space-y-2">
          {prediction.likelyWeaknesses.map((weakness, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
              <AlertTriangle className="w-4 h-4 text-accent-amber flex-shrink-0 mt-0.5" />
              {weakness}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export function ModelBadge({ modelId, size = "md" }: { modelId: string; size?: "sm" | "md" }) {
  const model = AI_MODELS.find(m => m.id === modelId);
  
  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 font-medium rounded-full",
      size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm"
    )}>
      <span className={cn(
        "w-2 h-2 rounded-full",
        model?.color || "bg-slate-500"
      )} />
      {model?.name || modelId}
    </span>
  );
}

export function CopyButton({ text, children, className }: { text: string; children?: React.ReactNode; className?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error('Failed to copy:', e);
    }
  };

  if (children) {
    return (
      <button
        onClick={handleCopy}
        className={className}
        title={copied ? "Copied!" : "Copy to clipboard"}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      onClick={handleCopy}
      className={cn(
        "p-2 rounded-lg transition-all duration-200",
        copied
          ? "bg-accent-emerald/20 text-accent-emerald"
          : "bg-dark-700 text-slate-400 hover:bg-white/10 hover:text-white"
      )}
      title={copied ? "Copied!" : "Copy to clipboard"}
    >
      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
    </button>
  );
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="p-4 rounded-2xl bg-dark-800/50 mb-4">
        <Icon className="w-12 h-12 text-slate-500" />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-slate-400 max-w-sm mb-6">{description}</p>
      {action}
    </div>
  );
}

export function LoadingSpinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: "w-4 h-4 border-2",
    md: "w-6 h-6 border-2",
    lg: "w-8 h-8 border-3",
  };

  return (
    <div className={cn(
      "border-primary-500/30 border-t-primary-500 rounded-full animate-spin",
      sizes[size]
    )} />
  );
}

export function StatCard({
  label,
  value,
  icon: Icon,
  trend,
  color = "primary",
}: {
  label: string;
  value: string | number;
  icon: React.ElementType;
  trend?: string;
  color?: "primary" | "purple" | "cyan" | "amber" | "emerald";
}) {
  const colorClasses = {
    primary: "text-primary-400 bg-primary-500/10",
    purple: "text-accent-purple bg-accent-purple/10",
    cyan: "text-accent-cyan bg-accent-cyan/10",
    amber: "text-accent-amber bg-accent-amber/10",
    emerald: "text-accent-emerald bg-accent-emerald/10",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-2xl p-5 glass-card-hover"
    >
      <div className="flex items-center justify-between mb-3">
        <div className={cn("p-2 rounded-xl", colorClasses[color])}>
          <Icon className="w-5 h-5" />
        </div>
        {trend && (
          <span className="text-xs font-medium text-accent-emerald">{trend}</span>
        )}
      </div>
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
      <div className="text-sm text-slate-400">{label}</div>
    </motion.div>
  );
}
