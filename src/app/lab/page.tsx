"use client";

import { useState, useCallback, useEffect } from "react";
import { DashboardLayout } from "@/components/layout";
import {
  ScoreBreakdown,
  OutputPredictionCard,
  CopyButton,
  LoadingSpinner,
  ModelBadge,
} from "@/components/ui";
import { PromptEngineer } from "@/lib/prompt-engineer";
import {
  PromptScore,
  OutputPrediction,
  ENHANCEMENT_OPTIONS,
  PROMPT_FRAMEWORKS,
  AI_MODELS,
  PromptFramework,
  AIModel,
  EnhancementOption,
} from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Brain,
  Layers,
  Eye,
  Zap,
  ChevronDown,
  RefreshCw,
  Save,
  History,
  ArrowRightLeft,
  Plus,
  X,
  Wand2,
   AlertCircle,
   FlaskConical,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function PromptLabPage() {
  const [inputPrompt, setInputPrompt] = useState("");
  const [enhancedPrompt, setEnhancedPrompt] = useState("");
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState("professional");
  const [selectedFramework, setSelectedFramework] = useState<PromptFramework | undefined>(undefined);
  const [selectedModel, setSelectedModel] = useState<AIModel>("chatgpt");
  const [showFrameworkDropdown, setShowFrameworkDropdown] = useState(false);
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const [score, setScore] = useState<PromptScore | null>(null);
  const [prediction, setPrediction] = useState<OutputPrediction | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [activeTab, setActiveTab] = useState<"enhance" | "analyze" | "compare">("enhance");
  const [history, setHistory] = useState<Array<{ input: string; output: string; timestamp: Date }>>([]);
  const [promptComponents, setPromptComponents] = useState<Array<{ type: string; content: string }>>([]);
  const [showComponents, setShowComponents] = useState(false);
  const [streamingText, setStreamingText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [savedPrompts, setSavedPrompts] = useState<Array<{ input: string; output: string; score: number; timestamp: Date }>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('promptforge_lab_saved');
      if (saved) return JSON.parse(saved);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('promptforge_lab_saved', JSON.stringify(savedPrompts));
  }, [savedPrompts]);

  const handleEnhance = useCallback(async () => {
    if (!inputPrompt.trim()) return;

    setIsEnhancing(true);
    setShowResults(false);
    setStreamingText("");
    setIsStreaming(true);

    try {
      const res = await fetch('/api/enhance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: inputPrompt,
          style: selectedStyle,
          targetModel: selectedModel,
          framework: selectedFramework,
        }),
      });

      if (!res.ok) throw new Error('API failed');

      const json = await res.json();
      const fullText = json.data.enhanced;
      const resultScore = json.data.score;
      const resultPrediction = json.data.prediction;

      let currentText = "";
      const chars = fullText.split("");
      
      for (let i = 0; i < chars.length; i++) {
        currentText += chars[i];
        setStreamingText(currentText);
        await new Promise((r) => setTimeout(r, Math.random() * 10 + 3));
      }

      setEnhancedPrompt(fullText);
      setScore(resultScore);
      setPrediction(resultPrediction);
      setShowResults(true);

      setHistory((prev) => [
        {
          input: inputPrompt,
          output: fullText,
          timestamp: new Date(),
        },
        ...prev.slice(0, 9),
      ]);
    } catch {
      const result = await PromptEngineer.enhancePrompt(inputPrompt, {
        style: selectedStyle as 'professional' | 'expert' | 'detailed' | 'concise' | 'reasoning' | 'business',
        targetModel: selectedModel,
        framework: selectedFramework,
      });

      const fullText = result.enhanced;
      let currentText = "";
      const chars = fullText.split("");
      
      for (let i = 0; i < chars.length; i++) {
        currentText += chars[i];
        setStreamingText(currentText);
        await new Promise((r) => setTimeout(r, Math.random() * 15 + 5));
      }

      setEnhancedPrompt(fullText);
      setScore(result.score);
      setPrediction(result.prediction);
      setShowResults(true);

      setHistory((prev) => [
        {
          input: inputPrompt,
          output: fullText,
          timestamp: new Date(),
        },
        ...prev.slice(0, 9),
      ]);
    } finally {
      setIsEnhancing(false);
      setIsStreaming(false);
    }
  }, [inputPrompt, selectedStyle, selectedModel, selectedFramework]);

  const handleQuickAnalyze = useCallback(() => {
    if (!inputPrompt.trim()) return;

    const analysisScore = PromptEngineer.analyzePrompt(inputPrompt);
    const analysisPrediction = PromptEngineer.predictOutput(inputPrompt, analysisScore);
    setScore(analysisScore);
    setPrediction(analysisPrediction);
    setShowResults(true);
  }, [inputPrompt]);

  const applyFramework = useCallback((framework: PromptFramework) => {
    if (!inputPrompt.trim()) return;
    const enhanced = PromptEngineer.applyFramework(inputPrompt, framework);
    setEnhancedPrompt(enhanced);
    const analysisScore = PromptEngineer.analyzePrompt(enhanced);
    const analysisPrediction = PromptEngineer.predictOutput(enhanced, analysisScore);
    setScore(analysisScore);
    setPrediction(analysisPrediction);
    setShowResults(true);
    setSelectedFramework(framework);
    setShowFrameworkDropdown(false);
  }, [inputPrompt]);

  const addComponent = () => {
    setPromptComponents([...promptComponents, { type: "role", content: "" }]);
  };

  const updateComponent = (index: number, field: "type" | "content", value: string) => {
    const updated = [...promptComponents];
    updated[index] = { ...updated[index], [field]: value };
    setPromptComponents(updated);
  };

  const removeComponent = (index: number) => {
    setPromptComponents(promptComponents.filter((_, i) => i !== index));
  };

  const componentTypes = [
    "role", "tone", "output_format", "constraints", "audience", "objectives", "examples", "style"
  ];

  const getScoreColor = (value: number) => {
    if (value >= 80) return "text-accent-emerald";
    if (value >= 60) return "text-accent-amber";
    return "text-accent-pink";
  };

  const getScoreBg = (value: number) => {
    if (value >= 80) return "from-accent-emerald to-emerald-600";
    if (value >= 60) return "from-accent-amber to-amber-600";
    return "from-accent-pink to-pink-600";
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="glass-card rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-xl bg-primary-500/20">
                <FlaskConical className="w-6 h-6 text-primary-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Prompt Lab</h1>
                <p className="text-slate-400 text-sm">Enhance, analyze, and optimize your prompts</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-1 p-1 bg-dark-800/50 rounded-xl w-fit">
          {[
            { id: "enhance", label: "Enhance", icon: Wand2 },
            { id: "analyze", label: "Analyze", icon: Brain },
            { id: "compare", label: "History", icon: History },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as "enhance" | "analyze" | "compare")}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary-500/20 text-primary-400"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                )}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "enhance" && (
            <motion.div
              key="enhance"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid lg:grid-cols-2 gap-6"
            >
              <div className="space-y-4">
                <div className="glass-card rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Eye className="w-5 h-5 text-slate-400" />
                      <h3 className="font-semibold text-white">Input Prompt</h3>
                    </div>
                    <span className="text-xs text-slate-500">{inputPrompt.length} chars</span>
                  </div>

                  <textarea
                    value={inputPrompt}
                    onChange={(e) => setInputPrompt(e.target.value)}
                    placeholder="Enter your prompt here...

Example: 'Write code for a todo app'

The AI will transform this into an elite, optimized prompt."
                    className="w-full h-48 bg-dark-800/50 border border-glass-border rounded-xl p-4 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/20 transition-all resize-none text-sm"
                  />

                  <div className="mt-4 space-y-4">
                    <div>
                      <label className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2 block">
                        Enhancement Style
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {ENHANCEMENT_OPTIONS.map((option) => (
                          <button
                            key={option.id}
                            onClick={() => setSelectedStyle(option.id)}
                            className={cn(
                              "p-3 rounded-xl text-left transition-all duration-200",
                              selectedStyle === option.id
                                ? "bg-primary-500/20 border border-primary-500/30"
                                : "bg-dark-800/50 border border-glass-border hover:bg-white/5"
                            )}
                          >
                            <div className={cn(
                              "text-sm font-medium",
                              selectedStyle === option.id ? "text-primary-400" : "text-slate-300"
                            )}>
                              {option.name}
                            </div>
                            <div className="text-xs text-slate-500 mt-0.5">{option.description}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative">
                        <label className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2 block">
                          Target AI Model
                        </label>
                        <button
                          onClick={() => setShowModelDropdown(!showModelDropdown)}
                          className="w-full flex items-center justify-between p-3 bg-dark-800/50 border border-glass-border rounded-xl text-sm text-slate-300 hover:bg-white/5 transition-colors"
                        >
                          <span className="capitalize">{selectedModel.replace("-", " ")}</span>
                          <ChevronDown className="w-4 h-4 text-slate-400" />
                        </button>

                        <AnimatePresence>
                          {showModelDropdown && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="absolute top-full left-0 right-0 mt-2 bg-dark-900 border border-glass-border rounded-xl shadow-xl z-20 overflow-hidden max-h-64 overflow-y-auto"
                            >
                              {AI_MODELS.map((model) => (
                                <button
                                  key={model.id}
                                  onClick={() => {
                                    setSelectedModel(model.id);
                                    setShowModelDropdown(false);
                                  }}
                                  className={cn(
                                    "w-full flex items-center gap-3 px-4 py-3 text-left text-sm transition-colors",
                                    selectedModel === model.id
                                      ? "bg-primary-500/10 text-primary-400"
                                      : "text-slate-300 hover:bg-white/5"
                                  )}
                                >
                                  <div className={cn("w-2.5 h-2.5 rounded-full", model.color)} />
                                  <span>{model.name}</span>
                                  <span className="ml-auto text-xs text-slate-500 capitalize">{model.category}</span>
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <div className="relative">
                        <label className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2 block">
                          Prompt Framework
                        </label>
                        <button
                          onClick={() => setShowFrameworkDropdown(!showFrameworkDropdown)}
                          className="w-full flex items-center justify-between p-3 bg-dark-800/50 border border-glass-border rounded-xl text-sm text-slate-300 hover:bg-white/5 transition-colors"
                        >
                          <span className="capitalize">{selectedFramework?.replace("-", " ") || "None"}</span>
                          <ChevronDown className="w-4 h-4 text-slate-400" />
                        </button>

                        <AnimatePresence>
                          {showFrameworkDropdown && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="absolute top-full left-0 right-0 mt-2 bg-dark-900 border border-glass-border rounded-xl shadow-xl z-20 overflow-hidden max-h-80 overflow-y-auto"
                            >
                              <button
                                onClick={() => {
                                  setSelectedFramework(undefined);
                                  setShowFrameworkDropdown(false);
                                }}
                                className={cn(
                                  "w-full px-4 py-3 text-left text-sm transition-colors",
                                  !selectedFramework
                                    ? "bg-primary-500/10 text-primary-400"
                                    : "text-slate-300 hover:bg-white/5"
                                )}
                              >
                                No Framework
                              </button>
                              {PROMPT_FRAMEWORKS.map((framework) => (
                                <button
                                  key={framework.id}
                                  onClick={() => applyFramework(framework.id)}
                                  className={cn(
                                    "w-full px-4 py-3 text-left text-sm transition-colors border-t border-glass-border",
                                    selectedFramework === framework.id
                                      ? "bg-primary-500/10 text-primary-400"
                                      : "text-slate-300 hover:bg-white/5"
                                  )}
                                >
                                  <div className="font-medium">{framework.name}</div>
                                  <div className="text-xs text-slate-500 mt-0.5">{framework.description}</div>
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    <div>
                      <button
                        onClick={() => setShowComponents(!showComponents)}
                        className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
                      >
                        <Layers className="w-4 h-4" />
                        {showComponents ? "Hide" : "Show"} Prompt Components
                        <ChevronDown className={cn("w-4 h-4 transition-transform", showComponents && "rotate-180")} />
                      </button>

                      <AnimatePresence>
                        {showComponents && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-3 space-y-3">
                              {promptComponents.map((comp, i) => (
                                <div key={i} className="flex gap-2">
                                  <select
                                    value={comp.type}
                                    onChange={(e) => updateComponent(i, "type", e.target.value)}
                                    className="w-32 bg-dark-800 border border-glass-border rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-primary-500/50"
                                  >
                                    {componentTypes.map((type) => (
                                      <option key={type} value={type}>
                                        {type.replace("_", " ")}
                                      </option>
                                    ))}
                                  </select>
                                  <input
                                    type="text"
                                    value={comp.content}
                                    onChange={(e) => updateComponent(i, "content", e.target.value)}
                                    placeholder={`Enter ${comp.type}...`}
                                    className="flex-1 bg-dark-800 border border-glass-border rounded-lg px-3 py-2 text-sm text-slate-300 placeholder:text-slate-500 focus:outline-none focus:border-primary-500/50"
                                  />
                                  <button
                                    onClick={() => removeComponent(i)}
                                    className="p-2 text-slate-400 hover:text-accent-pink hover:bg-accent-pink/10 rounded-lg transition-colors"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>
                              ))}
                              <button
                                onClick={addComponent}
                                className="flex items-center gap-2 px-3 py-2 text-sm text-primary-400 hover:bg-primary-500/10 rounded-lg transition-colors"
                              >
                                <Plus className="w-4 h-4" />
                                Add Component
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <button
                      onClick={handleEnhance}
                      disabled={isEnhancing || !inputPrompt.trim()}
                      className="flex-1 flex items-center justify-center gap-2 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isEnhancing ? (
                        <>
                          <LoadingSpinner size="sm" />
                          Enhancing...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5" />
                          Enhance Prompt
                        </>
                      )}
                    </button>
                    <button
                      onClick={handleQuickAnalyze}
                      disabled={!inputPrompt.trim()}
                      className="px-6 py-3 bg-dark-800 border border-glass-border text-slate-200 font-semibold rounded-xl transition-all duration-300 hover:bg-white/5 hover:border-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Brain className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="glass-card rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Wand2 className="w-5 h-5 text-primary-400" />
                      <h3 className="font-semibold text-white">Enhanced Prompt</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      {enhancedPrompt && (
                        <>
                          <CopyButton text={enhancedPrompt} />
                          <button
                            onClick={() => {
                              setInputPrompt(enhancedPrompt);
                              setEnhancedPrompt("");
                              setShowResults(false);
                            }}
                            className="p-2 rounded-lg bg-dark-700 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
                            title="Use as input"
                          >
                            <ArrowRightLeft className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              const newSaved = [...savedPrompts, { input: inputPrompt, output: enhancedPrompt, score: score?.overall || 0, timestamp: new Date() }];
                              setSavedPrompts(newSaved.slice(-20));
                            }}
                            className="p-2 rounded-lg bg-dark-700 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
                            title="Save prompt"
                          >
                            <Save className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {isStreaming ? (
                    <div className="w-full h-48 bg-dark-800/50 border border-glass-border rounded-xl p-4 text-slate-200 text-sm overflow-y-auto whitespace-pre-wrap">
                      {streamingText}
                      <span className="inline-block w-2 h-4 bg-primary-400 animate-pulse ml-0.5" />
                    </div>
                  ) : enhancedPrompt ? (
                    <div className="w-full h-48 bg-dark-800/50 border border-glass-border rounded-xl p-4 text-slate-200 text-sm overflow-y-auto whitespace-pre-wrap">
                      {enhancedPrompt}
                    </div>
                  ) : (
                    <div className="w-full h-48 bg-dark-800/50 border border-glass-border rounded-xl flex flex-col items-center justify-center">
                      <AlertCircle className="w-8 h-8 text-slate-600 mb-2" />
                      <p className="text-slate-500 text-sm">Enhanced prompt will appear here</p>
                    </div>
                  )}

                  {showResults && score && (
                    <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-primary-500/10 to-accent-purple/10 border border-primary-500/20">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-slate-400">Overall Prompt Score</span>
                        <div className="flex items-center gap-2">
                          <ModelBadge modelId={selectedModel} size="sm" />
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "text-4xl font-bold",
                          getScoreColor(score.overall)
                        )}>
                          {score.overall}
                        </div>
                        <div className="flex-1">
                          <div className="h-3 bg-dark-700 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${score.overall}%` }}
                              transition={{ duration: 1, ease: "easeOut" }}
                              className={cn("h-full bg-gradient-to-r rounded-full", getScoreBg(score.overall))}
                            />
                          </div>
                          <div className="flex justify-between mt-1 text-xs text-slate-500">
                            <span>0</span>
                            <span>50</span>
                            <span>100</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <AnimatePresence>
                  {showResults && score && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="grid gap-4"
                    >
                      <ScoreBreakdown score={score} />
                      {prediction && <OutputPredictionCard prediction={prediction} />}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {activeTab === "analyze" && (
            <motion.div
              key="analyze"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="glass-card rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Brain className="w-5 h-5 text-accent-purple" />
                  <h3 className="font-semibold text-white">Prompt Intelligence Analysis</h3>
                </div>
                <textarea
                  value={inputPrompt}
                  onChange={(e) => setInputPrompt(e.target.value)}
                  placeholder="Paste any prompt here to analyze its quality, strengths, and weaknesses..."
                  className="w-full h-32 bg-dark-800/50 border border-glass-border rounded-xl p-4 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/20 transition-all resize-none text-sm mb-4"
                />
                <button
                  onClick={handleQuickAnalyze}
                  disabled={!inputPrompt.trim()}
                  className="flex items-center gap-2 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Brain className="w-5 h-5" />
                  Analyze Prompt
                </button>
              </div>

              {score && (
                <div className="grid lg:grid-cols-2 gap-6">
                  <ScoreBreakdown score={score} />
                  {prediction && <OutputPredictionCard prediction={prediction} />}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === "compare" && (
            <motion.div
              key="compare"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              {history.length === 0 ? (
                <div className="glass-card rounded-2xl p-12 text-center">
                  <History className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">No History Yet</h3>
                  <p className="text-slate-400">Enhance some prompts to see your history here.</p>
                </div>
              ) : (
                history.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="glass-card rounded-2xl p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs text-slate-500">
                        {item.timestamp.toLocaleString()}
                      </span>
                      <div className="flex gap-2">
                        <CopyButton text={item.output} />
                        <button
                          onClick={() => setInputPrompt(item.input)}
                          className="p-2 rounded-lg bg-dark-700 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
                        >
                          <RefreshCw className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Input</div>
                        <div className="p-4 rounded-xl bg-dark-800/50 text-sm text-slate-300 line-clamp-4">
                          {item.input}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-primary-400 uppercase tracking-wider mb-2">Enhanced</div>
                        <div className="p-4 rounded-xl bg-primary-500/5 border border-primary-500/20 text-sm text-slate-200 line-clamp-4">
                          {item.output}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
}
