import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { PromptEngineer } from '@/lib/prompt-engineer';

const analyzeSchema = z.object({
  prompt: z.string().min(1, 'Prompt is required').max(10000, 'Prompt too long'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = analyzeSchema.safeParse(body);
    
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { prompt } = parsed.data;

    const score = PromptEngineer.analyzePrompt(prompt);
    const prediction = PromptEngineer.predictOutput(prompt, score);

    const suggestions: string[] = [];
    
    if (score.clarity < 50) {
      suggestions.push('Improve clarity: Be more explicit about what you want. Avoid ambiguous language.');
    }
    if (score.context < 40) {
      suggestions.push('Add more context: Provide background information, examples, or relevant details.');
    }
    if (score.specificity < 40) {
      suggestions.push('Increase specificity: Define exact requirements, constraints, and success criteria.');
    }
    if (score.reasoning < 30) {
      suggestions.push('Add reasoning guidance: Use Chain of Thought or ask the AI to show its work.');
    }
    if (score.outputControl < 40) {
      suggestions.push('Define output format: Specify JSON structure, sections, or exact format needed.');
    }
    if (score.hallucinationRisk > 60) {
      suggestions.push('Reduce hallucination risk: Add constraints, require citations, or ask for verification.');
    }

    if (suggestions.length === 0) {
      suggestions.push('Your prompt is well-structured! Consider adding examples for even better results.');
    }

    return NextResponse.json({
      success: true,
      data: {
        score,
        prediction,
        suggestions,
        strengths: [
          ...(score.clarity >= 70 ? ['Clear and unambiguous language'] : []),
          ...(score.context >= 60 ? ['Good context provided'] : []),
          ...(score.specificity >= 60 ? ['Specific requirements defined'] : []),
          ...(score.reasoning >= 50 ? ['Reasoning guidance included'] : []),
          ...(score.outputControl >= 60 ? ['Output format well-defined'] : []),
          ...(score.hallucinationRisk <= 30 ? ['Low hallucination risk'] : []),
        ],
        weaknesses: [
          ...(score.clarity < 50 ? ['Clarity needs improvement'] : []),
          ...(score.context < 40 ? ['Insufficient context'] : []),
          ...(score.specificity < 40 ? ['Lack of specificity'] : []),
          ...(score.reasoning < 30 ? ['No reasoning guidance'] : []),
          ...(score.outputControl < 40 ? ['Output format undefined'] : []),
          ...(score.hallucinationRisk > 60 ? ['High hallucination risk'] : []),
        ],
        letterGrade: score.overall >= 90 ? 'A+' :
                      score.overall >= 80 ? 'A' :
                      score.overall >= 70 ? 'B' :
                      score.overall >= 60 ? 'C' :
                      score.overall >= 50 ? 'D' : 'F',
      },
    });
  } catch (error) {
    console.error('Prompt analysis error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to analyze prompt',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
