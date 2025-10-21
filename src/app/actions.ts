"use server";

import { moderateDiscussionBoard } from "@/ai/flows/moderate-discussion-board";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const postSchema = z.object({
  post: z.string().min(10, { message: "Post must be at least 10 characters long." }),
});

export type PostState = {
    errors?: {
        post?: string[];
    };
    message?: string | null;
    success: boolean;
};

export async function submitPost(prevState: PostState, formData: FormData): Promise<PostState> {
  const validatedFields = postSchema.safeParse({
    post: formData.get("post"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed. Please check your post.",
      success: false,
    };
  }

  const { post } = validatedFields.data;

  try {
    const moderationResult = await moderateDiscussionBoard({ text: post });

    if (!moderationResult.isAcceptable) {
      return {
        message: `Moderation failed: ${moderationResult.reason}`,
        success: false,
      };
    }

    // In a real app, you would save the post to the database here.
    // e.g., await db.collection('discussions').add({ content: post, createdAt: new Date(), author: '...' })
    
    revalidatePath("/dashboard/discussion");
    return { message: "Post submitted successfully!", success: true };

  } catch (error) {
    console.error("Error during post submission:", error);
    return {
      message: "An unexpected error occurred. Please try again.",
      success: false,
    };
  }
}
