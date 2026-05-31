"use client";

import { useState, useEffect, useMemo } from "react";
import { DashboardLayout } from "@/components/layout";
import {
  Save,
  Search,
  Star,
  Clock,
  Tag,
  Edit,
  Copy,
  Share2,
  Plus,
  X,
  Grid,
  List,
  Eye,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { CopyButton } from "@/components/ui";

const savedPrompts = [
  {
    id: "1",
    title: "React Component Generator",
    content: "You are an expert React developer...",
    category: "coding",
    score: 92,
    createdAt: new Date(Date.now() - 1000 * 60 * 30),
    updatedAt: new Date(Date.now() - 1000 * 60 * 30),
    tags: ["react", "components", "frontend"],
    isFavorite: true,
    versions: 3,
  },
  {
    id: "2",
    title: "Product Launch Email",
    content: "You are an email copywriter...",
    category: "content",
    score: 87,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    tags: ["email", "marketing", "conversion"],
    isFavorite: true,
    versions: 1,
  },
  {
    id: "3",
    title: "Cinematic Cityscape",
    content: "A mysterious cyberpunk city at night...",
    category: "image",
    score: 95,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    tags: ["midjourney", "cyberpunk", "cinematic"],
    isFavorite: false,
    versions: 2,
  },
  {
    id: "4",
    title: "Market Analysis Report",
    content: "You are a senior business analyst...",
    category: "business",
    score: 78,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    tags: ["analysis", "market", "business"],
    isFavorite: false,
    versions: 5,
  },
  {
    id: "5",
    title: "Code Review Expert",
    content: "You are a senior software engineer...",
    category: "coding",
    score: 88,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    tags: ["code-review", "quality", "security"],
    isFavorite: true,
    versions: 4,
  },
  {
    id: "6",
    title: "YouTube Script Template",
    content: "You are a YouTube content strategist...",
    category: "content",
    score: 91,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8),
    tags: ["youtube", "video", "script"],
    isFavorite: false,
    versions: 2,
  },
];

const folders = [
  { id: "all", name: "All Prompts", icon: Save, count: savedPrompts.length },
  { id: "favorites", name: "Favorites", icon: Star, count: savedPrompts.filter((p) => p.isFavorite).length },
  { id: "recent", name: "Recent", icon: Clock, count: 4 },
];

const categories = ["All", "Coding", "Content", "Image", "Business"];

export default function SavedPromptsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFolder, setSelectedFolder] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedPrompt, setSelectedPrompt] = useState<typeof savedPrompts[0] | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('promptforge_favorites');
      if (saved) return new Set(JSON.parse(saved));
    }
    return new Set(savedPrompts.filter((p) => p.isFavorite).map((p) => p.id));
  });
  const [myPrompts, setMyPrompts] = useState<typeof savedPrompts>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('promptforge_my_prompts');
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.map((p: any) => ({
          ...p,
          createdAt: new Date(p.createdAt),
          updatedAt: new Date(p.updatedAt),
        }));
      }
    }
    return savedPrompts;
  });

  useEffect(() => {
    localStorage.setItem('promptforge_favorites', JSON.stringify(Array.from(favorites)));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('promptforge_my_prompts', JSON.stringify(myPrompts));
  }, [myPrompts]);

  const filteredPrompts = myPrompts.filter((prompt) => {
    const matchesSearch =
      prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === "All" || prompt.category === selectedCategory.toLowerCase();

    const matchesFolder =
      selectedFolder === "all" ||
      (selectedFolder === "favorites" && favorites.has(prompt.id)) ||
      (selectedFolder === "recent" && prompt.updatedAt > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));

    return matchesSearch && matchesCategory && matchesFolder;
  });

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

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

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-accent-emerald";
    if (score >= 60) return "text-accent-amber";
    return "text-accent-pink";
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="glass-card rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl" />
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-primary-500/20">
                  <Save className="w-6 h-6 text-primary-400" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Saved Prompts</h1>
                  <p className="text-slate-400 text-sm">
                    Manage, organize, and access your prompt library
                  </p>
                </div>
              </div>
              <button className="flex items-center gap-2 btn-primary">
                <Plus className="w-5 h-5" />
                New Prompt
              </button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 space-y-4">
            <div className="glass-card rounded-2xl p-4">
              <h3 className="text-sm font-semibold text-white mb-3">Folders</h3>
              <div className="space-y-1">
                {folders.map((folder) => {
                  const Icon = folder.icon;
                  return (
                    <button
                      key={folder.id}
                      onClick={() => setSelectedFolder(folder.id)}
                      className={cn(
                        "w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all",
                        selectedFolder === folder.id
                          ? "bg-primary-500/20 text-primary-400"
                          : "text-slate-400 hover:bg-white/5 hover:text-white"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4" />
                        {folder.name}
                      </div>
                      <span
                        className={cn(
                          "text-xs px-2 py-0.5 rounded-full",
                          selectedFolder === folder.id
                            ? "bg-primary-500/30 text-primary-300"
                            : "bg-dark-800 text-slate-500"
                        )}
                      >
                        {folder.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="glass-card rounded-2xl p-4">
              <h3 className="text-sm font-semibold text-white mb-3">Categories</h3>
              <div className="space-y-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={cn(
                      "w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all",
                      selectedCategory === cat
                        ? "bg-primary-500/20 text-primary-400"
                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="glass-card rounded-2xl p-4">
              <h3 className="text-sm font-semibold text-white mb-3">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Total Prompts</span>
                    <span className="text-sm font-semibold text-white">{myPrompts.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Favorites</span>
                  <span className="text-sm font-semibold text-white">{favorites.size}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Avg. Score</span>
                  <span className="text-sm font-semibold text-accent-emerald">
                    {Math.round(myPrompts.reduce((acc, p) => acc + p.score, 0) / myPrompts.length)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <div className="glass-card rounded-2xl p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search prompts..."
                    className="w-full pl-12 pr-4 py-2.5 bg-dark-800/50 border border-glass-border rounded-xl text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-primary-500/50 transition-all text-sm"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={cn(
                      "p-2.5 rounded-xl transition-all",
                      viewMode === "grid"
                        ? "bg-primary-500/20 text-primary-400"
                        : "bg-dark-800/50 text-slate-400 hover:bg-white/5"
                    )}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={cn(
                      "p-2.5 rounded-xl transition-all",
                      viewMode === "list"
                        ? "bg-primary-500/20 text-primary-400"
                        : "bg-dark-800/50 text-slate-400 hover:bg-white/5"
                    )}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">
                Showing <span className="text-white font-medium">{filteredPrompts.length}</span> prompts
              </p>
            </div>

            {filteredPrompts.length === 0 ? (
              <div className="glass-card rounded-2xl p-12 text-center">
                <Save className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">No prompts found</h3>
                <p className="text-slate-400 mb-6">
                  Create or save prompts to see them here
                </p>
                <button className="flex items-center gap-2 btn-primary mx-auto">
                  <Plus className="w-5 h-5" />
                  Create First Prompt
                </button>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid md:grid-cols-2 gap-4">
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
                      <div className="flex items-center gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(prompt.id);
                          }}
                          className={cn(
                            "p-1.5 rounded-lg transition-colors",
                            favorites.has(prompt.id)
                              ? "text-accent-pink"
                              : "text-slate-400 hover:text-accent-pink"
                          )}
                        >
                          <Star
                            className={cn(
                              "w-4 h-4",
                              favorites.has(prompt.id) && "fill-current"
                            )}
                          />
                        </button>
                      </div>
                    </div>

                    <h3 className="font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
                      {prompt.title}
                    </h3>
                    <p className="text-sm text-slate-400 line-clamp-2 mb-4">
                      {prompt.content}
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
                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span className={cn("font-semibold", getScoreColor(prompt.score))}>
                          {prompt.score}/100
                        </span>
                        <span>{formatTimeAgo(prompt.updatedAt)}</span>
                        <span>v{prompt.versions}</span>
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <CopyButton text={prompt.content} />
                        <button className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors">
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {filteredPrompts.map((prompt, i) => (
                  <motion.div
                    key={prompt.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="glass-card rounded-xl p-4 flex items-center gap-4 cursor-pointer glass-card-hover group"
                    onClick={() => setSelectedPrompt(prompt)}
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500/20 to-accent-purple/20 flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-primary-400" />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-white truncate group-hover:text-primary-400 transition-colors">
                          {prompt.title}
                        </h3>
                        <span className={cn("badge", getCategoryColor(prompt.category))}>
                          {prompt.category}
                        </span>
                      </div>
                      <p className="text-sm text-slate-400 truncate">{prompt.content}</p>
                    </div>

                    <div className="hidden md:flex items-center gap-6">
                      <div className={cn("text-lg font-bold", getScoreColor(prompt.score))}>
                        {prompt.score}
                      </div>
                      <div className="text-xs text-slate-500">
                        {formatTimeAgo(prompt.updatedAt)}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(prompt.id);
                        }}
                        className={cn(
                          "p-2 rounded-lg transition-colors",
                          favorites.has(prompt.id)
                            ? "text-accent-pink bg-accent-pink/10"
                            : "text-slate-400 hover:bg-white/5"
                        )}
                      >
                        <Star
                          className={cn(
                            "w-4 h-4",
                            favorites.has(prompt.id) && "fill-current"
                          )}
                        />
                      </button>
                      <CopyButton text={prompt.content} />
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
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
                    <div className="flex items-center gap-2 mt-1">
                      <span className={cn("badge", getCategoryColor(selectedPrompt.category))}>
                        {selectedPrompt.category}
                      </span>
                      <span className={cn("text-sm font-semibold", getScoreColor(selectedPrompt.score))}>
                        Score: {selectedPrompt.score}/100
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedPrompt(null)}
                    className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-slate-400" />
                  </button>
                </div>

                <div className="p-6 space-y-6">
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

                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-dark-800/50 text-center">
                      <div className="text-sm text-slate-400 mb-1">Versions</div>
                      <div className="text-xl font-bold text-white">v{selectedPrompt.versions}</div>
                    </div>
                    <div className="p-4 rounded-xl bg-dark-800/50 text-center">
                      <div className="text-sm text-slate-400 mb-1">Created</div>
                      <div className="text-sm font-semibold text-white">
                        {formatTimeAgo(selectedPrompt.createdAt)}
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-dark-800/50 text-center">
                      <div className="text-sm text-slate-400 mb-1">Updated</div>
                      <div className="text-sm font-semibold text-white">
                        {formatTimeAgo(selectedPrompt.updatedAt)}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-white mb-3">Prompt Content</h3>
                    <div className="p-4 rounded-xl bg-dark-800/50 border border-glass-border">
                      <pre className="whitespace-pre-wrap text-sm text-slate-300 font-sans">
                        {selectedPrompt.content}
                      </pre>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button className="flex-1 flex items-center justify-center gap-2 btn-primary">
                      <Edit className="w-5 h-5" />
                      Edit Prompt
                    </button>
                    <CopyButton text={selectedPrompt.content} className="flex items-center justify-center gap-2 px-6 py-3 bg-dark-800 text-slate-300 border border-glass-border rounded-xl font-semibold hover:bg-white/5 transition-all">
                      <Copy className="w-5 h-5" />
                      Copy
                    </CopyButton>
                    <button
                      onClick={() => toggleFavorite(selectedPrompt.id)}
                      className={cn(
                        "flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all",
                        favorites.has(selectedPrompt.id)
                          ? "bg-accent-pink/20 text-accent-pink border border-accent-pink/30"
                          : "bg-dark-800 text-slate-300 border border-glass-border hover:bg-white/5"
                      )}
                    >
                      <Star
                        className={cn(
                          "w-5 h-5",
                          favorites.has(selectedPrompt.id) && "fill-current"
                        )}
                      />
                      {favorites.has(selectedPrompt.id) ? "Saved" : "Save"}
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
