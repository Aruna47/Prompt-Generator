"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout";
import {
  ShoppingBag,
  Search,
  Star,
  Download,
  Heart,
  Filter,
  Tag,
  Code,
  FileText,
  Image,
  TrendingUp,
  Clock,
  Users,
  Sparkles,
  ChevronDown,
  X,
  Plus,
  Eye,
  Copy,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { CopyButton } from "@/components/ui";

const marketplacePrompts = [
  {
    id: "1",
    title: "Ultimate SaaS App Builder",
    description: "Generate complete SaaS applications with architecture, database design, API specs, and implementation code.",
    category: "coding",
    author: "Alex Chen",
    authorAvatar: "AC",
    downloads: 2847,
    likes: 956,
    rating: 4.9,
    price: 0,
    tags: ["coding", "saas", "architecture", "full-stack"],
    featured: true,
    preview: `You are an elite SaaS architect and full-stack engineer. 

TASK: Build a complete SaaS application

REQUIREMENTS:
1. Architecture & System Design
2. Database Schema (PostgreSQL)
3. API Design (REST/GraphQL)
4. Frontend Components
5. Authentication & Authorization
6. Payment Integration
7. Deployment Strategy`,
  },
  {
    id: "2",
    title: "YouTube Script Master Pro",
    description: "Create engaging, high-retention YouTube scripts with hooks, storytelling, and CTAs.",
    category: "content",
    author: "Sarah Miller",
    authorAvatar: "SM",
    downloads: 1923,
    likes: 734,
    rating: 4.8,
    price: 0,
    tags: ["youtube", "content", "script", "video"],
    featured: true,
    preview: `You are a YouTube content strategist and scriptwriter with 10M+ combined views.

Create a video script with:
- 3-Second Hook (critical for retention)
- Storytelling structure
- Pattern interrupts
- Clear call-to-action
- End screen suggestions`,
  },
  {
    id: "3",
    title: "Cinematic Midjourney Genius",
    description: "Generate professional-grade image prompts for Midjourney with camera, lighting, and composition.",
    category: "image",
    author: "Marcus Rivera",
    authorAvatar: "MR",
    downloads: 3156,
    likes: 1203,
    rating: 4.9,
    price: 0,
    tags: ["midjourney", "image", "art", "photography"],
    featured: true,
    preview: `You are a Hollywood cinematographer and digital artist.

Create cinematic image prompts including:
- Camera model & lens
- Aperture & ISO settings
- Lighting type & direction
- Composition & framing
- Color grading
- Film grain & effects`,
  },
  {
    id: "4",
    title: "Code Review Expert System",
    description: "Comprehensive code review prompts covering security, performance, readability, and best practices.",
    category: "coding",
    author: "James Park",
    authorAvatar: "JP",
    downloads: 1567,
    likes: 542,
    rating: 4.7,
    price: 0,
    tags: ["code-review", "security", "quality", "best-practices"],
    featured: false,
    preview: `You are a senior software engineer performing a code review.

Review dimensions:
1. Security vulnerabilities
2. Performance issues
3. Code readability
4. Bug potential
5. Architectural concerns
6. Test coverage`,
  },
  {
    id: "5",
    title: "Email Copywriting Pro",
    description: "High-converting email templates for welcome sequences, cold outreach, newsletters, and promotions.",
    category: "business",
    author: "Emma Wilson",
    authorAvatar: "EW",
    downloads: 2103,
    likes: 876,
    rating: 4.8,
    price: 0,
    tags: ["email", "marketing", "copywriting", "sales"],
    featured: false,
    preview: `You are an email copywriter with $10M+ in attributed revenue.

Create emails with:
- Attention-grabbing subject lines
- Personalized opening
- Clear value proposition
- Social proof
- Urgency & scarcity
- Clear CTA`,
  },
  {
    id: "6",
    title: "Product Launch Campaign",
    description: "Complete go-to-market strategy for product launches including positioning, messaging, and channels.",
    category: "business",
    author: "David Kim",
    authorAvatar: "DK",
    downloads: 987,
    likes: 423,
    rating: 4.6,
    price: 0,
    tags: ["marketing", "launch", "gtm", "strategy"],
    featured: false,
    preview: `You are a CMO and product launch strategist.

Create a complete go-to-market plan:
1. Product positioning
2. Target audience personas
3. Messaging hierarchy
4. Launch phases
5. Channel strategy
6. Metrics & KPIs`,
  },
];

const categories = [
  { id: "all", label: "All Categories", icon: Sparkles },
  { id: "coding", label: "Coding", icon: Code },
  { id: "content", label: "Content", icon: FileText },
  { id: "image", label: "Image", icon: Image },
  { id: "business", label: "Business", icon: TrendingUp },
];

const sortOptions = [
  { id: "popular", label: "Most Popular" },
  { id: "recent", label: "Most Recent" },
  { id: "rating", label: "Highest Rated" },
  { id: "downloads", label: "Most Downloads" },
];

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSort, setSelectedSort] = useState("popular");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedPrompt, setSelectedPrompt] = useState<typeof marketplacePrompts[0] | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filteredPrompts = marketplacePrompts.filter((prompt) => {
    const matchesSearch =
      prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || prompt.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "coding":
        return <Code className="w-4 h-4" />;
      case "content":
        return <FileText className="w-4 h-4" />;
      case "image":
        return <Image className="w-4 h-4" />;
      case "business":
        return <TrendingUp className="w-4 h-4" />;
      default:
        return <Sparkles className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "coding":
        return "badge-primary";
      case "content":
        return "badge-cyan";
      case "image":
        return "badge-purple";
      case "business":
        return "badge-amber";
      default:
        return "badge-primary";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="glass-card rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-purple/10 rounded-full blur-3xl" />
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-accent-purple/20">
                  <ShoppingBag className="w-6 h-6 text-accent-purple" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Prompt Marketplace</h1>
                  <p className="text-slate-400 text-sm">
                    Discover, share, and remix community prompts
                  </p>
                </div>
              </div>
              <button className="flex items-center gap-2 btn-primary">
                <Plus className="w-5 h-5" />
                Publish Prompt
              </button>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search prompts, tags, authors..."
                className="w-full pl-12 pr-4 py-3 bg-dark-800/50 border border-glass-border rounded-xl text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-primary-500/50 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-3 bg-dark-800/50 border border-glass-border rounded-xl text-slate-300 hover:bg-white/5 transition-colors lg:hidden"
            >
              <Filter className="w-5 h-5" />
              Filters
            </button>
          </div>

          <div className={cn("mt-4 flex flex-wrap gap-2", !showFilters && "hidden lg:flex")}>
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all",
                    selectedCategory === cat.id
                      ? "bg-primary-500/20 text-primary-400 border border-primary-500/30"
                      : "bg-dark-800/50 text-slate-400 border border-glass-border hover:bg-white/5"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-400">
            Showing <span className="text-white font-medium">{filteredPrompts.length}</span> prompts
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-400">Sort by:</span>
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="bg-dark-800/50 border border-glass-border rounded-lg px-3 py-1.5 text-sm text-slate-300 focus:outline-none focus:border-primary-500/50 cursor-pointer"
            >
              {sortOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {filteredPrompts.some((p) => p.featured) && (
          <div>
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-accent-amber" />
              Featured Prompts
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPrompts
                .filter((p) => p.featured)
                .map((prompt, i) => (
                  <motion.div
                    key={prompt.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => setSelectedPrompt(prompt)}
                    className="glass-card rounded-2xl p-5 cursor-pointer glass-card-hover border-2 border-transparent hover:border-primary-500/30 relative overflow-hidden group"
                  >
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-accent-purple to-accent-cyan" />

                    <div className="flex items-start justify-between mb-3">
                      <span className={cn("badge", getCategoryColor(prompt.category))}>
                        <span className="flex items-center gap-1">
                          {getCategoryIcon(prompt.category)}
                          {prompt.category}
                        </span>
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(prompt.id);
                        }}
                        className={cn(
                          "p-2 rounded-lg transition-colors",
                          favorites.includes(prompt.id)
                            ? "text-accent-pink bg-accent-pink/10"
                            : "text-slate-400 hover:text-accent-pink hover:bg-accent-pink/10"
                        )}
                      >
                        <Heart
                          className={cn(
                            "w-4 h-4",
                            favorites.includes(prompt.id) && "fill-current"
                          )}
                        />
                      </button>
                    </div>

                    <h3 className="font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
                      {prompt.title}
                    </h3>
                    <p className="text-sm text-slate-400 line-clamp-2 mb-4">
                      {prompt.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {prompt.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 text-xs bg-dark-800/50 text-slate-400 rounded-md"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-glass-border">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary-500 to-accent-purple flex items-center justify-center">
                          <span className="text-xs font-bold text-white">{prompt.authorAvatar}</span>
                        </div>
                        <span className="text-xs text-slate-400">{prompt.author}</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-accent-amber fill-current" />
                          {prompt.rating}
                        </div>
                        <div className="flex items-center gap-1">
                          <Download className="w-3 h-3" />
                          {prompt.downloads.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        )}

        <div>
          <h2 className="text-lg font-semibold text-white mb-4">All Prompts</h2>
          {filteredPrompts.length === 0 ? (
            <div className="glass-card rounded-2xl p-12 text-center">
              <Search className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">No prompts found</h3>
              <p className="text-slate-400">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPrompts.map((prompt, i) => (
                <motion.div
                  key={prompt.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setSelectedPrompt(prompt)}
                  className="glass-card rounded-2xl p-5 cursor-pointer glass-card-hover group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className={cn("badge", getCategoryColor(prompt.category))}>
                      {prompt.category}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(prompt.id);
                      }}
                      className={cn(
                        "p-2 rounded-lg transition-colors",
                        favorites.includes(prompt.id)
                          ? "text-accent-pink bg-accent-pink/10"
                          : "text-slate-400 hover:text-accent-pink hover:bg-accent-pink/10"
                      )}
                    >
                      <Heart
                        className={cn(
                          "w-4 h-4",
                          favorites.includes(prompt.id) && "fill-current"
                        )}
                      />
                    </button>
                  </div>

                  <h3 className="font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
                    {prompt.title}
                  </h3>
                  <p className="text-sm text-slate-400 line-clamp-2 mb-4">
                    {prompt.description}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-glass-border">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500">{prompt.author}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-accent-amber fill-current" />
                        {prompt.rating}
                      </div>
                      <div className="flex items-center gap-1">
                        <Download className="w-3 h-3" />
                        {prompt.downloads.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        <AnimatePresence>
          {selectedPrompt && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
              onClick={() => setSelectedPrompt(null)}
            >
              <motion.div
                initial={{ opacity: 0, y: 100, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 100, scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-3xl max-h-[90vh] overflow-y-auto glass-card rounded-2xl"
              >
                <div className="sticky top-0 z-10 bg-dark-900/95 backdrop-blur-xl p-6 border-b border-glass-border flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-white">{selectedPrompt.title}</h2>
                    <p className="text-sm text-slate-400">by {selectedPrompt.author}</p>
                  </div>
                  <button
                    onClick={() => setSelectedPrompt(null)}
                    className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-slate-400" />
                  </button>
                </div>

                <div className="p-6 space-y-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className={cn("badge", getCategoryColor(selectedPrompt.category))}>
                      {selectedPrompt.category}
                    </span>
                    <div className="flex items-center gap-1 text-sm text-slate-400">
                      <Star className="w-4 h-4 text-accent-amber fill-current" />
                      {selectedPrompt.rating}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-slate-400">
                      <Download className="w-4 h-4" />
                      {selectedPrompt.downloads.toLocaleString()} downloads
                    </div>
                    <div className="flex items-center gap-1 text-sm text-slate-400">
                      <Heart className="w-4 h-4" />
                      {selectedPrompt.likes.toLocaleString()} likes
                    </div>
                  </div>

                  <p className="text-slate-300">{selectedPrompt.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {selectedPrompt.tags.map((tag) => (
                      <span
                        key={tag}
                        className="flex items-center gap-1 px-3 py-1.5 bg-dark-800/50 text-slate-300 rounded-lg text-sm"
                      >
                        <Tag className="w-3 h-3" />
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                      <Eye className="w-4 h-4 text-accent-cyan" />
                      Prompt Preview
                    </h3>
                    <div className="p-4 rounded-xl bg-dark-800/50 border border-glass-border">
                      <pre className="whitespace-pre-wrap text-sm text-slate-300 font-sans">
                        {selectedPrompt.preview}
                      </pre>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => navigator.clipboard.writeText(selectedPrompt.preview)}
                      className="flex-1 flex items-center justify-center gap-2 btn-primary"
                    >
                      <Copy className="w-5 h-5" />
                      Copy Prompt
                    </button>
                    <button
                      onClick={() => toggleFavorite(selectedPrompt.id)}
                      className={cn(
                        "flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all",
                        favorites.includes(selectedPrompt.id)
                          ? "bg-accent-pink/20 text-accent-pink border border-accent-pink/30"
                          : "bg-dark-800 text-slate-300 border border-glass-border hover:bg-white/5"
                      )}
                    >
                      <Heart
                        className={cn(
                          "w-5 h-5",
                          favorites.includes(selectedPrompt.id) && "fill-current"
                        )}
                      />
                      {favorites.includes(selectedPrompt.id) ? "Saved" : "Save"}
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
}
