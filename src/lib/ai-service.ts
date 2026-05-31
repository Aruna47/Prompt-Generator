import OpenAI from 'openai';
import { AIModel } from '@/lib/types';
import { generateId } from '@/lib/utils';

export class AIService {
  private openrouter: OpenAI | null = null;
  private groq: OpenAI | null = null;
  private gemini: OpenAI | null = null;

  constructor() {
    const openrouterKey = process.env.OPENROUTER_API_KEY || process.env.OPENROUTER_API_KEY_2;
    if (openrouterKey) {
      this.openrouter = new OpenAI({
        baseURL: 'https://openrouter.ai/api/v1',
        apiKey: openrouterKey,
      });
    }

    const groqKey = process.env.GROQ_API_KEY;
    if (groqKey) {
      this.groq = new OpenAI({
        baseURL: 'https://api.groq.com/openai/v1',
        apiKey: groqKey,
      });
    }

    const geminiKey = process.env.GEMINI_API_KEY;
    if (geminiKey) {
      this.gemini = new OpenAI({
        baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai/',
        apiKey: geminiKey,
      });
    }
  }

  async generateEnhancedPrompt(
    systemPrompt: string,
    userInput: string,
    options?: {
      model?: string;
      temperature?: number;
      maxTokens?: number;
    }
  ): Promise<string> {
    const client = this.getBestClient();
    const model = options?.model || this.getDefaultModel();

    if (!client) {
      return this.generateFallbackEnhancedPrompt(systemPrompt, userInput);
    }

    try {
      const response = await client.chat.completions.create({
        model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userInput },
        ],
        temperature: options?.temperature ?? 0.7,
        max_tokens: options?.maxTokens ?? 4000,
      });

      return response.choices[0]?.message?.content || this.generateFallbackEnhancedPrompt(systemPrompt, userInput);
    } catch (error) {
      console.error('AI generation error:', error);
      return this.generateFallbackEnhancedPrompt(systemPrompt, userInput);
    }
  }

  async generateStream(
    systemPrompt: string,
    userInput: string,
    onChunk: (chunk: string) => void,
    options?: {
      model?: string;
      temperature?: number;
    }
  ): Promise<void> {
    const client = this.getBestClient();
    const model = options?.model || this.getDefaultModel();

    if (!client) {
      const fallback = this.generateFallbackEnhancedPrompt(systemPrompt, userInput);
      for (let i = 0; i < fallback.length; i += 3) {
        onChunk(fallback.slice(i, i + 3));
        await new Promise(r => setTimeout(r, 20));
      }
      return;
    }

    try {
      const stream = await client.chat.completions.create({
        model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userInput },
        ],
        temperature: options?.temperature ?? 0.7,
        stream: true,
      });

      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || '';
        if (content) {
          onChunk(content);
        }
      }
    } catch (error) {
      console.error('Streaming error:', error);
      const fallback = this.generateFallbackEnhancedPrompt(systemPrompt, userInput);
      for (let i = 0; i < fallback.length; i += 3) {
        onChunk(fallback.slice(i, i + 3));
        await new Promise(r => setTimeout(r, 20));
      }
    }
  }

  private getBestClient(): OpenAI | null {
    if (this.groq) return this.groq;
    if (this.openrouter) return this.openrouter;
    if (this.gemini) return this.gemini;
    return null;
  }

  private getDefaultModel(): string {
    if (this.groq) return 'llama3-70b-8192';
    if (this.openrouter) return 'meta-llama/llama-3-70b-instruct';
    if (this.gemini) return 'gemini-pro';
    return 'gpt-3.5-turbo';
  }

  private generateFallbackEnhancedPrompt(systemPrompt: string, userInput: string): string {
    const isImage = /image|picture|photo|art|illustration|design|midjourney|flux|stable/i.test(userInput);
    
    if (isImage) {
      return this.generateImagePromptFallback(userInput);
    }

    return `ROLE: You are an elite expert professional with deep domain expertise.

TASK: ${userInput}

REQUIREMENTS:
1. Be specific, concrete, and actionable
2. Structure your response for maximum clarity
3. Include practical examples and real-world applications
4. Consider edge cases and alternative perspectives
5. Verify all information for accuracy
6. Provide clear next steps

OUTPUT STRUCTURE:
- Executive Summary (brief overview)
- Detailed Analysis
- Key Insights
- Actionable Recommendations
- Implementation Steps
- Success Metrics

SUCCESS CRITERIA:
- Response is complete and comprehensive
- Information is accurate and verified
- Language is clear and unambiguous
- Actionable next steps are provided
- Quality exceeds basic expectations

THINKING PROCESS:
Work through this systematically:
1. First, understand the full scope of the request
2. Break down the problem into components
3. Analyze each component thoroughly
4. Synthesize findings into coherent recommendations
5. Verify logic and accuracy
6. Structure for maximum clarity and impact`;
  }

  private generateImagePromptFallback(input: string): string {
    return `${input}, cinematic lighting, volumetric fog, dramatic shadows, 8k resolution, ultra detailed, photorealistic, shot on ARRI Alexa, 35mm lens, f/2.8, professional photography, color grading, depth of field, bokeh, global illumination, ray tracing, high dynamic range`;
  }
}

export const aiService = new AIService();
