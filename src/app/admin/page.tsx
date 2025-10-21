
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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

            <Card>
                <CardHeader>
                    <CardTitle>Welcome, Admin!</CardTitle>
                    <CardDescription>
                        This is the starting point for your administrative dashboard. From here, you will be able to manage users, view applications, and oversee the platform.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p>More features coming soon!</p>
                </CardContent>
            </Card>
        </div>
    )
}

    