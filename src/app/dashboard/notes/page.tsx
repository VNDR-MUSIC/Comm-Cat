'use client';

import { useState } from 'react';
import { NotebookList, type Notebook } from '@/components/dashboard/notes/NotebookList';
import { NoteList, type Note } from '@/components/dashboard/notes/NoteList';
import { NoteEditor } from '@/components/dashboard/notes/NoteEditor';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Static data for notebooks and notes
const initialNotebooks: Notebook[] = [
  { id: 'nb1', name: 'Module 1: Foundations', createdAt: new Date() },
  { id: 'nb2', name: 'Module 2: Financial Literacy', createdAt: new Date() },
  { id: 'nb3', name: 'Personal Journal', createdAt: new Date() },
];

const initialNotes: Note[] = [
  { id: 'n1', notebookId: 'nb1', title: 'Reclaiming My Narrative', content: 'My story is one of resilience...', createdAt: new Date(Date.now() - 3600000) },
  { id: 'n2', notebookId: 'nb1', title: 'Vision Statement Draft', content: 'My vision for the future is...', createdAt: new Date() },
  { id: 'n3', notebookId: 'nb2', title: 'Budgeting Ideas', content: 'Track all expenses for one month.', createdAt: new Date() },
];

export default function NotesPage() {
  const [notebooks, setNotebooks] = useState<Notebook[]>(initialNotebooks);
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [selectedNotebook, setSelectedNotebook] = useState<Notebook | null>(notebooks[0] || null);
  const [selectedNote, setSelectedNote] = useState<Note | null>(notes.find(n => n.notebookId === (notebooks[0]?.id)) || null);

  const handleSelectNotebook = (notebook: Notebook) => {
    setSelectedNotebook(notebook);
    const firstNoteInNotebook = notes.find(n => n.notebookId === notebook.id) || null;
    setSelectedNote(firstNoteInNotebook);
  };
  
  const handleSelectNote = (note: Note) => {
    setSelectedNote(note);
  };

  const handleCreateNotebook = (name: string) => {
    const newNotebook: Notebook = {
      id: `nb${Date.now()}`,
      name,
      createdAt: new Date(),
    };
    setNotebooks(prev => [...prev, newNotebook]);
    setSelectedNotebook(newNotebook);
    setSelectedNote(null);
  };

  const handleCreateNote = () => {
      if (!selectedNotebook) return;
      const newNote: Note = {
          id: `n${Date.now()}`,
          notebookId: selectedNotebook.id,
          title: 'Untitled Note',
          content: '',
          createdAt: new Date(),
      };
      setNotes(prev => [newNote, ...prev]);
      setSelectedNote(newNote);
  };
  
  const handleSaveNote = (noteId: string, title: string, content: string) => {
    setNotes(prev =>
      prev.map(n => (n.id === noteId ? { ...n, title, content } : n))
    );
  };

  const handleDeleteNote = (noteId: string) => {
    setNotes(prev => prev.filter(n => n.id !== noteId));
    if (selectedNote?.id === noteId) {
        const notesInCurrentNotebook = notes.filter(n => n.notebookId === selectedNotebook?.id && n.id !== noteId);
        setSelectedNote(notesInCurrentNotebook[0] || null);
    }
  };

  const filteredNotes = selectedNotebook ? notes.filter(note => note.notebookId === selectedNotebook.id).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()) : [];

  return (
    <div className="h-dvh flex flex-col">
        <header className="p-4 sm:p-6 lg:p-8 border-b">
            <h1 className="text-3xl md:text-4xl font-headline font-bold text-foreground">
                My Notes
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">
                Your personal space to reflect, plan, and grow.
            </p>
        </header>
        <ResizablePanelGroup direction="horizontal" className="flex-1 overflow-hidden">
            <ResizablePanel defaultSize={25} minSize={20} maxSize={35} className="min-w-[250px]">
                <NotebookList
                    notebooks={notebooks}
                    selectedNotebook={selectedNotebook}
                    onSelectNotebook={handleSelectNotebook}
                    onCreateNotebook={handleCreateNotebook}
                />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={30} minSize={25} maxSize={40} className="min-w-[300px]">
                 <div className="flex flex-col h-full">
                    {selectedNotebook ? (
                        <>
                         <div className="p-4 border-b flex items-center justify-between">
                            <h2 className="text-xl font-bold font-headline">{selectedNotebook.name}</h2>
                             <Button size="sm" onClick={handleCreateNote}>
                                <PlusCircle className="mr-2 h-4 w-4" /> New Note
                            </Button>
                        </div>
                        <NoteList
                            notes={filteredNotes}
                            selectedNote={selectedNote}
                            onSelectNote={handleSelectNote}
                        />
                        </>
                    ) : (
                         <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-4">
                            <p>Select a notebook to see your notes, or create a new one.</p>
                        </div>
                    )}
                 </div>
            </ResizablePanel>
             <ResizableHandle withHandle />
            <ResizablePanel defaultSize={45} minSize={30}>
                <div className="h-full">
                    {selectedNote ? (
                        <NoteEditor
                            key={selectedNote.id}
                            note={selectedNote}
                            onSave={handleSaveNote}
                            onDelete={handleDeleteNote}
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-4">
                            <p>{selectedNotebook ? "Select a note to start editing, or create a new one." : ""}</p>
                        </div>
                    )}
                </div>
            </ResizablePanel>
        </ResizablePanelGroup>
    </div>
  );
}
