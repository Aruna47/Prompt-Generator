import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { PromptEngineer } from '@/lib/prompt-engineer';
import { AIModel, PromptFramework } from '@/lib/types';

const enhanceSchema = z.object({
  prompt: z.string().min(1, 'Prompt is required').max(10000, 'Prompt too long'),
  style: z.enum(['professional', 'expert', 'detailed', 'concise', 'reasoning', 'business']).default('professional'),
  targetModel: z.string().optional(),
  framework: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = enhanceSchema.safeParse(body);
    
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { prompt, style, targetModel, framework } = parsed.data;

    const validStyles = ['professional', 'expert', 'detailed', 'concise', 'reasoning', 'business'] as const;
    const resolvedStyle = validStyles.includes(style) ? style as 'professional' | 'expert' | 'detailed' | 'concise' | 'reasoning' | 'business' : 'professional';

    const result = await PromptEngineer.enhancePrompt(prompt, {
      style: resolvedStyle,
      targetModel: targetModel as AIModel | undefined,
      framework: framework as PromptFramework | undefined,
    });

    return NextResponse.json({
      success: true,
      data: {
        original: prompt,
        enhanced: result.enhanced,
        score: result.score,
        prediction: result.prediction,
      },
    });
  } catch (error) {
    console.error('Prompt enhancement error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to enhance prompt',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'PromptForge AI Enhancement API',
    endpoints: {
      POST: {
        '/api/enhance': 'Enhance a prompt with AI',
        '/api/analyze': 'Analyze prompt quality',
        '/api/image-prompt': 'Generate image prompts',
      },
    },
  });
}
