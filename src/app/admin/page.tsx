
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Handshake, Users, BookOpen, Activity } from "lucide-react";
import Link from "next/link";
import { StudentsAtRisk } from "@/components/admin/StudentsAtRisk";

const overviewCards = [
    { title: "Users", icon: <Users />, value: "Manage all student and facilitator accounts.", href: "/admin/users" },
    { title: "Sponsorships", icon: <Handshake />, value: "Review and manage sponsorship applications.", href: "/admin/sponsorships" },
    { title: "Courses", icon: <BookOpen />, value: "Create, edit, and manage all course content.", href: "/admin/courses" },
    { title: "Activity", icon: <Activity />, value: "View platform analytics and user engagement.", href: "#" },
]

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
                 <Card>
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                        <CardDescription>
                            An overview of recent platform events will be displayed here.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Recent activity feed coming soon!</p>
                    </CardContent>
                </Card>
             </div>
        </div>
    )
}
