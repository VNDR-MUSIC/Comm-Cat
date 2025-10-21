"use server";

import { moderateDiscussionBoard } from "@/ai/flows/moderate-discussion-board";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const postSchema = z.object({
  post: z.string().min(10, { message: "Your post must be at least 10 characters long to be meaningful." }),
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
      message: "Please check your post content.",
      success: false,
    };
  }

  const { post } = validatedFields.data;

  try {
    const moderationResult = await moderateDiscussionBoard({ text: post });

    if (!moderationResult.isAcceptable) {
      return {
        message: `Your post was not accepted. Reason: ${moderationResult.reason}. Please revise and resubmit.`,
        success: false,
      };
    }

    // In a real app, you would save the post to the database here.
    // e.g., await db.collection('discussions').add({ content: post, createdAt: new Date(), author: '...' })
    
    // We are revalidating the path to simulate data being refetched.
    revalidatePath("/dashboard/discussion");
    return { message: "Your post has been successfully submitted and is now live!", success: true };

  } catch (error) {
    console.error("Error during post submission:", error);
    return {
      message: "An unexpected server error occurred. Please try again later.",
      success: false,
    };
  }
}
