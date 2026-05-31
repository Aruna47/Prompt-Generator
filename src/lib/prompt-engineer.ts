import { 
  PromptScore, 
  OutputPrediction, 
  PromptFramework, 
  AIModel,
  PromptComponent,
} from '@/lib/types';
import { generateId, estimateTokenCount } from '@/lib/utils';
import { aiService } from '@/lib/ai-service';

export class PromptEngineer {
  private static SYSTEM_PROMPTS = {
    enhancer: `You are an elite Prompt Engineer at PromptForge AI. Your task is to transform weak, basic prompts into professional, optimized, AI-ready prompts that produce significantly better outputs.

Core Principles:
1. Role Assignment: Always define a clear role for the AI
2. Objective Definition: Be extremely specific about goals
3. Context Enrichment: Add relevant background and constraints
4. Output Formatting: Define exact output structure
5. Reasoning Enhancement: Include chain-of-thought where beneficial
6. Self-Reflection: Add output validation steps

Transform the input prompt using these frameworks:
- RTF (Role-Task-Format)
- Chain of Thought
- Structured Output
- Context Rich Prompting`,

    analyst: `You are a Prompt Intelligence Analyst. Analyze prompts and score them on these dimensions (0-100):

1. Clarity: How unambiguous and clear is the language?
2. Context: Is there sufficient background information?
3. Specificity: Are requirements concrete and measurable?
4. Reasoning Quality: Does it guide the AI's thinking process?
5. Hallucination Risk: Likelihood of false information (inverse score)
6. Output Control: How well is the output defined?
7. Structure Quality: Is the prompt well-organized?

Return JSON with:
- overall: weighted average
- scores for each dimension
- analysis: detailed feedback
- suggestions: improvement recommendations`,

    writingCoach: `You are an elite writing coach and prompt engineer. Your expertise is in crafting prompts that produce exceptional written content.

EXPERT TECHNIQUES:
1. Persona Method: Assign specific personas (e.g., "You are a Pulitzer-winning journalist")
2. Constraint-Based Writing: Set specific constraints (e.g., "Write at a 8th grade reading level")
3. Style Transfer: Specify style references (e.g., "Write in the style of Ernest Hemingway")
4. Multi-Draft Process: Request outline → first draft → revision → final draft
5. Sensory Details: Incorporate multiple sensory dimensions in descriptions
6. Show Don't Tell: Replace abstract statements with concrete examples
7. Rhythm & Pacing: Vary sentence length for dramatic effect
8. Voice Consistency: Maintain consistent tone throughout

Always structure creative writing prompts with: Context, Voice/Tone, Structure, Constraints, and Success Criteria.`,

    codingExpert: `You are a senior software architect with 20+ years of experience across all major tech stacks. Your prompts generate production-quality code.

EXPERT TECHNIQUES:
1. SOLID Principles: Ensure generated code follows Single Responsibility, Open-Closed, Liskov Substitution, Interface Segregation, Dependency Inversion
2. Design Patterns: Apply appropriate patterns (Factory, Observer, Strategy, Singleton, etc.)
3. Error Handling: Include comprehensive error handling, logging, and monitoring
4. Performance: Optimize for time complexity, memory usage, and scalability
5. Security: Include input validation, sanitization, authentication, authorization checks
6. Testing: Generate unit tests, integration tests, and edge case coverage
7. Documentation: Include JSDoc/TSDoc comments, README sections, API docs
8. Type Safety: Leverage TypeScript generics, discriminated unions, type guards

Always structure coding prompts with: Background context, Tech stack, Requirements, Constraints, Examples, Testing requirements, and Success criteria.`,

    businessStrategist: `You are a McKinsey-trained business strategist and Harvard MBA graduate. Your prompts drive business outcomes.

EXPERT TECHNIQUES:
1. MECE Framework: Mutually Exclusive, Collectively Exhaustive analysis
2. First Principles: Break problems down to fundamental truths
3. Porter's Five Forces: Industry analysis framework
4. SWOT/TOWS: Strategic planning matrix
5. OKR Methodology: Objectives and Key Results structure
6. RACI Matrix: Responsibility assignment framework
7. Unit Economics: Customer acquisition cost, lifetime value analysis
8. Growth Loops: Viral, paid, organic, and SEO growth strategies

Always structure business prompts with: Executive Summary, Market Context, Analysis Framework, Recommendations, Implementation Plan, KPIs, Risk Assessment.`,

    imagePrompt: `You are a cinematic image prompt engineer for Midjourney, Flux, Stable Diffusion, and Leonardo AI.

Create rich, detailed prompts including:
- Subject: Clear description of main subject
- Style: Artistic style references
- Composition: Camera angle, framing, rule of thirds
- Lighting: Type, direction, quality, time of day
- Environment: Setting, background, atmosphere
- Mood: Emotional tone, feeling
- Technical: Camera, lens, film stock, rendering style
- Details: Textures, materials, weather, effects
- Negative prompts: What to exclude

Format as comma-separated keywords with weighted terms using :: syntax where appropriate.`,
  };

  static async enhancePrompt(
    input: string,
    options: {
      style: 'professional' | 'expert' | 'detailed' | 'concise' | 'reasoning' | 'business';
      targetModel?: AIModel;
      framework?: PromptFramework;
      addComponents?: PromptComponent[];
    }
  ): Promise<{ enhanced: string; score: PromptScore; prediction: OutputPrediction }> {
    const styleInstructions = this.getStyleInstructions(options.style);
    const frameworkInstructions = options.framework ? this.getFrameworkInstructions(options.framework) : '';
    const modelInstructions = options.targetModel ? this.getModelInstructions(options.targetModel) : '';
    const componentsInstruction = options.addComponents?.length 
      ? `Additional components to integrate: ${options.addComponents.map(c => `${c.type}: ${c.content}`).join('; ')}`
      : '';

    const systemPrompt = `${this.SYSTEM_PROMPTS.enhancer}

STYLE REQUIREMENT: ${styleInstructions}
FRAMEWORK: ${frameworkInstructions}
TARGET AI MODEL: ${modelInstructions}
${componentsInstruction}

Return ONLY the enhanced prompt content without any explanations or markdown formatting.`;

    const userPrompt = `Original prompt to enhance: ${input}`;

    let enhanced: string;
    try {
      enhanced = await aiService.generateEnhancedPrompt(systemPrompt, userPrompt, { temperature: 0.7, maxTokens: 4000 });
    } catch {
      enhanced = await this.simulateAIResponse(input, options.style, options.targetModel);
    }

    const score = this.analyzePrompt(enhanced);
    const prediction = this.predictOutput(enhanced, score);

    return { enhanced, score, prediction };
  }

  private static getStyleInstructions(style: string): string {
    const styles: Record<string, string> = {
      professional: 'Use formal, business-appropriate language. Be authoritative but approachable. Focus on clarity and precision.',
      expert: 'Assume the AI is a domain expert. Use technical terminology appropriately. Demand deep, thorough analysis.',
      detailed: 'Maximum specificity required. Include all relevant context, edge cases, and requirements. Leave nothing ambiguous.',
      concise: 'Be efficient and compact. Remove redundant words. Focus on essential instructions only.',
      reasoning: 'Include explicit chain-of-thought requirements. Demand step-by-step reasoning, self-verification, and iteration.',
      business: 'Focus on ROI, outcomes, metrics, and business value. Include success criteria and measurable objectives.',
    };
    return styles[style] || styles.professional;
  }

  private static getFrameworkInstructions(framework: PromptFramework): string {
    const frameworks: Record<PromptFramework, string> = {
      'rtf': 'Use Role-Task-Format: (1) Define the AI\'s role clearly, (2) Specify the task in detail, (3) Define exact output format.',
      'chain-of-thought': 'Include chain-of-thought prompting: "Think through this step by step. First, understand the requirements. Then, break down the problem. Then, solve each part. Finally, verify your work."',
      'tree-of-thought': 'Use tree-of-thought: Explore multiple approaches, evaluate each, select the best path. Consider alternatives and trade-offs.',
      'few-shot': 'Include example outputs that demonstrate the expected quality and format.',
      'zero-shot': 'Direct instruction format - clear, concise, no examples needed.',
      'structured-output': 'Force JSON/XML output with specific schema. Define exact fields required.',
      'system-prompt': 'Separate system context from user instructions. Establish persona and constraints upfront.',
      'agentic': 'Treat AI as autonomous agent: set goals, allow planning, enable iteration, require self-evaluation.',
      'self-reflection': 'Add self-review step: "After generating your response, review it for accuracy, completeness, and quality. Improve it if needed."',
    };
    return frameworks[framework] || '';
  }

  private static getModelInstructions(model: AIModel): string {
    const models: Record<AIModel, string> = {
      chatgpt: 'Optimized for GPT-4 / ChatGPT. Use conversational clarity, structured outputs, and explicit reasoning prompts.',
      claude: 'Optimized for Claude (Anthropic). Claude excels at long context, complex reasoning, and detailed analysis. Be thorough in requirements.',
      gemini: 'Optimized for Google Gemini. Gemini handles multimodal inputs well and excels at coding and creative tasks.',
      midjourney: 'Use Midjourney prompt syntax: comma-separated keywords, style weights, aspect ratio, camera terms.',
      flux: 'Use Flux-optimized prompting: detailed scene descriptions, artistic style references, quality modifiers.',
      'stable-diffusion': 'Standard diffusion model prompting: subject, style, modifiers, negative prompts for exclusion.',
      cursor: 'Optimized for Cursor AI coding assistant. Include coding standards, patterns, testing requirements.',
      copilot: 'Optimized for GitHub Copilot. Include context about codebase, patterns, and specific implementation requirements.',
      general: 'General purpose optimization - balance clarity, detail, and reasoning.',
    };
    return models[model] || models.general;
  }

  static analyzePrompt(text: string): PromptScore {
    const words = text.split(/\s+/).filter(w => w.length > 0).length;
    const sentences = text.split(/[.!?]+/).filter(s => s.trim()).length;
    const paragraphs = text.split(/\n\n+/).filter(p => p.trim()).length;
    
    const hasRole = /role|act as|you are|pretend|persona/i.test(text);
    const hasTask = /task|create|write|generate|build|design|analyze/i.test(text);
    const hasFormat = /format|json|xml|markdown|output|structure|template/i.test(text);
    const hasConstraints = /must|should|requirement|constraint|limit|only|cannot/i.test(text);
    const hasExamples = /example|for instance|e\.g|sample/i.test(text);
    const hasReasoning = /think|step|reason|analyze|consider|evaluate|verify/i.test(text);
    const hasSpecificity = /specific|exact|precise|detailed|comprehensive|thorough/i.test(text);
    
    const lengthScore = Math.min(100, (words / 50) * 100);
    const structureScore = Math.min(100, (paragraphs * 20) + (sentences > 5 ? 50 : sentences * 10));
    
    const clarity = Math.round((hasRole ? 25 : 0) + (hasTask ? 25 : 0) + (hasFormat ? 25 : 0) + (lengthScore * 0.25));
    const context = Math.round((hasRole ? 30 : 0) + (hasExamples ? 30 : 0) + (structureScore * 0.4));
    const specificity = Math.round((hasSpecificity ? 40 : 0) + (hasConstraints ? 30 : 0) + (lengthScore * 0.3));
    const reasoning = Math.round((hasReasoning ? 50 : 0) + (structureScore * 0.5));
    const hallucinationRisk = Math.round(100 - ((hasConstraints ? 20 : 0) + (hasRole ? 20 : 0) + (hasExamples ? 20 : 0) + (specificity * 0.4)));
    const outputControl = Math.round((hasFormat ? 40 : 0) + (hasConstraints ? 30 : 0) + (hasExamples ? 30 : 0));
    const structure = Math.round(structureScore);
    
    const overall = Math.round((clarity * 0.2) + (context * 0.15) + (specificity * 0.15) + (reasoning * 0.15) + ((100 - hallucinationRisk) * 0.15) + (outputControl * 0.1) + (structure * 0.1));
    
    return {
      overall: Math.max(0, Math.min(100, overall)),
      clarity: Math.max(0, Math.min(100, clarity)),
      context: Math.max(0, Math.min(100, context)),
      specificity: Math.max(0, Math.min(100, specificity)),
      reasoning: Math.max(0, Math.min(100, reasoning)),
      hallucinationRisk: Math.max(0, Math.min(100, hallucinationRisk)),
      outputControl: Math.max(0, Math.min(100, outputControl)),
      structure: Math.max(0, Math.min(100, structure)),
    };
  }

  static predictOutput(text: string, score: PromptScore): OutputPrediction {
    const tokens = estimateTokenCount(text);
    const baseQuality = score.overall;
    
    const weaknesses: string[] = [];
    if (score.clarity < 50) weaknesses.push('Ambiguous language may cause misinterpretation');
    if (score.context < 40) weaknesses.push('Insufficient context provided');
    if (score.specificity < 40) weaknesses.push('Requirements lack specificity');
    if (score.reasoning < 30) weaknesses.push('No reasoning guidance provided');
    if (score.outputControl < 40) weaknesses.push('Output format not well-defined');
    if (score.structure < 40) weaknesses.push('Prompt organization could be improved');
    
    if (weaknesses.length === 0) {
      weaknesses.push('Well-constructed prompt - high quality output expected');
    }
    
    return {
      expectedQuality: Math.min(95, baseQuality + 10),
      likelyWeaknesses: weaknesses,
      hallucinationProbability: score.hallucinationRisk,
      tokenEfficiency: Math.round(100 - Math.min(50, tokens / 10)),
      estimatedTokens: tokens,
    };
  }

  static generateImagePrompt(
    subject: string,
    options: {
      style?: string;
      composition?: string;
      lighting?: string;
      environment?: string;
      mood?: string;
      camera?: string;
      negative?: string;
      targetModel?: 'midjourney' | 'flux' | 'stable-diffusion';
    }
  ): { positive: string; negative: string } {
    const elements: string[] = [subject];
    
    if (options.style) elements.push(options.style);
    if (options.composition) elements.push(options.composition);
    if (options.lighting) elements.push(options.lighting);
    if (options.environment) elements.push(options.environment);
    if (options.mood) elements.push(options.mood);
    if (options.camera) elements.push(options.camera);
    
    if (!options.style) {
      elements.push('cinematic, highly detailed, 8k resolution, photorealistic');
    }
    if (!options.lighting) {
      elements.push('dramatic lighting, volumetric lighting, global illumination');
    }
    if (!options.camera) {
      elements.push('shot on ARRI Alexa, 35mm lens, f/2.8, professional photography');
    }
    
    let negativePrompt = options.negative || '';
    if (!negativePrompt) {
      negativePrompt = 'blurry, low quality, distorted, ugly, deformed, bad anatomy, extra limbs, watermark, text, signature, worst quality, jpeg artifacts';
    }
    
    const positive = elements.join(', ');
    
    return { positive, negative: negativePrompt };
  }

  static applyFramework(
    input: string,
    framework: PromptFramework
  ): string {
    switch (framework) {
      case 'rtf':
        return `ROLE: You are an expert professional in the relevant domain.

TASK: ${input}

FORMAT: Provide your response in a clear, structured format. Use headings, bullet points, and numbered lists where appropriate. Ensure the output is actionable and complete.

CONSTRAINTS:
- Be thorough and comprehensive
- Provide specific, actionable advice
- Include examples where helpful
- Verify accuracy of information`;

      case 'chain-of-thought':
        return `${input}

Please work through this step by step:

1. First, understand the requirements and break down the problem
2. Identify the key components and considerations
3. Develop your approach systematically
4. Execute each step with careful reasoning
5. Review and verify your work
6. Provide the final result

Show your thinking process at each stage.`;

      case 'tree-of-thought':
        return `${input}

Explore multiple approaches to solve this:

1. Generate at least 3 different approaches or perspectives
2. For each approach, outline the pros and cons
3. Evaluate which approach is most likely to succeed
4. Execute the best approach in detail
5. Consider if combining approaches would yield better results

Consider trade-offs, edge cases, and alternative viewpoints.`;

      case 'self-reflection':
        return `${input}

After generating your response, perform a self-review:

1. ACCURACY CHECK: Is all information correct? Verify facts and logic.
2. COMPLETENESS CHECK: Did you address all requirements?
3. QUALITY CHECK: Is this the best possible answer?
4. CLARITY CHECK: Is it well-organized and easy to understand?

If you identify issues during review, revise and improve your answer accordingly. Only provide the final, reviewed version.`;

      case 'structured-output':
        return `${input}

Provide your response in valid JSON format with the following schema:

{
  "analysis": "Your detailed analysis",
  "key_points": ["array of key points"],
  "recommendations": ["array of recommendations"],
  "action_items": ["array of action items"],
  "next_steps": ["array of next steps"]
}

Ensure the JSON is properly formatted and contains no trailing commas.`;

      case 'agentic':
        return `You are an autonomous AI agent tasked with: ${input}

As an autonomous agent:
1. UNDERSTAND the goal and success criteria
2. PLAN your approach systematically
3. EXECUTE your plan with precision
4. MONITOR progress and quality
5. ITERATE and improve as needed
6. DELIVER the final result

Make intelligent decisions throughout. If you identify a better approach, adapt accordingly. Provide updates on your progress.`;

      case 'few-shot':
        return `${input}

Here are examples of the expected quality and format:

EXAMPLE 1:
Input: "Write a brief product description"
Output: "Our premium widget transforms your workflow with intuitive design, powerful features, and seamless integration. Built for professionals who demand excellence."

EXAMPLE 2:
Input: "Explain recursion simply"
Output: "Recursion is when a function calls itself to solve smaller instances of the same problem. Like Russian nesting dolls - each doll contains a smaller version of itself."

Now provide your response following the same style and quality level.`;

      case 'zero-shot':
      default:
        return input;
    }
  }

  static getSystemPromptForCategory(category: string): string {
    const prompts: Record<string, string> = {
      general: this.SYSTEM_PROMPTS.enhancer,
      writing: this.SYSTEM_PROMPTS.writingCoach,
      coding: this.SYSTEM_PROMPTS.codingExpert,
      business: this.SYSTEM_PROMPTS.businessStrategist,
    };
    return prompts[category] || this.SYSTEM_PROMPTS.enhancer;
  }

  static getCategoryFromInput(input: string): string {
    const lower = input.toLowerCase();
    if (/code|function|class|api|database|algorithm|bug|debug|refactor|typescript|javascript|python|react|node/i.test(lower)) return 'coding';
    if (/write|essay|blog|story|poem|email|article|creative|content|script|newsletter/i.test(lower)) return 'writing';
    if (/business|marketing|sales|roi|strategy|market|growth|revenue|startup|pitch|investor/i.test(lower)) return 'business';
    return 'general';
  }

  private static async simulateAIResponse(
    input: string,
    style: string,
    targetModel?: AIModel
  ): Promise<string> {
    const isImageModel = targetModel === 'midjourney' || targetModel === 'flux' || targetModel === 'stable-diffusion';
    
    if (isImageModel) {
      return this.generateImagePrompt(input, { targetModel: targetModel as any }).positive;
    }

    const stylePrefixes: Record<string, string> = {
      professional: `You are a seasoned professional with deep expertise in this domain.`,
      expert: `You are a world-renowned expert and thought leader. Your responses demonstrate exceptional depth, precision, and insight.`,
      detailed: `You are thorough and meticulous. Leave no question unanswered, no edge case unexplored.`,
      concise: `You value efficiency. Communicate with maximum clarity in minimum words.`,
      reasoning: `Think carefully and systematically. Show your work. Verify your conclusions.`,
      business: `Focus on outcomes, ROI, and measurable results. Think like an executive.`,
    };

    const prefix = stylePrefixes[style] || stylePrefixes.professional;

    const enhancedTemplate = `${prefix}

TASK: ${input}

REQUIREMENTS:
1. Be specific and concrete - avoid vague statements
2. Structure your response for maximum clarity
3. Include actionable insights and practical advice
4. Consider edge cases and alternative perspectives
5. Provide examples where helpful
6. Verify accuracy of all information

OUTPUT FORMAT:
- Use clear headings and sections
- Bullet points for lists
- Numbered steps for procedures
- Bold text for key concepts

SUCCESS CRITERIA:
- Response is complete and comprehensive
- Information is accurate and verified
- Language is clear and unambiguous
- Actionable next steps are provided
- Quality exceeds user expectations`;

    return enhancedTemplate;
  }
}
