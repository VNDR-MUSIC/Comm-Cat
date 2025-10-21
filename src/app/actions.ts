"use server";

import { moderateDiscussionBoard } from "@/ai/flows/moderate-discussion-board";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore/lite';
import { initializeFirebase } from "@/firebase";
import { getAuth } from "firebase/auth";

const postSchema = z.object({
  post: z.string().min(10, { message: "Your post must be at least 10 characters long to be meaningful." }),
  moduleId: z.string(),
  authorName: z.string(),
  authorAvatar: z.string().optional(),
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
    moduleId: formData.get("moduleId"),
    authorName: formData.get("authorName"),
    authorAvatar: formData.get("authorAvatar"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please check your post content.",
      success: false,
    };
  }

  const { post, moduleId, authorName, authorAvatar } = validatedFields.data;

  try {
    const moderationResult = await moderateDiscussionBoard({ text: post });

    if (!moderationResult.isAcceptable) {
      return {
        message: `Your post was not accepted. Reason: ${moderationResult.reason}. Please revise and resubmit.`,
        success: false,
      };
    }

    // In a real app, you would get the user ID from the session
    const { firestore, auth } = initializeFirebase();
    const user = auth.currentUser;


    if (!user) {
        return {
            message: "You must be logged in to post.",
            success: false,
        };
    }

    const postData = {
        moduleId,
        authorId: user.uid,
        authorName,
        authorAvatar: authorAvatar || `https://picsum.photos/seed/${user.uid}/40/40`,
        isFacilitator: false, // In a real app, this would be based on user roles
        content: post,
        createdAt: serverTimestamp(),
    };

    await addDoc(collection(firestore, "discussionPosts"), postData);
    
    // We are revalidating the path to trigger data refetch on the client.
    revalidatePath(`/dashboard/discussion/${moduleId}`);
    return { message: "Your post has been successfully submitted and is now live!", success: true };

  } catch (error) {
    console.error("Error during post submission:", error);
    return {
      message: "An unexpected server error occurred. Please try again later.",
      success: false,
    };
  }
}

    