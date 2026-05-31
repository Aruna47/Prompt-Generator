"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout";
import { WORKFLOW_TEMPLATES, Workflow, WorkflowStep, AIModel } from "@/lib/types";
import { generateId } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  Workflow as WorkflowIcon,
  Plus,
  Trash2,
  Play,
  Save,
  Copy,
  ChevronRight,
  Sparkles,
  Video,
  Globe,
  Megaphone,
  Rocket,
  Layout,
  Search,
  Calendar,
  Code,
  ArrowRight,
  GripVertical,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CopyButton, LoadingSpinner } from "@/components/ui";

const templateIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Video,
  Globe,
  Megaphone,
  Rocket,
  Layout,
  Search,
  Calendar,
  Code,
};

const sampleWorkflows: Workflow[] = [
  {
    id: "wf-1",
    title: "YouTube Video Creation",
    description: "Generate complete YouTube video from idea to script",
    category: "content",
    createdAt: new Date(),
    steps: [
      {
        id: "step-1",
        title: "Topic Research & Validation",
        description: "Research the topic, identify trends, and validate demand",
        prompt: "You are a YouTube content strategist. Research the following topic and identify: 1) Current trends and popularity, 2) Target audience pain points, 3) Competitor analysis, 4) Content gaps and opportunities. Provide actionable insights for video creation.",
        order: 1,
        aiModel: "chatgpt",
      },
      {
        id: "step-2",
        title: "Title & Thumbnail Strategy",
        description: "Create compelling titles and thumbnail concepts",
        prompt: "Create 10 attention-grabbing YouTube titles using proven CTR optimization techniques. Include: curiosity gaps, numbers, power words, urgency. For each title, suggest a thumbnail concept with specific visual elements and text overlays.",
        order: 2,
        aiModel: "claude",
      },
      {
        id: "step-3",
        title: "Script Generation",
        description: "Write a complete video script with hooks and structure",
        prompt: "Write a comprehensive YouTube video script. Include: 1) Strong hook (first 30 seconds), 2) Clear structure with timestamps, 3) Engaging narration, 4) B-roll suggestions, 5) Call-to-action. Format for easy reading with scene descriptions.",
        order: 3,
        aiModel: "gemini",
      },
      {
        id: "step-4",
        title: "SEO & Description",
        description: "Optimize for discovery and engagement",
        prompt: "Create SEO-optimized metadata: 1) Video description with keywords, 2) Tags (5-10 relevant), 3) Chapters/sections, 4) End screen suggestions, 5) Card placements. Include engagement prompts and links.",
        order: 4,
        aiModel: "chatgpt",
      },
    ],
  },
];

export default function WorkflowBuilderPage() {
  const [workflows, setWorkflows] = useState<Workflow[]>(sampleWorkflows);
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [newWorkflowName, setNewWorkflowName] = useState("");
  const [newWorkflowGoal, setNewWorkflowGoal] = useState("");
  const [activeStep, setActiveStep] = useState<WorkflowStep | null>(null);
  const [showTemplates, setShowTemplates] = useState(true);
  const [editingStep, setEditingStep] = useState<WorkflowStep | null>(null);

  const handleGenerateWorkflow = async () => {
    if (!newWorkflowGoal.trim()) return;
    setIsGenerating(true);

    await new Promise((r) => setTimeout(r, 2000));

    const newWorkflow: Workflow = {
      id: generateId(),
      title: newWorkflowName || newWorkflowGoal.substring(0, 50),
      description: newWorkflowGoal,
      category: "custom",
      createdAt: new Date(),
      steps: [
        {
          id: generateId(),
          title: "Analysis & Planning",
          description: "Understand requirements and plan approach",
          prompt: `You are an expert in ${newWorkflowGoal}. Analyze this goal and provide: 1) Key requirements and success criteria, 2) Potential challenges and mitigations, 3) Recommended approach, 4) Success metrics. Goal: ${newWorkflowGoal}`,
          order: 1,
          aiModel: "chatgpt",
        },
        {
          id: generateId(),
          title: "Core Implementation",
          description: "Execute the main task",
          prompt: `Execute the core implementation for: ${newWorkflowGoal}. Provide detailed, step-by-step execution plan with specific actions, deliverables, and quality checks.`,
          order: 2,
          aiModel: "claude",
        },
        {
          id: generateId(),
          title: "Review & Refinement",
          description: "Quality assurance and improvements",
          prompt: `Review and refine the output for: ${newWorkflowGoal}. Perform: 1) Quality audit, 2) Gap analysis, 3) Enhancement opportunities, 4) Final validation. Provide specific improvement suggestions.`,
          order: 3,
          aiModel: "gemini",
        },
      ],
    };

    setWorkflows([newWorkflow, ...workflows]);
    setSelectedWorkflow(newWorkflow);
    setIsGenerating(false);
    setIsCreating(false);
    setNewWorkflowName("");
    setNewWorkflowGoal("");
    setShowTemplates(false);
  };

  const handleAddTemplate = (template: typeof WORKFLOW_TEMPLATES[0]) => {
    const existing = sampleWorkflows.find(
      (w) => w.title.toLowerCase().includes(template.title.toLowerCase().split(" ")[0])
    );
    if (existing) {
      setSelectedWorkflow(existing);
    } else {
      const newWorkflow: Workflow = {
        id: generateId(),
        title: template.title,
        description: template.description,
        category: template.category,
        createdAt: new Date(),
        steps: [
          {
            id: generateId(),
            title: "Phase 1: Planning",
            description: "Initial planning and research phase",
            prompt: `Plan the ${template.title} workflow. Include research, requirements gathering, and strategy development.`,
            order: 1,
            aiModel: "chatgpt",
          },
          {
            id: generateId(),
            title: "Phase 2: Execution",
            description: "Main execution phase",
            prompt: `Execute the main tasks for ${template.title}. Provide detailed implementation steps.`,
            order: 2,
            aiModel: "claude",
          },
          {
            id: generateId(),
            title: "Phase 3: Review",
            description: "Quality review and refinement",
            prompt: `Review and optimize the ${template.title} output. Ensure quality standards are met.`,
            order: 3,
            aiModel: "gemini",
          },
        ],
      };
      setWorkflows([newWorkflow, ...workflows]);
      setSelectedWorkflow(newWorkflow);
    }
    setShowTemplates(false);
  };

  const addStep = () => {
    if (!selectedWorkflow) return;
    const newStep: WorkflowStep = {
      id: generateId(),
      title: "New Step",
      description: "Click to edit this step",
      prompt: "",
      order: selectedWorkflow.steps.length + 1,
      aiModel: "chatgpt" as AIModel,
    };
    setSelectedWorkflow({
      ...selectedWorkflow,
      steps: [...selectedWorkflow.steps, newStep],
    });
    setEditingStep(newStep);
  };

  const deleteStep = (stepId: string) => {
    if (!selectedWorkflow) return;
    setSelectedWorkflow({
      ...selectedWorkflow,
      steps: selectedWorkflow.steps
        .filter((s) => s.id !== stepId)
        .map((s, i) => ({ ...s, order: i + 1 })),
    });
  };

  const updateStep = (updatedStep: WorkflowStep) => {
    if (!selectedWorkflow) return;
    setSelectedWorkflow({
      ...selectedWorkflow,
      steps: selectedWorkflow.steps.map((s) =>
        s.id === updatedStep.id ? updatedStep : s
      ),
    });
    setEditingStep(null);
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
                  <WorkflowIcon className="w-6 h-6 text-accent-purple" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Workflow Builder</h1>
                  <p className="text-slate-400 text-sm">
                    Create multi-step AI workflows for complex tasks
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsCreating(true);
                  setShowTemplates(false);
                }}
                className="flex items-center gap-2 btn-primary"
              >
                <Plus className="w-5 h-5" />
                New Workflow
              </button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 space-y-4">
            <div className="glass-card rounded-2xl p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white">Your Workflows</h3>
                <button
                  onClick={() => setShowTemplates(!showTemplates)}
                  className={cn(
                    "text-xs font-medium px-3 py-1.5 rounded-lg transition-colors",
                    showTemplates
                      ? "bg-primary-500/20 text-primary-400"
                      : "bg-dark-800 text-slate-400 hover:text-white"
                  )}
                >
                  Templates
                </button>
              </div>

              <AnimatePresence>
                {showTemplates ? (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-2 overflow-hidden"
                  >
                    <p className="text-xs text-slate-500 mb-3">Quick start templates</p>
                    {WORKFLOW_TEMPLATES.map((template) => {
                      const Icon = templateIcons[template.icon] || Sparkles;
                      return (
                        <button
                          key={template.id}
                          onClick={() => handleAddTemplate(template)}
                          className="w-full flex items-center gap-3 p-3 rounded-xl bg-dark-800/50 border border-glass-border hover:border-primary-500/30 hover:bg-white/5 transition-all text-left"
                        >
                          <div className="w-8 h-8 rounded-lg bg-primary-500/20 flex items-center justify-center">
                            <Icon className="w-4 h-4 text-primary-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-white truncate">
                              {template.title}
                            </div>
                            <div className="text-xs text-slate-500 truncate">
                              {template.description}
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-500 flex-shrink-0" />
                        </button>
                      );
                    })}
                  </motion.div>
                ) : (
                  <div className="space-y-2">
                    {workflows.length === 0 ? (
                      <div className="text-center py-8">
                        <WorkflowIcon className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                        <p className="text-sm text-slate-500">No workflows yet</p>
                      </div>
                    ) : (
                      workflows.map((workflow) => (
                        <button
                          key={workflow.id}
                          onClick={() => setSelectedWorkflow(workflow)}
                          className={cn(
                            "w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all",
                            selectedWorkflow?.id === workflow.id
                              ? "bg-primary-500/20 border border-primary-500/30"
                              : "bg-dark-800/50 border border-glass-border hover:bg-white/5"
                          )}
                        >
                          <div className={cn(
                            "w-8 h-8 rounded-lg flex items-center justify-center",
                            selectedWorkflow?.id === workflow.id
                              ? "bg-primary-500/30"
                              : "bg-dark-700"
                          )}>
                            <WorkflowIcon className={cn(
                              "w-4 h-4",
                              selectedWorkflow?.id === workflow.id ? "text-primary-400" : "text-slate-400"
                            )} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-white truncate">
                              {workflow.title}
                            </div>
                            <div className="text-xs text-slate-500">
                              {workflow.steps.length} steps
                            </div>
                          </div>
                        </button>
                      ))
                    )}
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {isCreating ? (
                <motion.div
                  key="create"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="glass-card rounded-2xl p-6"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-white">Create New Workflow</h2>
                    <button
                      onClick={() => setIsCreating(false)}
                      className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5 text-slate-400" />
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="text-sm font-medium text-slate-300 mb-2 block">
                        Workflow Name
                      </label>
                      <input
                        type="text"
                        value={newWorkflowName}
                        onChange={(e) => setNewWorkflowName(e.target.value)}
                        placeholder="e.g., Product Launch Campaign"
                        className="w-full bg-dark-800/50 border border-glass-border rounded-xl px-4 py-3 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-primary-500/50 transition-all"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-slate-300 mb-2 block">
                        What do you want to accomplish?
                      </label>
                      <textarea
                        value={newWorkflowGoal}
                        onChange={(e) => setNewWorkflowGoal(e.target.value)}
                        placeholder="Describe your goal in detail. For example: 'Create a complete YouTube video about AI prompt engineering from idea to published video including script, thumbnail suggestions, and SEO optimization.'"
                        className="w-full h-40 bg-dark-800/50 border border-glass-border rounded-xl px-4 py-3 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-primary-500/50 transition-all resize-none"
                      />
                    </div>

                    <div className="p-4 rounded-xl bg-accent-purple/10 border border-accent-purple/20">
                      <div className="flex items-start gap-3">
                        <Sparkles className="w-5 h-5 text-accent-purple flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-accent-purple mb-1">
                            AI-Powered Generation
                          </p>
                          <p className="text-sm text-slate-400">
                            Our AI will analyze your goal and create an optimized multi-step workflow
                            with specialized prompts for each stage.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={handleGenerateWorkflow}
                        disabled={isGenerating || !newWorkflowGoal.trim()}
                        className="flex-1 flex items-center justify-center gap-2 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isGenerating ? (
                          <>
                            <LoadingSpinner size="sm" />
                            Generating Workflow...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-5 h-5" />
                            Generate Workflow
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => setIsCreating(false)}
                        className="px-6 py-3 bg-dark-800 border border-glass-border text-slate-200 font-semibold rounded-xl transition-all hover:bg-white/5"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : selectedWorkflow ? (
                <motion.div
                  key="workflow"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="glass-card rounded-2xl p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                      <div>
                        <h2 className="text-xl font-bold text-white">{selectedWorkflow.title}</h2>
                        <p className="text-slate-400 text-sm mt-1">
                          {selectedWorkflow.description}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button className="flex items-center gap-2 px-4 py-2 bg-accent-emerald/20 text-accent-emerald rounded-xl text-sm font-medium hover:bg-accent-emerald/30 transition-colors">
                          <Play className="w-4 h-4" />
                          Run Workflow
                        </button>
                        <CopyButton
                          text={selectedWorkflow.steps.map((s) => `## ${s.title}\n${s.prompt}`).join("\n\n")}
                        />
                        <button className="p-2 bg-dark-800 rounded-xl text-slate-400 hover:text-white transition-colors">
                          <Save className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {selectedWorkflow.steps.map((step, i) => (
                        <motion.div
                          key={step.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          {editingStep?.id === step.id ? (
                            <div className="p-5 rounded-2xl bg-primary-500/10 border-2 border-primary-500/30">
                              <div className="flex items-center justify-between mb-4">
                                <input
                                  type="text"
                                  value={editingStep.title}
                                  onChange={(e) =>
                                    setEditingStep({ ...editingStep, title: e.target.value })
                                  }
                                  className="text-lg font-bold text-white bg-transparent border-b border-glass-border focus:outline-none focus:border-primary-500 px-1"
                                />
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => updateStep(editingStep)}
                                    className="px-3 py-1.5 bg-primary-500/20 text-primary-400 rounded-lg text-sm font-medium"
                                  >
                                    Save
                                  </button>
                                  <button
                                    onClick={() => setEditingStep(null)}
                                    className="px-3 py-1.5 bg-dark-800 text-slate-400 rounded-lg text-sm"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                              <div className="space-y-4">
                                <div>
                                  <label className="text-xs text-slate-400 uppercase tracking-wider mb-1 block">
                                    Description
                                  </label>
                                  <input
                                    type="text"
                                    value={editingStep.description}
                                    onChange={(e) =>
                                      setEditingStep({ ...editingStep, description: e.target.value })
                                    }
                                    className="w-full bg-dark-800/50 border border-glass-border rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-primary-500/50"
                                  />
                                </div>
                                <div>
                                  <label className="text-xs text-slate-400 uppercase tracking-wider mb-1 block">
                                    Prompt
                                  </label>
                                  <textarea
                                    value={editingStep.prompt}
                                    onChange={(e) =>
                                      setEditingStep({ ...editingStep, prompt: e.target.value })
                                    }
                                    className="w-full h-40 bg-dark-800/50 border border-glass-border rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-primary-500/50 resize-none"
                                  />
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div
                              onClick={() => setActiveStep(step)}
                              className={cn(
                                "p-5 rounded-2xl border cursor-pointer transition-all",
                                activeStep?.id === step.id
                                  ? "bg-primary-500/10 border-primary-500/30"
                                  : "bg-dark-800/50 border-glass-border hover:bg-white/5 hover:border-white/20"
                              )}
                            >
                              <div className="flex items-start gap-4">
                                <div className="flex flex-col items-center">
                                  <div className={cn(
                                    "w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm",
                                    activeStep?.id === step.id
                                      ? "bg-primary-500 text-white"
                                      : "bg-dark-700 text-slate-400"
                                  )}>
                                    {step.order}
                                  </div>
                                  {i < selectedWorkflow.steps.length - 1 && (
                                    <div className="w-0.5 h-12 bg-glass-border mt-2" />
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between gap-4">
                                    <div>
                                      <h4 className="font-semibold text-white mb-1">{step.title}</h4>
                                      <p className="text-sm text-slate-400 mb-3">
                                        {step.description}
                                      </p>
                                      <p className="text-xs text-slate-500 line-clamp-2">
                                        {step.prompt}
                                      </p>
                                    </div>
                                    <div className="flex gap-1 flex-shrink-0">
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setEditingStep(step);
                                        }}
                                        className="p-1.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                                      >
                                        <Code className="w-4 h-4" />
                                      </button>
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          deleteStep(step.id);
                                        }}
                                        className="p-1.5 text-slate-400 hover:text-accent-pink hover:bg-accent-pink/10 rounded-lg transition-colors"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>

                    <button
                      onClick={addStep}
                      className="w-full mt-4 flex items-center justify-center gap-2 p-4 rounded-xl border-2 border-dashed border-glass-border text-slate-400 hover:text-primary-400 hover:border-primary-500/50 transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                      Add Step
                    </button>
                  </div>

                  {activeStep && !editingStep && (
                    <div className="glass-card rounded-2xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-primary-500/20 flex items-center justify-center">
                            <Code className="w-5 h-5 text-primary-400" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-white">
                              Step {activeStep.order}: {activeStep.title}
                            </h3>
                            <p className="text-sm text-slate-400">{activeStep.description}</p>
                          </div>
                        </div>
                        <CopyButton text={activeStep.prompt} />
                      </div>

                      <div className="p-4 rounded-xl bg-dark-800/50 border border-glass-border">
                        <pre className="whitespace-pre-wrap text-sm text-slate-200 font-sans">
                          {activeStep.prompt}
                        </pre>
                      </div>

                      <div className="flex gap-3 mt-4">
                        <button className="flex items-center gap-2 px-4 py-2 bg-accent-emerald/20 text-accent-emerald rounded-xl text-sm font-medium hover:bg-accent-emerald/30 transition-colors">
                          <Play className="w-4 h-4" />
                          Run This Step
                        </button>
                        <button
                          onClick={() => setEditingStep(activeStep)}
                          className="flex items-center gap-2 px-4 py-2 bg-dark-800 text-slate-300 rounded-xl text-sm hover:bg-white/5 transition-colors"
                        >
                          <Code className="w-4 h-4" />
                          Edit Prompt
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="glass-card rounded-2xl p-12 text-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-primary-500/10 flex items-center justify-center mx-auto mb-4">
                    <WorkflowIcon className="w-8 h-8 text-primary-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Select a Workflow</h3>
                  <p className="text-slate-400 mb-6 max-w-sm mx-auto">
                    Choose an existing workflow from the sidebar, create a new one, or start
                    with a template.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      onClick={() => {
                        setIsCreating(true);
                        setShowTemplates(false);
                      }}
                      className="flex items-center gap-2 btn-primary"
                    >
                      <Plus className="w-5 h-5" />
                      Create Workflow
                    </button>
                    <button
                      onClick={() => setShowTemplates(true)}
                      className="flex items-center gap-2 btn-secondary"
                    >
                      <Layout className="w-5 h-5" />
                      Browse Templates
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
