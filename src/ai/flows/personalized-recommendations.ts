'use server';
/**
 * @fileOverview Provides personalized service recommendations based on user preferences and past bookings.
 *
 * - PersonalizedRecommendationsInput: Input type for the personalized recommendations flow.
 * - PersonalizedRecommendationsOutput: Output type for the personalized recommendations flow.
 * - getPersonalizedRecommendations: A function that returns personalized service recommendations.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const PersonalizedRecommendationsInputSchema = z.object({
  userPreferences: z
    .string()
    .describe('User preferences for beauty services, as a comma separated list.'),
  pastBookings: z
    .string()
    .describe('A list of past beauty service bookings, as a comma separated list.'),
  trendingServices: z
    .string()
    .describe('A list of trending services in KSA, as a comma separated list.'),
});
export type PersonalizedRecommendationsInput = z.infer<
  typeof PersonalizedRecommendationsInputSchema
>;

const PersonalizedRecommendationsOutputSchema = z.object({
  recommendations: z
    .string()
    .describe(
      'A comma separated list of personalized service recommendations based on the user preferences, past bookings, and trending services.'
    ),
});
export type PersonalizedRecommendationsOutput = z.infer<
  typeof PersonalizedRecommendationsOutputSchema
>;

export async function getPersonalizedRecommendations(
  input: PersonalizedRecommendationsInput
): Promise<PersonalizedRecommendationsOutput> {
  return personalizedRecommendationsFlow(input);
}

const personalizedRecommendationsPrompt = ai.definePrompt({
  name: 'personalizedRecommendationsPrompt',
  input: {
    schema: z.object({
      userPreferences: z
        .string()
        .describe('User preferences for beauty services, as a comma separated list.'),
      pastBookings: z
        .string()
        .describe('A list of past beauty service bookings, as a comma separated list.'),
      trendingServices: z
        .string()
        .describe('A list of trending services in KSA, as a comma separated list.'),
    }),
  },
  output: {
    schema: z.object({
      recommendations: z
        .string()
        .describe(
          'A comma separated list of personalized service recommendations based on the user preferences, past bookings, and trending services.'
        ),
    }),
  },
  prompt: `You are a beauty service recommendation expert. Based on the user's preferences, past bookings, and trending services in KSA, recommend services that the user might be interested in.

User Preferences: {{{userPreferences}}}
Past Bookings: {{{pastBookings}}}
Trending Services in KSA: {{{trendingServices}}}

Recommendations (as comma separated list):`,
});

const personalizedRecommendationsFlow = ai.defineFlow<
  typeof PersonalizedRecommendationsInputSchema,
  typeof PersonalizedRecommendationsOutputSchema
>(
  {
    name: 'personalizedRecommendationsFlow',
    inputSchema: PersonalizedRecommendationsInputSchema,
    outputSchema: PersonalizedRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await personalizedRecommendationsPrompt(input);
    return output!;
  }
);

