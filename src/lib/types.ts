export interface Prompt {
  id: string;
  title: string;
  content: string;
  originalContent?: string;
  category: PromptCategory;
  aiModel: AIModel;
  framework?: PromptFramework;
  score?: PromptScore;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  isPublic: boolean;
  isFavorite: boolean;
  userId?: string;
  versions: PromptVersion[];
}

export interface PromptVersion {
  id: string;
  content: string;
  timestamp: Date;
  score?: PromptScore;
}

export interface PromptScore {
  overall: number;
  clarity: number;
  context: number;
  specificity: number;
  reasoning: number;
  hallucinationRisk: number;
  outputControl: number;
  structure: number;
}

export interface OutputPrediction {
  expectedQuality: number;
  likelyWeaknesses: string[];
  hallucinationProbability: number;
  tokenEfficiency: number;
  estimatedTokens: number;
}

export type PromptCategory = 
  | "coding"
  | "content"
  | "business"
  | "image"
  | "general"
  | "research"
  | "creative";

export type AIModel = 
  | "chatgpt"
  | "claude"
  | "gemini"
  | "midjourney"
  | "flux"
  | "stable-diffusion"
  | "cursor"
  | "copilot"
  | "general";

export type PromptFramework = 
  | "rtf"
  | "chain-of-thought"
  | "tree-of-thought"
  | "few-shot"
  | "zero-shot"
  | "structured-output"
  | "system-prompt"
  | "agentic"
  | "self-reflection";

export interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  prompt: string;
  order: number;
  aiModel: AIModel;
}

export interface Workflow {
  id: string;
  title: string;
  description: string;
  category: string;
  steps: WorkflowStep[];
  createdAt: Date;
  userId?: string;
}

export interface PromptComponent {
  type: "role" | "tone" | "output_format" | "constraints" | "audience" | "objectives" | "examples" | "style";
  content: string;
}

export interface MarketplacePrompt extends Prompt {
  author: string;
  authorAvatar?: string;
  downloads: number;
  likes: number;
  rating: number;
  price?: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  profession?: string;
  preferredTone?: string;
  preferredFramework?: PromptFramework;
  plan: "free" | "pro" | "team" | "enterprise";
  createdAt: Date;
}

export interface EnhancementOption {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export const ENHANCEMENT_OPTIONS: EnhancementOption[] = [
  { id: "professional", name: "Professional", description: "Formal, business-ready language", icon: "Briefcase" },
  { id: "expert", name: "Expert", description: "Deep technical expertise and precision", icon: "Brain" },
  { id: "detailed", name: "Detailed", description: "Maximum context and specificity", icon: "FileText" },
  { id: "concise", name: "Concise", description: "Compact and efficient", icon: "Zap" },
  { id: "reasoning", name: "Reasoning Enhanced", description: "Chain of thought optimization", icon: "GitBranch" },
  { id: "business", name: "Business Focused", description: "ROI and outcome oriented", icon: "TrendingUp" },
];

export const PROMPT_FRAMEWORKS: { id: PromptFramework; name: string; description: string }[] = [
  { id: "rtf", name: "Role-Task-Format", description: "Define role, specify task, set output format" },
  { id: "chain-of-thought", name: "Chain of Thought", description: "Step-by-step reasoning prompting" },
  { id: "tree-of-thought", name: "Tree of Thought", description: "Explore multiple reasoning paths" },
  { id: "few-shot", name: "Few-Shot", description: "Provide examples for the AI to follow" },
  { id: "zero-shot", name: "Zero-Shot", description: "Direct instruction without examples" },
  { id: "structured-output", name: "Structured Output", description: "Force specific output structure (JSON, XML)" },
  { id: "system-prompt", name: "System Prompting", description: "Set context through system messages" },
  { id: "agentic", name: "Agentic Prompting", description: "Treat AI as autonomous agent" },
  { id: "self-reflection", name: "Self-Reflection", description: "AI reviews and improves its own output" },
];

export const AI_MODELS: { id: AIModel; name: string; category: string; color: string }[] = [
  { id: "chatgpt", name: "ChatGPT", category: "text", color: "bg-green-500" },
  { id: "claude", name: "Claude", category: "text", color: "bg-orange-500" },
  { id: "gemini", name: "Gemini", category: "text", color: "bg-blue-500" },
  { id: "midjourney", name: "Midjourney", category: "image", color: "bg-purple-500" },
  { id: "flux", name: "Flux", category: "image", color: "bg-pink-500" },
  { id: "stable-diffusion", name: "Stable Diffusion", category: "image", color: "bg-cyan-500" },
  { id: "cursor", name: "Cursor AI", category: "coding", color: "bg-yellow-500" },
  { id: "copilot", name: "GitHub Copilot", category: "coding", color: "bg-indigo-500" },
  { id: "general", name: "General Purpose", category: "all", color: "bg-gray-500" },
];

export const WORKFLOW_TEMPLATES: { id: string; title: string; description: string; icon: string; category: string }[] = [
  { id: "youtube", title: "YouTube Video Creation", description: "Generate complete YouTube video from idea to script", icon: "Video", category: "content" },
  { id: "saas", title: "SaaS App Builder", description: "Build complete SaaS application architecture", icon: "Globe", category: "coding" },
  { id: "marketing", title: "Marketing Campaign", description: "End-to-end marketing campaign generation", icon: "Megaphone", category: "business" },
  { id: "startup", title: "Startup Idea Validator", description: "Validate and build your startup idea", icon: "Rocket", category: "business" },
  { id: "react", title: "React UI Builder", description: "Build beautiful React components", icon: "Layout", category: "coding" },
  { id: "research", title: "Research Pipeline", description: "Deep research and analysis workflow", icon: "Search", category: "research" },
  { id: "content", title: "Content Calendar", description: "Plan and create content for 30 days", icon: "Calendar", category: "content" },
  { id: "code-review", title: "Code Review Master", description: "Comprehensive code review workflow", icon: "Code", category: "coding" },
];
