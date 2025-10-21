
'use client';

import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import type { Note } from './NoteList';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


interface NoteEditorProps {
  note: Note;
  onSave: (noteId: string, title: string, content: string) => void;
  onDelete: (noteId: string) => void;
}

export function NoteEditor({ note, onSave, onDelete }: NoteEditorProps) {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const { toast } = useToast();

  useEffect(() => {
    // Reset state when the note prop changes
    setTitle(note.title);
    setContent(note.content);
  }, [note]);
  
  const handleSave = useCallback(onSave, [onSave]);

  useEffect(() => {
    const handler = setTimeout(() => {
        if (title !== note.title || content !== note.content) {
            handleSave(note.id, title, content);
             toast({
                title: "Note Autosaved",
                description: `"${title || 'Untitled Note'}" has been saved.`,
            });
        }
    }, 1500);

    return () => {
      clearTimeout(handler);
    };
  }, [title, content, note, handleSave, toast]);

  
  const handleDelete = () => {
    onDelete(note.id);
     toast({
        variant: "destructive",
        title: "Note Deleted",
        description: `"${title || 'Untitled Note'}" has been moved to trash.`,
    });
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b flex items-center justify-between gap-4">
        <Input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Note Title"
          className="text-2xl font-bold border-none shadow-none focus-visible:ring-0"
        />
        <div className="flex gap-2">
             <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="icon">
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your note.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
      </div>
      <Textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Start writing your note here..."
        className="flex-1 w-full rounded-none border-none resize-none focus-visible:ring-0 text-base p-6"
      />
    </div>
  );
}
