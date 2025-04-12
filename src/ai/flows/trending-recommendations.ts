'use server';
/**
 * @fileOverview Provides trending service recommendations in KSA.
 *
 * - getTrendingServiceRecommendations - A function that returns trending service recommendations.
 * - TrendingServiceRecommendationsInput - The input type for the getTrendingServiceRecommendations function.
 * - TrendingServiceRecommendationsOutput - The return type for the getTrendingServiceRecommendations function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const TrendingServiceRecommendationsInputSchema = z.object({
  userPreferences: z
    .string()
    .describe(
      'A description of the user preferences, including past bookings if available.'
    ),
});
export type TrendingServiceRecommendationsInput =
  z.infer<typeof TrendingServiceRecommendationsInputSchema>;

const TrendingServiceRecommendationsOutputSchema = z.object({
  recommendations: z.array(
    z.string().describe('A list of recommended services based on trends.')
  ),
});
export type TrendingServiceRecommendationsOutput =
  z.infer<typeof TrendingServiceRecommendationsOutputSchema>;

export async function getTrendingServiceRecommendations(
  input: TrendingServiceRecommendationsInput
): Promise<TrendingServiceRecommendationsOutput> {
  return trendingServiceRecommendationsFlow(input);
}

const trendingServicesPrompt = ai.definePrompt({
  name: 'trendingServicesPrompt',
  input: {
    schema: z.object({
      userPreferences: z
        .string()
        .describe(
          'A description of the user preferences, including past bookings if available.'
        ),
    }),
  },
  output: {
    schema: z.object({
      recommendations: z.array(
        z.string().describe('A list of recommended services based on trends.')
      ),
    }),
  },
  prompt: `You are a beauty trend expert in the Kingdom of Saudi Arabia (KSA).
  Based on the user's preferences and current trending services in KSA, provide personalized service recommendations.

  User Preferences: {{{userPreferences}}}

  Trending Service Recommendations:`,
});

const trendingServiceRecommendationsFlow = ai.defineFlow<
  typeof TrendingServiceRecommendationsInputSchema,
  typeof TrendingServiceRecommendationsOutputSchema
>(
  {
    name: 'trendingServiceRecommendationsFlow',
    inputSchema: TrendingServiceRecommendationsInputSchema,
    outputSchema: TrendingServiceRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await trendingServicesPrompt(input);
    return output!;
  }
);
