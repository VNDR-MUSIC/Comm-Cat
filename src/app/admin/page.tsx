
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Handshake, Users, BookOpen, Activity, UserCheck } from "lucide-react";
import Link from "next/link";
import { StudentsAtRisk } from "@/components/admin/StudentsAtRisk";
import { initializeFirebase } from "@/firebase";
import { collection, getDocs, limit, orderBy, query, Timestamp } from "firebase/firestore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";

const overviewCards = [
    { title: "Users", icon: <Users />, value: "Manage all student and facilitator accounts.", href: "/admin/users" },
    { title: "Sponsorships", icon: <Handshake />, value: "Review and manage sponsorship applications.", href: "/admin/sponsorships" },
    { title: "Courses", icon: <BookOpen />, value: "Create, edit, and manage all course content.", href: "/admin/courses" },
    { title: "Activity", icon: <Activity />, value: "View platform analytics and user engagement.", href: "#" },
]

interface Sponsorship {
    id: string;
    name: string;
    organizationName?: string;
    sponsorshipLevel: string;
    createdAt: Timestamp;
}

async function getRecentSponsorships() {
    const { firestore } = initializeFirebase();
    const sponsorshipsQuery = query(collection(firestore, 'sponsorships'), orderBy('createdAt', 'desc'), limit(5));

    try {
        const querySnapshot = await getDocs(sponsorshipsQuery);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Sponsorship));
    } catch (error) {
        console.error("Error fetching recent sponsorships:", error);
        return [];
    }
}

async function RecentSponsorships() {
    const sponsorships = await getRecentSponsorships();

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

export default function AdminDashboardPage() {
    return (
        <div className="p-4 sm:p-6 lg:p-8">
             <header className="mb-8">
                <h1 className="text-3xl md:text-4xl font-headline font-bold text-foreground">
                    Admin Dashboard
                </h1>
                <p className="text-muted-foreground mt-2 text-lg">
                    Welcome to the Catalyst Academy control center.
                </p>
            </header>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {overviewCards.map(card => (
                     <Card key={card.title} className="hover:shadow-lg transition-shadow">
                        <Link href={card.href}>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                                <div className="text-accent">{card.icon}</div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">{card.value}</p>
                            </CardContent>
                        </Link>
                    </Card>
                ))}
            </div>

             <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                 <StudentsAtRisk />
                 <RecentSponsorships />
             </div>
        </div>
    )
}
