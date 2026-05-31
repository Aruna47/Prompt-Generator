"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Zap,
  Brain,
  Layers,
  BarChart3,
  Workflow,
  Image,
  Globe,
  Shield,
  ChevronRight,
  Menu,
  X,
  ArrowRight,
  Check,
  Star,
  Crown,
  Users,
  Edit,
} from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Sparkles,
    title: "AI Prompt Enhancer",
    description: "Transform weak prompts into elite, professional-grade prompts optimized for maximum AI output quality.",
    color: "from-primary-500 to-primary-600",
  },
  {
    icon: Brain,
    title: "Prompt Intelligence",
    description: "Analyze prompts for clarity, context, hallucination risk, and output control with detailed scoring.",
    color: "from-accent-purple to-purple-600",
  },
  {
    icon: Workflow,
    title: "Workflow Builder",
    description: "Generate complete AI workflows with step-by-step prompt chains for complex multi-stage tasks.",
    color: "from-accent-cyan to-cyan-600",
  },
  {
    icon: Image,
    title: "Image Prompt Studio",
    description: "Create cinematic prompts for Midjourney, Flux, Stable Diffusion with camera, lighting, and composition controls.",
    color: "from-accent-pink to-pink-600",
  },
  {
    icon: Layers,
    title: "Prompt Frameworks",
    description: "Access proven frameworks: RTF, Chain of Thought, Tree of Thought, Few-Shot, Agentic Prompting, and more.",
    color: "from-accent-amber to-amber-600",
  },
  {
    icon: BarChart3,
    title: "Output Prediction",
    description: "Estimate output quality, hallucination probability, token efficiency, and identify likely weaknesses.",
    color: "from-accent-emerald to-emerald-600",
  },
];

const models = [
  "ChatGPT", "Claude", "Gemini", "Midjourney", "Flux", 
  "Stable Diffusion", "Cursor AI", "GitHub Copilot", "Lovable", "Bolt.new"
];

const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started",
    features: [
      "10 prompt enhancements per day",
      "Basic prompt analysis",
      "3 prompt frameworks",
      "Community prompts access",
      "Standard support",
    ],
    cta: "Get Started Free",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$19",
    period: "per month",
    description: "For serious prompt engineers",
    features: [
      "Unlimited prompt enhancements",
      "Advanced intelligence analysis",
      "All prompt frameworks",
      "Workflow Builder access",
      "Image Prompt Studio",
      "Private prompt library",
      "Priority support",
      "API access (100 calls/day)",
    ],
    cta: "Start Free Trial",
    highlighted: true,
    badge: "Most Popular",
  },
  {
    name: "Team",
    price: "$49",
    period: "per month",
    description: "For teams and organizations",
    features: [
      "Everything in Pro",
      "Team workspace",
      "Shared prompt library",
      "Collaboration tools",
      "Advanced analytics",
      "API access (1000 calls/day)",
      "SSO authentication",
      "Dedicated support",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

const testimonials = [
  {
    quote: "PromptForge transformed how I work with AI. My prompts went from producing mediocre results to expert-level outputs overnight.",
    author: "Sarah Chen",
    role: "Senior Software Engineer",
    avatar: "SC",
  },
  {
    quote: "The Prompt Intelligence engine alone is worth the subscription. It analyzes my prompts and tells me exactly what's missing.",
    author: "Marcus Johnson",
    role: "Product Manager",
    avatar: "MJ",
  },
  {
    quote: "As a Midjourney artist, the Image Prompt Studio is a game-changer. My prompts now produce cinematic quality consistently.",
    author: "Elena Rodriguez",
    role: "Digital Artist",
    avatar: "ER",
  },
];

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="min-h-screen bg-dark-950">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-950/80 backdrop-blur-xl border-b border-glass-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-accent-purple flex items-center justify-center shadow-glow">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">PromptForge</span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-slate-300 hover:text-white transition-colors">Features</a>
              <a href="#how-it-works" className="text-sm text-slate-300 hover:text-white transition-colors">How it Works</a>
              <a href="#pricing" className="text-sm text-slate-300 hover:text-white transition-colors">Pricing</a>
              <a href="#testimonials" className="text-sm text-slate-300 hover:text-white transition-colors">Testimonials</a>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <Link href="/sign-in" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                Sign In
              </Link>
              <Link href="/sign-up" className="btn-primary text-sm">
                Get Started
              </Link>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-white/5 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-slate-300" /> : <Menu className="w-5 h-5 text-slate-300" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-dark-900/95 backdrop-blur-xl border-b border-glass-border overflow-hidden"
            >
              <div className="px-4 py-4 space-y-2">
                <a href="#features" className="block px-4 py-2 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">Features</a>
                <a href="#how-it-works" className="block px-4 py-2 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">How it Works</a>
                <a href="#pricing" className="block px-4 py-2 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">Pricing</a>
                <a href="#testimonials" className="block px-4 py-2 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">Testimonials</a>
                <div className="pt-4 border-t border-glass-border space-y-2">
                  <Link href="/sign-in" className="block px-4 py-2 text-center text-slate-300 hover:text-white rounded-lg transition-colors">
                    Sign In
                  </Link>
                  <Link href="/sign-up" className="block btn-primary text-center">
                    Get Started
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient pointer-events-none" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-pulse-slow pointer-events-none" />
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-accent-purple/10 rounded-full blur-3xl animate-pulse-slow pointer-events-none" style={{ animationDelay: '2s' }} />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 mb-8">
              <Sparkles className="w-4 h-4 text-primary-400" />
              <span className="text-sm font-medium text-primary-300">Next-Gen AI Prompt Engineering Platform</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Transform Your Prompts Into
              <span className="block gradient-text mt-2">Elite AI Outputs</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              PromptForge AI is an elite prompt engineering platform that transforms weak prompts into optimized, framework-driven, AI-ready prompts that produce significantly better outputs.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link href="/lab" className="btn-primary w-full sm:w-auto text-base flex items-center justify-center gap-2">
                Start Prompt Engineering
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a href="#how-it-works" className="btn-secondary w-full sm:w-auto text-base">
                See How It Works
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-accent-emerald" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-accent-emerald" />
                <span>Free plan available</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-accent-emerald" />
                <span>10+ AI models supported</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-20 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-transparent z-10 pointer-events-none" style={{ height: '40%', bottom: 0 }} />
            
            <div className="glass-card rounded-3xl p-2 shadow-glow-lg">
              <div className="bg-dark-900 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="ml-4 text-xs text-slate-500">promptforge.app/lab</span>
                </div>
                
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">Input (Weak Prompt)</div>
                    <div className="glass-card rounded-xl p-4 bg-dark-800/50">
                      <p className="text-slate-300 text-sm">"Write a blog post about AI"</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="text-xs font-medium text-accent-emerald uppercase tracking-wider">Output (Enhanced Prompt)</div>
                    <div className="glass-card rounded-xl p-4 bg-gradient-to-br from-primary-500/5 to-accent-purple/5 border-primary-500/20">
                      <p className="text-slate-200 text-xs leading-relaxed">
                        <span className="text-primary-400 font-semibold">ROLE:</span> You are an expert tech content writer with 10+ years of experience...<br/>
                        <span className="text-accent-purple font-semibold">TASK:</span> Write a comprehensive 1500-word blog post about...<br/>
                        <span className="text-accent-cyan font-semibold">FORMAT:</span> Include SEO title, meta description, intro...
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-4">
                  <div className="text-center p-3 rounded-xl bg-dark-800/50">
                    <div className="text-lg font-bold text-accent-emerald">+347%</div>
                    <div className="text-xs text-slate-400">Prompt Score</div>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-dark-800/50">
                    <div className="text-lg font-bold text-primary-400">12→92</div>
                    <div className="text-xs text-slate-400">Clarity Score</div>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-dark-800/50">
                    <div className="text-lg font-bold text-accent-cyan">87%</div>
                    <div className="text-xs text-slate-400">Quality Prediction</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 border-y border-glass-border">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-sm text-slate-500 mb-8 uppercase tracking-wider">Trusted by engineers using</p>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
            {models.map((model, i) => (
              <motion.div
                key={model}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="px-4 py-2 rounded-xl bg-white/5 border border-glass-border"
              >
                <span className="text-sm font-medium text-slate-300">{model}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-purple/10 border border-accent-purple/20 mb-6">
              <Layers className="w-4 h-4 text-accent-purple" />
              <span className="text-sm font-medium text-accent-purple">Powerful Features</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Everything You Need for
              <span className="gradient-text"> Elite Prompt Engineering</span>
            </h2>
            <p className="text-lg text-slate-400">
              PromptForge AI combines advanced AI analysis, proven frameworks, and intelligent optimization to help you create prompts that produce exceptional AI outputs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group glass-card rounded-2xl p-6 glass-card-hover"
                >
                  <div className={cn(
                    "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300",
                    feature.color
                  )}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 bg-dark-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              How <span className="gradient-text">PromptForge AI</span> Works
            </h2>
            <p className="text-lg text-slate-400">
              Three simple steps to transform your prompts from ordinary to extraordinary.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-16 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-primary-500/50 via-accent-purple/50 to-accent-cyan/50" />

            {[
              {
                step: "01",
                title: "Input Your Prompt",
                description: "Enter your basic, weak, or vague prompt into the Prompt Lab. It can be as simple as \"write code\" or \"create an image\".",
                icon: Edit,
              },
              {
                step: "02",
                title: "AI Enhances & Analyzes",
                description: "Our AI engine analyzes your prompt using the Prompt Intelligence framework, identifies weaknesses, and enhances it using proven strategies.",
                icon: Brain,
              },
              {
                step: "03",
                title: "Get Elite Outputs",
                description: "Receive a professional-grade prompt with detailed scoring, output prediction, and optimization suggestions. Copy and use with any AI model.",
                icon: Zap,
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="relative"
                >
                  <div className="glass-card rounded-2xl p-8 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-purple flex items-center justify-center mx-auto mb-6 shadow-glow">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-xs font-bold text-primary-400 mb-2">STEP {item.step}</div>
                    <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
                  </div>
                  
                  {i < 2 && (
                    <div className="hidden md:flex absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                      <div className="w-8 h-8 rounded-full bg-dark-900 border border-glass-border flex items-center justify-center">
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-emerald/10 border border-accent-emerald/20 mb-6">
              <Crown className="w-4 h-4 text-accent-emerald" />
              <span className="text-sm font-medium text-accent-emerald">Simple Pricing</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Choose Your <span className="gradient-text">Plan</span>
            </h2>
            <p className="text-lg text-slate-400">
              Start free and scale as you need. No hidden fees, cancel anytime.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className={cn(
                  "relative rounded-3xl p-8",
                  plan.highlighted
                    ? "bg-gradient-to-br from-primary-500/10 to-accent-purple/10 border-2 border-primary-500/50 shadow-glow"
                    : "glass-card"
                )}
              >
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="px-4 py-1.5 bg-gradient-to-r from-primary-500 to-accent-purple rounded-full text-xs font-bold text-white shadow-glow">
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
                  <p className="text-sm text-slate-400 mb-6">{plan.description}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-sm text-slate-400">/{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-accent-emerald flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                  <Link
                    href="/sign-up"
                    className={cn(
                      "block w-full py-3 px-4 rounded-xl text-center font-semibold transition-all duration-300",
                      plan.highlighted
                        ? "bg-gradient-to-r from-primary-600 to-primary-500 text-white hover:shadow-glow hover:scale-105"
                        : "bg-dark-800 text-slate-200 border border-glass-border hover:bg-white/5"
                    )}
                  >
                    {plan.cta}
                  </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-24 px-4 sm:px-6 lg:px-8 bg-dark-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Loved by <span className="gradient-text">Prompt Engineers</span>
            </h2>
            <p className="text-lg text-slate-400">
              See what our users are saying about PromptForge AI.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="glass-card rounded-2xl p-6 glass-card-hover"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-accent-amber fill-current" />
                  ))}
                </div>
                <p className="text-slate-300 mb-6 leading-relaxed">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-purple flex items-center justify-center">
                    <span className="text-sm font-bold text-white">{testimonial.avatar}</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{testimonial.author}</div>
                    <div className="text-xs text-slate-400">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-purple/5" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-purple/10 rounded-full blur-3xl" />

            <div className="relative z-10">
              <Sparkles className="w-12 h-12 text-primary-400 mx-auto mb-6" />
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Ready to Transform Your Prompts?
              </h2>
              <p className="text-lg text-slate-400 mb-8 max-w-xl mx-auto">
                Join thousands of prompt engineers who are creating better AI outputs with PromptForge AI.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/lab" className="btn-primary text-base w-full sm:w-auto flex items-center justify-center gap-2">
                  Start for Free
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
              <p className="text-sm text-slate-500 mt-6">No credit card required · Free plan available</p>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-glass-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-purple flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-bold gradient-text">PromptForge</span>
              </div>
              <p className="text-sm text-slate-400">
                The next-generation AI prompt engineering platform.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Documentation</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-glass-border flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500">
              © 2026 PromptForge AI. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-sm text-slate-500">
              <Shield className="w-4 h-4" />
              <span>Secure & Private</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
