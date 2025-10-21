"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useRef, useState } from "react";
import { submitPost, type PostState } from "@/app/actions";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, LoaderCircle, ShieldCheck, ShieldAlert, ShieldQuestion } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, where, orderBy, Timestamp } from 'firebase/firestore';
import { formatDistanceToNow } from 'date-fns';
import { useParams } from "next/navigation";
import { Skeleton } from "../ui/skeleton";


export interface DiscussionPost {
    id: string;
    moduleId: string;
    authorId: string;
    authorName: string;
    authorAvatar?: string;
    isFacilitator: boolean;
    content: string;
    createdAt: Timestamp;
}

type ModerationStatus = 'idle' | 'checking' | 'approved' | 'rejected';

function SubmitButton({ status }: { status: ModerationStatus }) {
  const { pending } = useFormStatus();

  const statusMap = {
    idle: { icon: <Send />, text: "Post Reply" },
    checking: { icon: <LoaderCircle className="animate-spin" />, text: "Checking..." },
    approved: { icon: <ShieldCheck />, text: "Post Approved" },
    rejected: { icon: <ShieldAlert />, text: "Post Rejected" },
  };

  const currentStatus = pending ? 'checking' : status;
  const { icon, text } = statusMap[currentStatus];

  return (
    <Button type="submit" disabled={pending || status === 'checking'}>
      {icon}
      <span>{text}</span>
    </Button>
  );
}

export function DiscussionBoard() {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const params = useParams();
  const moduleId = params.moduleId as string;

  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  
  const postsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(
      collection(firestore, 'discussionPosts'), 
      where('moduleId', '==', moduleId), 
      orderBy('createdAt', 'asc')
    );
  }, [firestore, moduleId]);

  const { data: posts, isLoading: postsLoading } = useCollection<DiscussionPost>(postsQuery);

  const initialState: PostState = { message: null, errors: {}, success: false };
  const [state, dispatch] = useFormState(submitPost, initialState);
  const [moderationStatus, setModerationStatus] = useState<ModerationStatus>('idle');

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      setModerationStatus('approved');
      toast({
        title: <div className="flex items-center gap-2"><ShieldCheck className="text-green-500" /><span>Post Approved!</span></div>,
        description: state.message,
      });
      formRef.current?.reset();
    } else if (state.message || state.errors) {
      setModerationStatus('rejected');
      toast({
        variant: "destructive",
        title: <div className="flex items-center gap-2"><ShieldAlert /><span>Post Not Accepted</span></div>,
        description: state.message || state.errors?.post?.[0] || "An error occurred.",
      });
    }

    if(state.success || state.message || state.errors) {
        setTimeout(() => setModerationStatus('idle'), 3000);
    }

  }, [state, toast]);


  if (postsLoading || isUserLoading) {
    return (
        <div className="space-y-4">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
        </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {posts && posts.map((post) => (
          <div key={post.id} className="flex gap-4">
            <Avatar>
              <AvatarImage src={post.authorAvatar} />
              <AvatarFallback>{post.authorName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-bold">{post.authorId === user?.uid ? 'You' : post.authorName}</span>
                {post.isFacilitator && <Badge variant="secondary" className="border-accent text-accent">Facilitator</Badge>}
                <span className="text-xs text-muted-foreground">
                    {post.createdAt ? formatDistanceToNow(post.createdAt.toDate(), { addSuffix: true }) : 'Just now'}
                </span>
              </div>
              <p className="mt-1 text-foreground/90">{post.content}</p>
            </div>
          </div>
        ))}
         {posts && posts.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
                <p>No posts in this discussion yet.</p>
                <p>Be the first to share your thoughts!</p>
            </div>
         )}
      </div>

      <div className="pt-6 border-t">
        <form ref={formRef} action={dispatch} className="space-y-4">
          <input type="hidden" name="moduleId" value={moduleId} />
          <input type="hidden" name="authorName" value={`${user?.displayName || 'Anonymous'}`} />
          <input type="hidden" name="authorAvatar" value={user?.photoURL || ''} />
          <Textarea
            name="post"
            placeholder="Share your thoughts constructively..."
            rows={4}
            className="bg-card"
            onChange={() => moderationStatus !== 'idle' && setModerationStatus('idle')}
            disabled={isUserLoading}
          />
          {state?.errors?.post && !state.message &&(
            <p className="text-sm text-destructive">{state.errors.post[0]}</p>
          )}
           <div className="flex items-center justify-between">
            <SubmitButton status={moderationStatus} />
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ShieldQuestion className="w-4 h-4"/>
                <span>Posts are moderated by AI</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

    