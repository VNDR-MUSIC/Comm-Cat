import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpenCheck } from "lucide-react";

export default function CoursesPage() {
    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-secondary/30 min-h-dvh">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-headline font-bold text-foreground">
                        My Courses
                    </h1>
                    <p className="text-muted-foreground mt-2 text-lg">
                        Your learning journey continues here.
                    </p>
                </header>

                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Enrolled Courses</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col items-center justify-center text-center py-12 border-2 border-dashed rounded-lg">
                            <BookOpenCheck className="w-16 h-16 text-muted-foreground mb-4" />
                            <h3 className="text-xl font-bold">No Courses Available</h3>
                            <p className="text-muted-foreground mt-2">
                                Your enrolled courses will appear here once you begin the program.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
