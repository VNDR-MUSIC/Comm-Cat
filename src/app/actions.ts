
"use server";

import { moderateDiscussionBoard } from "@/ai/flows/moderate-discussion-board";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { getFirestore, collection, addDoc, serverTimestamp, doc, updateDoc, arrayUnion, writeBatch } from 'firebase/firestore';
import { initializeFirebase } from "@/firebase";
import { redirect } from "next/navigation";

const postSchema = z.object({
  post: z.string().min(10, { message: "Your post must be at least 10 characters long to be meaningful." }),
  moduleId: z.string(),
  authorName: z.string(),
  authorAvatar: z.string().optional(),
  authorId: z.string(),
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
    authorId: formData.get("authorId"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please check your post content.",
      success: false,
    };
  }

  const { post, moduleId, authorName, authorAvatar, authorId } = validatedFields.data;

  try {
    const moderationResult = await moderateDiscussionBoard({ text: post });

    if (!moderationResult.isAcceptable) {
      return {
        message: `Your post was not accepted. Reason: ${moderationResult.reason}. Please revise and resubmit.`,
        success: false,
      };
    }

    const { firestore } = initializeFirebase();
    
    if (!authorId) {
        return {
            message: "You must be logged in to post.",
            success: false,
        };
    }

    const postData = {
        moduleId,
        authorId: authorId,
        authorName,
        authorAvatar: authorAvatar || `https://picsum.photos/seed/${authorId}/40/40`,
        isFacilitator: false, // In a real app, this would be based on user roles
        content: post,
        createdAt: serverTimestamp(),
    };

    await addDoc(collection(firestore, "discussionPosts"), postData);
    
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

const sponsorshipSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters long.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().optional(),
  sponsorshipType: z.enum(['individual', 'corporate']),
  organizationName: z.string().optional(),
  sponsorshipLevel: z.string().min(1, { message: 'Please select a sponsorship level.' }),
  motivation: z.string().optional(),
}).refine(data => data.sponsorshipType !== 'corporate' || (data.sponsorshipType === 'corporate' && data.organizationName), {
  message: 'Organization name is required for corporate sponsorships.',
  path: ['organizationName'],
});

export type SponsorshipState = {
    errors?: {
        name?: string[];
        email?: string[];
        organizationName?: string[];
        sponsorshipLevel?: string[];
    };
    message?: string | null;
    success: boolean;
};


export async function submitSponsorship(prevState: SponsorshipState, formData: FormData): Promise<SponsorshipState> {
  const validatedFields = sponsorshipSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    sponsorshipType: formData.get('sponsorshipType'),
    organizationName: formData.get('organizationName'),
    sponsorshipLevel: formData.get('sponsorshipLevel'),
    motivation: formData.get('motivation'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Please correct the errors below.',
      success: false,
    };
  }

  const { firestore } = initializeFirebase();
  const { name, email, phone, sponsorshipType, organizationName, sponsorshipLevel, motivation } = validatedFields.data;

  try {
    await addDoc(collection(firestore, 'sponsorships'), {
      name,
      email,
      phone,
      sponsorshipType,
      organizationName,
      sponsorshipLevel,
      motivation,
      createdAt: serverTimestamp(),
    });

    return {
      success: true,
      message: 'Your sponsorship application has been submitted!',
    };
  } catch (error) {
    console.error('Error submitting sponsorship:', error);
    return {
      success: false,
      message: 'An unexpected error occurred. Please try again.',
    };
  }
}

const courseSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters long." }),
  description: z.string().min(20, { message: "Description must be at least 20 characters long." }),
  duration: z.string().min(1, { message: "Please enter a duration for the course." }),
});

export type CourseState = {
  errors?: {
    title?: string[];
    description?: string[];
    duration?: string[];
  };
  message?: string | null;
  success: boolean;
};

export async function createCourse(prevState: any, formData: FormData): Promise<CourseState> {
  const validatedFields = courseSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    duration: formData.get("duration"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      success: false
    };
  }

  const { firestore } = initializeFirebase();
  const { title, description, duration } = validatedFields.data;

  try {
    await addDoc(collection(firestore, "courses"), {
      title,
      description,
      duration,
      modules: [],
    });
  } catch (error) {
    console.error("Error creating course:", error);
    return {
      message: "An unexpected error occurred. Please try again.",
      success: false
    };
  }

  revalidatePath("/admin/courses");
  redirect("/admin/courses");
}


const updateCourseSchema = courseSchema.extend({
  courseId: z.string(),
});

export async function updateCourse(prevState: any, formData: FormData): Promise<CourseState> {
  const validatedFields = updateCourseSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    duration: formData.get("duration"),
    courseId: formData.get("courseId"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }

  const { firestore } = initializeFirebase();
  const { title, description, duration, courseId } = validatedFields.data;

  try {
    const courseDocRef = doc(firestore, "courses", courseId);
    await updateDoc(courseDocRef, {
      title,
      description,
      duration,
    });
  } catch (error) {
    console.error("Error updating course:", error);
    return {
      message: "An unexpected error occurred. Please try again.",
      success: false
    };
  }

  revalidatePath("/admin/courses");
  redirect("/admin/courses");
}

const moduleSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters long." }),
  courseId: z.string(),
});

export type ModuleState = {
  errors?: {
    title?: string[];
  };
  message?: string | null;
  success: boolean;
};

export async function addModuleToCourse(prevState: ModuleState, formData: FormData): Promise<ModuleState> {
  const validatedFields = moduleSchema.safeParse({
    title: formData.get("title"),
    courseId: formData.get("courseId"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }

  const { firestore } = initializeFirebase();
  const { title, courseId } = validatedFields.data;
  
  try {
    const moduleCollectionRef = collection(firestore, `courses/${courseId}/modules`);
    const newModuleDocRef = await addDoc(moduleCollectionRef, {
      title,
      courseId,
      lessons: [],
    });

    const courseDocRef = doc(firestore, "courses", courseId);
    await updateDoc(courseDocRef, {
      modules: arrayUnion(newModuleDocRef.id),
    });

    revalidatePath(`/admin/courses/${courseId}`);
    return { success: true, message: "Module added successfully!" };

  } catch (error) {
    console.error("Error adding module:", error);
    return {
      success: false,
      message: "An unexpected error occurred while adding the module.",
    };
  }
}

const lessonSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters long." }),
  duration: z.string().min(1, { message: "Duration is required." }),
  activityType: z.string().min(3, { message: "Activity type is required." }),
  description: z.string().optional(),
  videoUrl: z.string().optional(),
  courseId: z.string(),
  moduleId: z.string(),
});

export type LessonState = {
    errors?: {
        title?: string[];
        duration?: string[];
        activityType?: string[];
    };
    message?: string | null;
    success: boolean;
};

export async function addLessonToModule(prevState: LessonState, formData: FormData): Promise<LessonState> {
    const validatedFields = lessonSchema.safeParse({
        title: formData.get('title'),
        duration: formData.get('duration'),
        activityType: formData.get('activityType'),
        courseId: formData.get('courseId'),
        moduleId: formData.get('moduleId'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            success: false,
        };
    }
    
    const { firestore } = initializeFirebase();
    const { title, courseId, moduleId, duration, activityType } = validatedFields.data;

    try {
        const lessonCollectionRef = collection(firestore, `courses/${courseId}/modules/${moduleId}/lessons`);
        const newLessonDocRef = await addDoc(lessonCollectionRef, {
            title,
            moduleId,
            duration,
            activityType,
            resourceIds: [],
        });

        const moduleDocRef = doc(firestore, `courses/${courseId}/modules`, moduleId);
        await updateDoc(moduleDocRef, {
            lessons: arrayUnion(newLessonDocRef.id)
        });

        revalidatePath(`/admin/courses/${courseId}/modules/${moduleId}`);
        return { success: true, message: "Lesson added successfully!" };

    } catch (error) {
        console.error("Error adding lesson:", error);
        return {
            success: false,
            message: "An unexpected error occurred while adding the lesson.",
        };
    }
}


const updateLessonSchema = lessonSchema.extend({
  lessonId: z.string(),
  htmlCourseUrl: z.string().optional(),
  resourceIds: z.string().transform((val) => JSON.parse(val)),
});

export async function updateLesson(prevState: LessonState, formData: FormData): Promise<LessonState> {
    const validatedFields = updateLessonSchema.safeParse({
        title: formData.get('title'),
        duration: formData.get('duration'),
        activityType: formData.get('activityType'),
        description: formData.get('description'),
        videoUrl: formData.get('videoUrl'),
        htmlCourseUrl: formData.get('htmlCourseUrl'),
        courseId: formData.get('courseId'),
        moduleId: formData.get('moduleId'),
        lessonId: formData.get('lessonId'),
        resourceIds: formData.get('resourceIds'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            success: false,
            message: 'Validation failed.'
        };
    }
    
    const { firestore } = initializeFirebase();
    const { title, courseId, moduleId, lessonId, duration, activityType, description, videoUrl, htmlCourseUrl, resourceIds } = validatedFields.data;

    try {
        const lessonDocRef = doc(firestore, `courses/${courseId}/modules/${moduleId}/lessons`, lessonId);
        await updateDoc(lessonDocRef, {
            title,
            duration,
            activityType,
            description,
            videoUrl,
            htmlCourseUrl,
            resourceIds,
            updatedAt: serverTimestamp(),
        });

        revalidatePath(`/admin/courses/${courseId}/modules/${moduleId}`);
        return { success: true, message: "Lesson updated successfully!" };

    } catch (error) {
        console.error("Error updating lesson:", error);
        return {
            success: false,
            message: "An unexpected error occurred while updating the lesson.",
        };
    }
}

export async function toggleAdminStatus(userId: string, isAdmin: boolean) {
    const { firestore } = initializeFirebase();
    const userDocRef = doc(firestore, "users", userId);
  
    try {
      await updateDoc(userDocRef, {
        isAdmin: !isAdmin,
      });
      revalidatePath("/admin/users");
      return { success: true, message: "User admin status updated." };
    } catch (error) {
      console.error("Error updating admin status:", error);
      return { success: false, message: "An unexpected error occurred." };
    }
}

const resourceSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters long." }),
  type: z.string().min(3, { message: "Please select a resource type." }),
  url: z.string().url({ message: "Please enter a valid URL." }),
});

export type ResourceState = {
  errors?: {
    title?: string[];
    type?: string[];
    url?: string[];
  };
  message?: string | null;
  success: boolean;
};

export async function createResource(prevState: any, formData: FormData): Promise<ResourceState> {
  const validatedFields = resourceSchema.safeParse({
    title: formData.get("title"),
    type: formData.get("type"),
    url: formData.get("url"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }

  const { firestore } = initializeFirebase();
  const { title, type, url } = validatedFields.data;

  try {
    await addDoc(collection(firestore, "resources"), {
      title,
      type,
      url,
    });
  } catch (error) {
    console.error("Error creating resource:", error);
    return {
      message: "An unexpected error occurred. Please try again.",
      success: false,
    };
  }

  revalidatePath("/admin/resources");
  redirect("/admin/resources");
}

    

    