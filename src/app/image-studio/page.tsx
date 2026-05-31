"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout";
import { PromptEngineer } from "@/lib/prompt-engineer";
import { motion, AnimatePresence } from "framer-motion";
import {
  Image as ImageIcon,
  Camera,
  Sun,
  Mountain,
  CloudLightning,
  Palette,
  Sparkles,
  RefreshCw,
  Copy,
  Save,
  Download,
  Eye,
  X,
  Plus,
  ChevronDown,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CopyButton, LoadingSpinner } from "@/components/ui";

const artStyles = [
  { id: "photorealistic", label: "Photorealistic", description: "Ultra realistic photography" },
  { id: "cinematic", label: "Cinematic", description: "Movie still quality" },
  { id: "anime", label: "Anime", description: "Japanese anime style" },
  { id: "watercolor", label: "Watercolor", description: "Soft watercolor painting" },
  { id: "oil-painting", label: "Oil Painting", description: "Classic oil painting style" },
  { id: "3d-render", label: "3D Render", description: "Blender/C4D style render" },
  { id: "pixel-art", label: "Pixel Art", description: "Retro pixel art style" },
  { id: "cyberpunk", label: "Cyberpunk", description: "Neon-lit futuristic style" },
  { id: "fantasy", label: "Fantasy", description: "Epic fantasy illustration" },
  { id: "minimalist", label: "Minimalist", description: "Simple, clean composition" },
];

const cameraAngles = [
  "Eye level", "Low angle", "High angle", "Bird's eye view", "Dutch angle",
  "Over the shoulder", "Point of view", "Extreme close-up", "Wide shot", "Medium shot"
];

const lightingOptions = [
  "Natural daylight", "Golden hour", "Blue hour", "Studio lighting", "Dramatic lighting",
  "Soft ambient", "Neon lighting", "Candlelight", "Moonlight", "Volumetric lighting"
];

const environments = [
  "Urban city", "Nature landscape", "Studio setting", "Underwater", "Space",
  "Fantasy world", "Cyberpunk city", "Historical setting", "Abstract background", "Minimal white"
];

const moods = [
  "Dramatic", "Peaceful", "Energetic", "Mysterious", "Romantic",
  "Gloomy", "Bright", "Nostalgic", "Epic", "Minimal"
];

const cameraOptions = [
  "Shot on ARRI Alexa", "Shot on RED Epic", "Shot on Sony A7S III",
  "Shot on Canon 5D", "Shot on iPhone 15 Pro", "Shot on Hasselblad",
  "35mm lens", "50mm lens", "85mm lens", "Wide angle lens",
  "f/1.8 aperture", "f/2.8 aperture", "Long exposure", "Shallow depth of field"
];

const negativePromptOptions = [
  "blurry, low quality, distorted",
  "ugly, deformed, bad anatomy, extra limbs",
  "watermark, text, signature, logo",
  "worst quality, jpeg artifacts, grainy",
  "cartoon, illustration, anime (if not intended)",
  "overexposed, underexposed, bad lighting"
];

const samplePresets = [
  {
    id: 1,
    name: "Cinematic Portrait",
    subject: "A mysterious stranger in a rain-soaked Tokyo alley",
    style: "cinematic",
    preview: "🌃",
  },
  {
    id: 2,
    name: "Fantasy Landscape",
    subject: "Ancient floating islands above a sea of clouds",
    style: "fantasy",
    preview: "🏔️",
  },
  {
    id: 3,
    name: "Product Photo",
    subject: "Luxury watch on a marble surface with dramatic lighting",
    style: "photorealistic",
    preview: "⌚",
  },
  {
    id: 4,
    name: "Cyberpunk Scene",
    subject: "Neon-lit street with holographic advertisements",
    style: "cyberpunk",
    preview: "🌆",
  },
];

export default function ImageStudioPage() {
  const [subject, setSubject] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("cinematic");
  const [selectedCameraAngle, setSelectedCameraAngle] = useState("Eye level");
  const [selectedLighting, setSelectedLighting] = useState("Golden hour");
  const [selectedEnvironment, setSelectedEnvironment] = useState("");
  const [selectedMood, setSelectedMood] = useState("Dramatic");
  const [selectedCameraOptions, setSelectedCameraOptions] = useState<string[]>(["Shot on ARRI Alexa", "35mm lens", "f/2.8 aperture"]);
  const [negativePrompt, setNegativePrompt] = useState("blurry, low quality, distorted, ugly, deformed, bad anatomy, extra limbs, watermark, text, signature, worst quality, jpeg artifacts");
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [generatedPrompt, setGeneratedPrompt] = useState<{ positive: string; negative: string } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<"create" | "presets" | "history">("create");

  const toggleCameraOption = (option: string) => {
    setSelectedCameraOptions((prev) =>
      prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
    );
  };

  const handleGenerate = async () => {
    if (!subject.trim()) return;
    setIsGenerating(true);

    await new Promise((r) => setTimeout(r, 1500));

    const result = PromptEngineer.generateImagePrompt(subject, {
      style: artStyles.find((s) => s.id === selectedStyle)?.label,
      composition: selectedCameraAngle,
      lighting: selectedLighting,
      environment: selectedEnvironment || undefined,
      mood: selectedMood,
      camera: selectedCameraOptions.join(", "),
      negative: negativePrompt,
      targetModel: "midjourney",
    });

    setGeneratedPrompt(result);
    setIsGenerating(false);
  };

  const applyPreset = (preset: typeof samplePresets[0]) => {
    setSubject(preset.subject);
    setSelectedStyle(preset.style);
    setActiveTab("create");
  };

  const aspectRatios = ["1:1", "4:3", "16:9", "9:16", "21:9", "3:2"];

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="glass-card rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-cyan/10 rounded-full blur-3xl" />
          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-accent-cyan/20">
                <ImageIcon className="w-6 h-6 text-accent-cyan" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Image Prompt Studio</h1>
                <p className="text-slate-400 text-sm">
                  Create cinematic prompts for Midjourney, Flux, Stable Diffusion, and more
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-1 p-1 bg-dark-800/50 rounded-xl w-fit">
          {[
            { id: "create", label: "Create", icon: Palette },
            { id: "presets", label: "Presets", icon: Layers },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as "create" | "presets" | "history")}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-accent-cyan/20 text-accent-cyan"
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
          {activeTab === "presets" ? (
            <motion.div
              key="presets"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {samplePresets.map((preset) => (
                <motion.div
                  key={preset.id}
                  whileHover={{ scale: 1.02 }}
                  className="glass-card rounded-2xl p-5 cursor-pointer glass-card-hover"
                  onClick={() => applyPreset(preset)}
                >
                  <div className="text-4xl mb-4">{preset.preview}</div>
                  <h3 className="font-semibold text-white mb-1">{preset.name}</h3>
                  <p className="text-sm text-slate-400 line-clamp-2">{preset.subject}</p>
                  <div className="mt-3 flex items-center gap-2 text-xs text-accent-cyan">
                    <Plus className="w-3 h-3" />
                    Use this preset
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="create"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid lg:grid-cols-2 gap-6"
            >
              <div className="space-y-6">
                <div className="glass-card rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5 text-accent-cyan" />
                    <h3 className="font-semibold text-white">Subject Description</h3>
                  </div>
                  <textarea
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Describe what you want to create...

Example: 'A mysterious astronaut standing on the surface of Mars, gazing at Earth in the distance'"
                    className="w-full h-32 bg-dark-800/50 border border-glass-border rounded-xl p-4 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-accent-cyan/50 transition-all resize-none text-sm mb-4"
                  />

                  <div>
                    <label className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2 block">
                      Aspect Ratio
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {aspectRatios.map((ratio) => (
                        <button
                          key={ratio}
                          onClick={() => setAspectRatio(ratio)}
                          className={cn(
                            "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                            aspectRatio === ratio
                              ? "bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/30"
                              : "bg-dark-800/50 text-slate-400 border border-glass-border hover:bg-white/5"
                          )}
                        >
                          {ratio}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="glass-card rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Palette className="w-5 h-5 text-accent-purple" />
                    <h3 className="font-semibold text-white">Art Style</h3>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {artStyles.map((style) => (
                      <button
                        key={style.id}
                        onClick={() => setSelectedStyle(style.id)}
                        className={cn(
                          "p-3 rounded-xl text-left transition-all",
                          selectedStyle === style.id
                            ? "bg-accent-purple/20 border border-accent-purple/30"
                            : "bg-dark-800/50 border border-glass-border hover:bg-white/5"
                        )}
                      >
                        <div className={cn(
                          "text-sm font-medium",
                          selectedStyle === style.id ? "text-accent-purple" : "text-slate-300"
                        )}>
                          {style.label}
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">{style.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="glass-card rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Camera className="w-5 h-5 text-primary-400" />
                      <h3 className="font-semibold text-white text-sm">Camera Angle</h3>
                    </div>
                    <select
                      value={selectedCameraAngle}
                      onChange={(e) => setSelectedCameraAngle(e.target.value)}
                      className="w-full bg-dark-800/50 border border-glass-border rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-primary-500/50 appearance-none cursor-pointer"
                    >
                      {cameraAngles.map((angle) => (
                        <option key={angle} value={angle}>
                          {angle}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="glass-card rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Sun className="w-5 h-5 text-accent-amber" />
                      <h3 className="font-semibold text-white text-sm">Lighting</h3>
                    </div>
                    <select
                      value={selectedLighting}
                      onChange={(e) => setSelectedLighting(e.target.value)}
                      className="w-full bg-dark-800/50 border border-glass-border rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-primary-500/50 appearance-none cursor-pointer"
                    >
                      {lightingOptions.map((light) => (
                        <option key={light} value={light}>
                          {light}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="glass-card rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Mountain className="w-5 h-5 text-accent-emerald" />
                      <h3 className="font-semibold text-white text-sm">Environment</h3>
                    </div>
                    <select
                      value={selectedEnvironment}
                      onChange={(e) => setSelectedEnvironment(e.target.value)}
                      className="w-full bg-dark-800/50 border border-glass-border rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-primary-500/50 appearance-none cursor-pointer"
                    >
                      <option value="">Any environment</option>
                      {environments.map((env) => (
                        <option key={env} value={env}>
                          {env}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="glass-card rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <CloudLightning className="w-5 h-5 text-accent-pink" />
                      <h3 className="font-semibold text-white text-sm">Mood</h3>
                    </div>
                    <select
                      value={selectedMood}
                      onChange={(e) => setSelectedMood(e.target.value)}
                      className="w-full bg-dark-800/50 border border-glass-border rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-primary-500/50 appearance-none cursor-pointer"
                    >
                      {moods.map((mood) => (
                        <option key={mood} value={mood}>
                          {mood}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="glass-card rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Camera className="w-5 h-5 text-primary-400" />
                    <h3 className="font-semibold text-white">Camera & Lens</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cameraOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => toggleCameraOption(option)}
                        className={cn(
                          "px-3 py-2 rounded-lg text-xs font-medium transition-all",
                          selectedCameraOptions.includes(option)
                            ? "bg-primary-500/20 text-primary-400 border border-primary-500/30"
                            : "bg-dark-800/50 text-slate-400 border border-glass-border hover:bg-white/5"
                        )}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="glass-card rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <X className="w-5 h-5 text-accent-pink" />
                      <h3 className="font-semibold text-white">Negative Prompt</h3>
                    </div>
                    <button
                      onClick={() => setNegativePrompt("")}
                      className="text-xs text-slate-500 hover:text-accent-pink transition-colors"
                    >
                      Clear
                    </button>
                  </div>
                  <textarea
                    value={negativePrompt}
                    onChange={(e) => setNegativePrompt(e.target.value)}
                    placeholder="What to exclude from the image..."
                    className="w-full h-24 bg-dark-800/50 border border-glass-border rounded-xl px-4 py-3 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-accent-pink/50 transition-all resize-none text-sm"
                  />
                  <div className="flex flex-wrap gap-2 mt-3">
                    {negativePromptOptions.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setNegativePrompt((prev) => (prev ? prev + ", " + opt : opt))}
                        className="px-2 py-1 text-xs bg-dark-800/50 text-slate-400 rounded-lg hover:bg-white/5 transition-colors"
                      >
                        + {opt.substring(0, 30)}...
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={isGenerating || !subject.trim()}
                  className="w-full flex items-center justify-center gap-2 btn-primary text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGenerating ? (
                    <>
                      <LoadingSpinner size="sm" />
                      Generating Prompt...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-6 h-6" />
                      Generate Image Prompt
                    </>
                  )}
                </button>
              </div>

              <div className="space-y-6">
                <AnimatePresence>
                  {generatedPrompt && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-6"
                    >
                      <div className="glass-card rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-accent-cyan" />
                            <h3 className="font-semibold text-white">Generated Prompt</h3>
                          </div>
                          <div className="flex gap-2">
                            <CopyButton text={generatedPrompt.positive} />
                            <button
                              onClick={handleGenerate}
                              className="p-2 rounded-lg bg-dark-800 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                              title="Regenerate"
                            >
                              <RefreshCw className="w-4 h-4" />
                            </button>
                            <button className="p-2 rounded-lg bg-dark-800 text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
                              <Save className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-medium text-accent-cyan uppercase tracking-wider">
                                Positive Prompt
                              </span>
                              <span className="text-xs text-slate-500">
                                --ar {aspectRatio}
                              </span>
                            </div>
                            <div className="p-4 rounded-xl bg-gradient-to-br from-accent-cyan/5 to-transparent border border-accent-cyan/20">
                              <p className="text-sm text-slate-200 leading-relaxed">
                                {generatedPrompt.positive}
                              </p>
                              <div className="mt-3 pt-3 border-t border-glass-border flex items-center gap-2 text-xs text-slate-500">
                                <span>Full prompt:</span>
                                <code className="px-2 py-1 bg-dark-800 rounded">
                                  {generatedPrompt.positive.substring(0, 50)}... --ar {aspectRatio}
                                </code>
                              </div>
                            </div>
                          </div>

                          {generatedPrompt.negative && (
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-medium text-accent-pink uppercase tracking-wider">
                                  Negative Prompt
                                </span>
                              </div>
                              <div className="p-4 rounded-xl bg-gradient-to-br from-accent-pink/5 to-transparent border border-accent-pink/20">
                                <p className="text-sm text-slate-300">
                                  {generatedPrompt.negative}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="glass-card rounded-2xl p-6">
                        <h3 className="font-semibold text-white mb-4">Quick Copy</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <button
                            onClick={() => navigator.clipboard.writeText(`${generatedPrompt.positive} --ar ${aspectRatio}`)}
                            className="flex items-center justify-center gap-2 p-3 rounded-xl bg-dark-800/50 border border-glass-border hover:bg-primary-500/10 hover:border-primary-500/30 transition-all"
                          >
                            <Copy className="w-4 h-4 text-primary-400" />
                            <span className="text-sm text-slate-300">Full Prompt (Midjourney)</span>
                          </button>
                          <button
                            onClick={() => navigator.clipboard.writeText(generatedPrompt.positive)}
                            className="flex items-center justify-center gap-2 p-3 rounded-xl bg-dark-800/50 border border-glass-border hover:bg-accent-cyan/10 hover:border-accent-cyan/30 transition-all"
                          >
                            <Copy className="w-4 h-4 text-accent-cyan" />
                            <span className="text-sm text-slate-300">Positive Only</span>
                          </button>
                          <button
                            onClick={() =>
                              navigator.clipboard.writeText(
                                `Positive: ${generatedPrompt.positive}\n\nNegative: ${generatedPrompt.negative}`
                              )
                            }
                            className="flex items-center justify-center gap-2 p-3 rounded-xl bg-dark-800/50 border border-glass-border hover:bg-accent-purple/10 hover:border-accent-purple/30 transition-all sm:col-span-2"
                          >
                            <Copy className="w-4 h-4 text-accent-purple" />
                            <span className="text-sm text-slate-300">Both Positive & Negative</span>
                          </button>
                        </div>
                      </div>

                      <div className="glass-card rounded-2xl p-6">
                        <h3 className="font-semibold text-white mb-4">Compatible With</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {[
                            { name: "Midjourney", color: "bg-purple-500/20 text-purple-400" },
                            { name: "Flux", color: "bg-pink-500/20 text-pink-400" },
                            { name: "DALL·E", color: "bg-green-500/20 text-green-400" },
                            { name: "Stable Diffusion", color: "bg-cyan-500/20 text-cyan-400" },
                          ].map((platform) => (
                            <div
                              key={platform.name}
                              className={cn(
                                "p-3 rounded-xl text-center text-sm font-medium",
                                platform.color
                              )}
                            >
                              {platform.name}
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {!generatedPrompt && (
                  <div className="glass-card rounded-2xl p-12 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-accent-cyan/10 flex items-center justify-center mx-auto mb-4">
                      <Eye className="w-8 h-8 text-accent-cyan" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Your prompt will appear here</h3>
                    <p className="text-slate-400 max-w-sm mx-auto">
                      Describe your subject, choose your style and settings, then click
                      "Generate Image Prompt" to create a professional image prompt.
                    </p>
                    <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                      <span className="text-xs text-slate-500">Try:</span>
                      {["A cyberpunk samurai", "Enchanted forest", "Luxury sports car"].map((example) => (
                        <button
                          key={example}
                          onClick={() => setSubject(example)}
                          className="px-3 py-1.5 text-xs bg-dark-800/50 text-slate-400 rounded-lg hover:bg-primary-500/10 hover:text-primary-400 transition-colors"
                        >
                          {example}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="glass-card rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5 text-accent-amber" />
                    <h3 className="font-semibold text-white">Pro Tips</h3>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2 text-sm text-slate-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent-amber mt-1.5 flex-shrink-0" />
                      <span>
                        Be specific about your subject - include clothing, expressions, and
                        specific details
                      </span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-slate-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent-amber mt-1.5 flex-shrink-0" />
                      <span>
                        Use negative prompts to exclude unwanted elements like "blurry", "text",
                        or "watermark"
                      </span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-slate-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent-amber mt-1.5 flex-shrink-0" />
                      <span>
                        Combine multiple styles for unique results - try "cinematic anime" or
                        "watercolor cyberpunk"
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
}
