import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { PromptEngineer } from '@/lib/prompt-engineer';

const imagePromptSchema = z.object({
  subject: z.string().min(1, 'Subject is required').max(5000, 'Subject too long'),
  style: z.string().optional(),
  composition: z.string().optional(),
  lighting: z.string().optional(),
  environment: z.string().optional(),
  mood: z.string().optional(),
  camera: z.string().optional(),
  negative: z.string().optional(),
  aspectRatio: z.string().default('16:9'),
  targetModel: z.enum(['midjourney', 'flux', 'stable-diffusion']).default('midjourney'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = imagePromptSchema.safeParse(body);
    
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { 
      subject,
      style,
      composition,
      lighting,
      environment,
      mood,
      camera,
      negative,
      aspectRatio,
      targetModel,
    } = parsed.data;

    const result = PromptEngineer.generateImagePrompt(subject, {
      style,
      composition,
      lighting,
      environment,
      mood,
      camera,
      negative,
      targetModel: targetModel as 'midjourney' | 'flux' | 'stable-diffusion',
    });

    const midjourneyPrompt = `${result.positive} --ar ${aspectRatio} --stylize 250 --v 6.0`;
    
    const fluxPrompt = result.positive;
    const stableDiffusionPrompt = {
      positive: result.positive,
      negative: result.negative,
    };

    return NextResponse.json({
      success: true,
      data: {
        subject,
        prompts: {
          raw: result,
          midjourney: midjourneyPrompt,
          flux: fluxPrompt,
          stableDiffusion: stableDiffusionPrompt,
        },
        parameters: {
          style,
          composition,
          lighting,
          environment,
          mood,
          camera,
          aspectRatio,
          targetModel,
        },
      },
    });
  } catch (error) {
    console.error('Image prompt generation error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to generate image prompt',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
