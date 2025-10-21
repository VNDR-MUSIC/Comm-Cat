'use client';

import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatDistanceToNow } from 'date-fns';

export interface Note {
  id: string;
  notebookId: string;
  title: string;
  content: string;
  createdAt: Date;
}

interface NoteListProps {
  notes: Note[];
  selectedNote: Note | null;
  onSelectNote: (note: Note) => void;
}

export function NoteList({ notes, selectedNote, onSelectNote }: NoteListProps) {
  if (notes.length === 0) {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-4">
            <p>No notes in this notebook yet.</p>
            <p className="text-sm">Click "New Note" to get started.</p>
        </div>
    )
  }

  return (
    <ScrollArea className="flex-1">
      <div className="p-2">
        {notes.map(note => (
          <button
            key={note.id}
            onClick={() => onSelectNote(note)}
            className={cn(
              'w-full text-left p-3 rounded-md transition-colors border-b border-border',
              selectedNote?.id === note.id
                ? 'bg-accent/20'
                : 'hover:bg-accent/10'
            )}
          >
            <h3 className="font-bold truncate">{note.title || 'Untitled Note'}</h3>
            <p className="text-sm text-muted-foreground truncate">
              {note.content.substring(0, 80) || 'No additional content'}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              {formatDistanceToNow(note.createdAt, { addSuffix: true })}
            </p>
          </button>
        ))}
      </div>
    </ScrollArea>
  );
}
