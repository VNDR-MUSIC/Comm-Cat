
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AdminCoursesPage() {
    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <header className="mb-8 flex items-center justify-between">
                 <div>
                    <h1 className="text-3xl md:text-4xl font-headline font-bold text-foreground">
                        Course Management
                    </h1>
                    <p className="text-muted-foreground mt-2 text-lg">
                        Create, edit, and organize all curriculum content.
                    </p>
                </div>
                <Button>Add New Course</Button>
            </header>

            <Card>
                <CardHeader>
                    <CardTitle>Coming Soon!</CardTitle>
                    <CardDescription>
                        This section will allow you to manage all aspects of your courses, modules, and lessons.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Full course management functionality is under construction.</p>
                </CardContent>
            </Card>
        </div>
    )
}
