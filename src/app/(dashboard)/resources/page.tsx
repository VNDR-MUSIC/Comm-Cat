import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Download, FileText, Link } from "lucide-react";
import { Button } from "@/components/ui/button";

const resources = [
    { title: "Resume Building Template", type: "Document", icon: <FileText /> },
    { title: "Financial Budgeting Spreadsheet", type: "Spreadsheet", icon: <FileText /> },
    { title: "Community Advocacy Toolkit", type: "PDF Guide", icon: <FileText /> },
    { title: "Small Business Administration (SBA)", type: "External Link", icon: <Link /> },
    { title: "National Reentry Resource Center", type: "External Link", icon: <Link /> },
];

export default function ResourcesPage() {
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
                        <ul className="space-y-4">
                            {resources.map((resource, index) => (
                                <li key={index} className="flex justify-between items-center p-4 bg-secondary/50 rounded-md">
                                    <div className="flex items-center gap-4">
                                        <div className="text-accent">{resource.icon}</div>
                                        <div>
                                            <h3 className="font-bold">{resource.title}</h3>
                                            <p className="text-sm text-muted-foreground">{resource.type}</p>
                                        </div>
                                    </div>
                                    <Button variant="outline">
                                        {resource.type === "External Link" ? "Visit Site" : <Download />}
                                        <span className="sr-only">Download {resource.title}</span>
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
