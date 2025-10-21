'use server';

/**
 * @fileOverview An AI agent for moderating discussion board content for positivity and respect.
 *
 * - moderateDiscussionBoard - A function that moderates discussion board content.
 * - ModerateDiscussionBoardInput - The input type for the moderateDiscussionBoard function.
 * - ModerateDiscussionBoardOutput - The return type for the moderateDiscussionBoard function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ModerateDiscussionBoardInputSchema = z.object({
  text: z.string().describe('The text content to be moderated.'),
});
export type ModerateDiscussionBoardInput = z.infer<typeof ModerateDiscussionBoardInputSchema>;

const ModerateDiscussionBoardOutputSchema = z.object({
  isAcceptable: z.boolean().describe('Whether the content is acceptable based on the moderation criteria.'),
  reason: z.string().describe('The reason for the moderation decision, if applicable.'),
});
export type ModerateDiscussionBoardOutput = z.infer<typeof ModerateDiscussionBoardOutputSchema>;

export async function moderateDiscussionBoard(input: ModerateDiscussionBoardInput): Promise<ModerateDiscussionBoardOutput> {
  return moderateDiscussionBoardFlow(input);
}

const prompt = ai.definePrompt({
  name: 'moderateDiscussionBoardPrompt',
  input: {schema: ModerateDiscussionBoardInputSchema},
  output: {schema: ModerateDiscussionBoardOutputSchema},
  prompt: `You are an AI moderator responsible for ensuring a positive and respectful discussion board environment.

  Analyze the following text and determine if it meets the criteria for acceptability. The criteria are:
  - The text is positive and constructive.
  - The text is respectful and does not contain any personal attacks, harassment, or offensive language.
  - The text is relevant to the discussion topic.

  Based on your analysis, set the isAcceptable field to true if the text meets the criteria, and false if it does not. If the text is not acceptable, provide a reason in the reason field.

  Text: {{{text}}}
  `,
  config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_LOW_AND_ABOVE',
      },
    ],
  },
});

const moderateDiscussionBoardFlow = ai.defineFlow(
  {
    name: 'moderateDiscussionBoardFlow',
    inputSchema: ModerateDiscussionBoardInputSchema,
    outputSchema: ModerateDiscussionBoardOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
