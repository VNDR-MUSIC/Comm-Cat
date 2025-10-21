"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useRef, useState } from "react";
import { submitPost, type PostState } from "@/app/actions";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, LoaderCircle, ShieldCheck, ShieldAlert } from 'lucide-react';

interface Post {
    id: number;
    author: string;
    avatar: string;
    initials: string;
    isFacilitator: boolean;
    content: string;
    timestamp: string;
}

const initialPosts: Post[] = [
    { id: 1, author: "Marcus Reid", avatar: "https://picsum.photos/seed/facilitator-2/40/40", initials: "MR", isFacilitator: true, content: "Welcome to the Module 3 discussion! Let's talk about community building. What's one small action you can take this week to build a bridge?", timestamp: "2 hours ago" },
    { id: 2, author: "A. Student", avatar: "https://picsum.photos/seed/student1/40/40", initials: "AS", isFacilitator: false, content: "I'm planning to volunteer at the local food bank this weekend. It's a small step, but it's about being present and contributing.", timestamp: "1 hour ago" },
    { id: 3, author: "Dr. Aliyah Khan", avatar: "https://picsum.photos/seed/facilitator-3/40/40", initials: "AK", isFacilitator: true, content: "That's a fantastic start! Presence is powerful. Remember, leadership begins with service.", timestamp: "45 mins ago" },
];

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? <LoaderCircle className="animate-spin" /> : <Send />}
      <span>{pending ? "Submitting..." : "Post Reply"}</span>
    </Button>
  );
}

export function DiscussionBoard() {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  
  const initialState: PostState = { message: null, errors: {}, success: false };
  const [state, dispatch] = useFormState(submitPost, initialState);
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  useEffect(() => {
    if (state.success) {
      toast({
        title: <div className="flex items-center gap-2"><ShieldCheck className="text-green-500" /><span>Post Approved!</span></div>,
        description: state.message,
      });

      const newPostContent = formRef.current?.querySelector<HTMLTextAreaElement>('textarea[name="post"]')?.value;
      if (newPostContent) {
          const newPost: Post = {
              id: Date.now(),
              author: "You",
              avatar: "https://picsum.photos/seed/you/40/40",
              initials: "Y",
              isFacilitator: false,
              content: newPostContent,
              timestamp: "Just now",
          };
          setPosts(prevPosts => [...prevPosts, newPost]);
      }
      formRef.current?.reset();
    } else if (state.message) {
      toast({
        variant: "destructive",
        title: <div className="flex items-center gap-2"><ShieldAlert /><span>Moderation Failed</span></div>,
        description: state.message,
      });
    }
  }, [state, toast]);


  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="flex gap-4">
            <Avatar>
              <AvatarImage src={post.avatar} />
              <AvatarFallback>{post.initials}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-bold">{post.author}</span>
                {post.isFacilitator && <div className="w-2 h-2 rounded-full bg-gradient-to-r from-yellow-400 to-accent" title="Facilitator"></div>}
                <span className="text-xs text-muted-foreground">{post.timestamp}</span>
              </div>
              <p className="mt-1 text-foreground/90">{post.content}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-6 border-t">
        <form ref={formRef} action={dispatch} className="space-y-4">
          <Textarea
            name="post"
            placeholder="Share your thoughts constructively..."
            rows={4}
            className="bg-card"
          />
          {state.errors?.post && (
            <p className="text-sm text-destructive">{state.errors.post[0]}</p>
          )}
          <SubmitButton />
        </form>
      </div>
    </div>
  );
}
