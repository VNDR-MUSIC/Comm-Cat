'use client';

import { useState } from 'react';
import { useUser, useFirestore, useCollection, useMemoFirebase, addDocumentNonBlocking, updateDocumentNonBlocking, deleteDocumentNonBlocking } from '@/firebase';
import { collection, doc, serverTimestamp, query, where, orderBy } from 'firebase/firestore';

import { NotebookList, type Notebook } from '@/components/dashboard/notes/NotebookList';
import { NoteList, type Note } from '@/components/dashboard/notes/NoteList';
import { NoteEditor } from '@/components/dashboard/notes/NoteEditor';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export default function NotesPage() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  const [selectedNotebook, setSelectedNotebook] = useState<Notebook | null>(null);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  // Memoize Firestore queries
  const notebooksQuery = useMemoFirebase(() => {
    if (!firestore || !user?.uid) return null;
    return query(collection(firestore, `users/${user.uid}/notebooks`), orderBy('createdAt', 'desc'));
  }, [firestore, user?.uid]);

  const notesQuery = useMemoFirebase(() => {
    if (!firestore || !user?.uid) return null;
    return query(collection(firestore, `users/${user.uid}/notes`), orderBy('createdAt', 'desc'));
  }, [firestore, user?.uid]);
  
  // Fetch data using hooks
  const { data: notebooks, isLoading: notebooksLoading } = useCollection<Notebook>(notebooksQuery);
  const { data: notes, isLoading: notesLoading } = useCollection<Note>(notesQuery);

  const handleSelectNotebook = (notebook: Notebook) => {
    setSelectedNotebook(notebook);
    const firstNoteInNotebook = notes?.find(n => n.notebookId === notebook.id) || null;
    setSelectedNote(firstNoteInNotebook);
  };
  
  const handleSelectNote = (note: Note) => {
    setSelectedNote(note);
  };

  const handleCreateNotebook = (name: string) => {
    if (!firestore || !user?.uid) return;
    const newNotebook = {
      name,
      userId: user.uid,
      createdAt: serverTimestamp(),
    };
    const collectionRef = collection(firestore, `users/${user.uid}/notebooks`);
    addDocumentNonBlocking(collectionRef, newNotebook);
    // Optimistic UI update could be complex, so we'll rely on the real-time listener to update the UI
  };

  const handleCreateNote = () => {
    if (!firestore || !user?.uid || !selectedNotebook) return;
    const newNote = {
      notebookId: selectedNotebook.id,
      userId: user.uid,
      title: 'Untitled Note',
      content: '',
      createdAt: serverTimestamp(),
    };
    const collectionRef = collection(firestore, `users/${user.uid}/notes`);
    addDocumentNonBlocking(collectionRef, newNote).then(docRef => {
        if(docRef) {
            // We can't know the ID until it's created, so we can't select it optimistically.
            // A more advanced implementation might use the returned docRef.id
        }
    });
  };
  
  const handleSaveNote = (noteId: string, title: string, content: string) => {
    if (!firestore || !user?.uid) return;
    const docRef = doc(firestore, `users/${user.uid}/notes`, noteId);
    updateDocumentNonBlocking(docRef, { title, content });
  };

  const handleDeleteNote = (noteId: string) => {
    if (!firestore || !user?.uid) return;
    const docRef = doc(firestore, `users/${user.uid}/notes`, noteId);
    deleteDocumentNonBlocking(docRef);

    if (selectedNote?.id === noteId) {
        const notesInCurrentNotebook = notes?.filter(n => n.notebookId === selectedNotebook?.id && n.id !== noteId);
        setSelectedNote(notesInCurrentNotebook?.[0] || null);
    }
  };

  const filteredNotes = selectedNotebook && notes ? notes.filter(note => note.notebookId === selectedNotebook.id) : [];

  if (isUserLoading || notebooksLoading || notesLoading) {
    return <NotesPageSkeleton />;
  }

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
                    notebooks={notebooks || []}
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

const NotesPageSkeleton = () => (
    <div className="h-dvh flex flex-col">
        <header className="p-4 sm:p-6 lg:p-8 border-b">
            <Skeleton className="h-10 w-1/2" />
            <Skeleton className="h-6 w-3/4 mt-2" />
        </header>
        <ResizablePanelGroup direction="horizontal" className="flex-1 overflow-hidden">
            <ResizablePanel defaultSize={25} minSize={20} maxSize={35} className="min-w-[250px] p-2 space-y-2">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={30} minSize={25} maxSize={40} className="min-w-[300px] p-2 space-y-2">
                 <Skeleton className="h-12 w-full" />
                 <Skeleton className="h-20 w-full" />
                 <Skeleton className="h-20 w-full" />
                 <Skeleton className="h-20 w-full" />
            </ResizablePanel>
             <ResizableHandle withHandle />
            <ResizablePanel defaultSize={45} minSize={30}>
                <div className="p-4 space-y-4">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-full w-full aspect-video" />
                </div>
            </ResizablePanel>
        </ResizablePanelGroup>
    </div>
)
