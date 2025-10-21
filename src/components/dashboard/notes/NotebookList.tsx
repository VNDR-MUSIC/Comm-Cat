'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { PlusCircle, Book } from 'lucide-react';
import { CreateNotebookDialog } from './CreateNotebookDialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Timestamp } from 'firebase/firestore';


export interface Notebook {
  id: string;
  name: string;
  createdAt: Timestamp;
  userId: string;
}

interface NotebookListProps {
  notebooks: Notebook[];
  selectedNotebook: Notebook | null;
  onSelectNotebook: (notebook: Notebook) => void;
  onCreateNotebook: (name: string) => void;
}

export function NotebookList({
  notebooks,
  selectedNotebook,
  onSelectNotebook,
  onCreateNotebook,
}: NotebookListProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  return (
    <div className="flex flex-col h-full bg-secondary/30">
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="text-xl font-bold font-headline">Notebooks</h2>
        <Button size="sm" variant="ghost" onClick={() => setIsDialogOpen(true)}>
          <PlusCircle className="h-5 w-5" />
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {notebooks.map(notebook => (
            <button
              key={notebook.id}
              onClick={() => onSelectNotebook(notebook)}
              className={cn(
                'w-full text-left p-3 rounded-md flex items-center gap-3 transition-colors',
                selectedNotebook?.id === notebook.id
                  ? 'bg-accent/20 text-accent-foreground font-semibold'
                  : 'hover:bg-accent/10'
              )}
            >
              <Book className="h-4 w-4 shrink-0"/>
              <span className="truncate">{notebook.name}</span>
            </button>
          ))}
        </div>
      </ScrollArea>
      <CreateNotebookDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onCreate={onCreateNotebook}
      />
    </div>
  );
}

    