
"use client";

// This component is a client component because it fetches data from Firestore
// on the client-side. This is necessary to avoid build errors caused by
// calling client-side Firebase functions on the server.
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Handshake, Users, BookOpen, Activity, UserCheck } from "lucide-react";
import Link from "next/link";
import { initializeFirebase } from "@/firebase";
import { collection, getDocs, limit, orderBy, query, Timestamp } from "firebase/firestore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";

interface Sponsorship {
    id: string;
    name: string;
    organizationName?: string;
    sponsorshipLevel: string;
    createdAt: Timestamp;
}

export default function RecentSponsorships() {
    const [sponsorships, setSponsorships] = useState<Sponsorship[]>([]);

    useEffect(() => {
        async function getRecentSponsorships() {
            const { firestore } = initializeFirebase();
            const sponsorshipsQuery = query(collection(firestore, 'sponsorships'), orderBy('createdAt', 'desc'), limit(5));

            try {
                const querySnapshot = await getDocs(sponsorshipQuery);
                setSponsorships(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Sponsorship)));
            } catch (error) {
                console.error("Error fetching recent sponsorships:", error);
                return [];
            }
        }
        getRecentSponsorships();
    }, []);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Sponsorships</CardTitle>
                <CardDescription>
                    The latest individuals and organizations to partner with us.
                </CardDescription>
            </CardHeader>
            <CardContent>
                {sponsorships.length > 0 ? (
                    <div className="space-y-4">
                        {sponsorships.map(sponsorship => (
                             <div key={sponsorship.id} className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <Avatar>
                                        <AvatarFallback>{sponsorship.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-bold">{sponsorship.name}</p>
                                        <p className="text-sm text-muted-foreground">{sponsorship.organizationName || `Level: ${sponsorship.sponsorshipLevel}`}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium">${Number(sponsorship.sponsorshipLevel).toLocaleString()}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {formatDistanceToNow(sponsorship.createdAt.toDate(), { addSuffix: true })}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center text-center py-8">
                        <UserCheck className="w-16 h-16 text-muted-foreground mb-4" />
                        <h3 className="text-xl font-bold">No New Sponsorships</h3>
                        <p className="text-muted-foreground mt-2">
                           New applications will appear here.
                        </p>
                    </div>
                )}
                 <div className="mt-6 border-t pt-4">
                    <Button variant="ghost" asChild>
                        <Link href="/admin/sponsorships">View All Sponsorships</Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
