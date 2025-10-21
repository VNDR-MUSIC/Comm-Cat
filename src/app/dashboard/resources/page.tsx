
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Download, FileText, Link as LinkIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { collection, query, orderBy } from 'firebase/firestore';

interface Resource {
    title: string;
    type: 'Document' | 'Spreadsheet' | 'PDF Guide' | 'External Link';
    url?: string;
}

const getIconForType = (type: string) => {
    switch (type) {
        case 'External Link':
            return <LinkIcon />;
        default:
            return <FileText />;
    }
}

export default function ResourcesPage() {
    const firestore = useFirestore();

    const resourcesQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return query(collection(firestore, 'resources'), orderBy('title', 'asc'));
    }, [firestore]);

    const { data: resources, isLoading } = useCollection<Resource>(resourcesQuery);

    if (isLoading) {
        return (
            <div className="p-4 sm:p-6 lg:p-8 bg-secondary/30 min-h-dvh flex items-center justify-center">
                <Loader2 className="animate-spin h-12 w-12 text-accent" />
            </div>
        )
    }

    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-secondary/30 min-h-dvh">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-headline font-bold text-foreground">
                        Resource Library
                    </h1>
                    <p className="text-muted-foreground mt-2 text-lg">
                        Downloadable materials and helpful links to support your journey.
                    </p>
                </header>

                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Program Materials</CardTitle>
                        <CardDescription>A collection of useful documents, templates, and external resources.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {resources && resources.length > 0 ? (
                            <ul className="space-y-4">
                                {resources.map((resource, index) => (
                                    <li key={index} className="flex justify-between items-center p-4 bg-secondary/50 rounded-md">
                                        <div className="flex items-center gap-4">
                                            <div className="text-accent">{getIconForType(resource.type)}</div>
                                            <div>
                                                <h3 className="font-bold">{resource.title}</h3>
                                                <p className="text-sm text-muted-foreground">{resource.type}</p>
                                            </div>
                                        </div>
                                        <Button variant="outline" asChild>
                                            <a href={resource.url || '#'} target="_blank" rel="noopener noreferrer">
                                            {resource.type === "External Link" ? "Visit Site" : <Download />}
                                            <span className="sr-only">Access {resource.title}</span>
                                            </a>
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                             <div className="text-center py-12 text-muted-foreground">
                                <p>No resources available at the moment.</p>
                                <p>Please check back later.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

    