
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import GlowingButton from "@/components/shared/GlowingButton";
import { initializeFirebase, getSdks } from '@/firebase';
import { collection, getDocs, query, where, CollectionReference } from 'firebase/firestore';
import { headers } from 'next/headers';
import { getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { User } from 'firebase/auth';
import { ProgressClientPage } from "./ProgressClientPage";

interface Lesson {
    id: string;
}

interface Module {
    id: string;
    title: string;
    lessons: Lesson[];
}

interface Course {
    id: string;
    modules: Module[];
}

interface UserLessonProgress {
    lessonId: string;
}

// This function needs to be defined to be used in a Server Component context
// It cannot rely on the client-side `useUser` hook.
async function getCurrentUser(): Promise<User | null> {
    const auth = getAuth(getApp());
    // This is a simplified way; in a real app with server-side rendering,
    // you'd typically handle auth state via cookies or session management.
    // For this context, we assume auth state can be determined.
    return auth.currentUser;
}


async function getCourseStructure(): Promise<Course[]> {
    const { firestore } = initializeFirebase();
    const coursesCol = collection(firestore, 'courses') as CollectionReference<any>;
    const courseSnapshot = await getDocs(coursesCol);
    
    const courses: Course[] = [];

    for (const courseDoc of courseSnapshot.docs) {
        const courseData = { id: courseDoc.id, modules: [] } as Course;
        
        const modulesCol = collection(firestore, `courses/${courseDoc.id}/modules`) as CollectionReference<any>;
        const modulesSnapshot = await getDocs(modulesCol);

        for (const moduleDoc of modulesSnapshot.docs) {
            const moduleData = { id: moduleDoc.id, title: moduleDoc.data().title, lessons: [] } as Module;

            const lessonsCol = collection(firestore, `courses/${courseDoc.id}/modules/${moduleDoc.id}/lessons`) as CollectionReference<any>;
            const lessonsSnapshot = await getDocs(lessonsCol);
            
            lessonsSnapshot.forEach(lessonDoc => {
                moduleData.lessons.push({ id: lessonDoc.id });
            });
            courseData.modules.push(moduleData);
        }
        courses.push(courseData);
    }
    return courses;
}


export default async function ProgressPage() {
    // This is a simplified auth check for a server component.
    // In a real app, you'd have a more robust session management system.
    const headersList = headers();
    const userCookie = headersList.get('cookie'); // Placeholder for getting user session

    // For the purpose of this component, let's assume we can get the user ID
    // A more robust solution would involve a proper server-side auth library
    // For now, we cannot reliably get the user without a request context.
    // We will pass the data fetching down to a client component where user is available.

    const courseStructure = await getCourseStructure();

    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-secondary/30 min-h-dvh">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-headline font-bold text-foreground">
                        My Progress
                    </h1>
                    <p className="text-muted-foreground mt-2 text-lg">
                        Track your achievements and view your earned credentials.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <Card>
                            <CardHeader>
                                <CardTitle className="font-headline">Certificate of Completion</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="relative p-1 bg-gradient-to-r from-yellow-400 via-blue-500 to-cyan-400 rounded-lg">
                                    <div className="bg-background rounded-lg p-8 text-center aspect-[4/3] flex flex-col justify-center items-center">
                                        <h2 className="text-2xl font-headline font-bold animated-gradient-text">Certificate of Completion</h2>
                                        <p className="mt-4 text-muted-foreground">This certifies that</p>
                                        <p className="text-3xl font-bold font-headline my-4">A. Student</p>
                                        <p className="text-muted-foreground">has successfully completed the</p>
                                        <p className="text-xl font-bold font-headline mt-2">Community Catalyst Program</p>
                                        <p className="text-sm text-muted-foreground mt-8">Issued: Not yet earned</p>
                                    </div>
                                </div>
                                <div className="mt-4 text-center">
                                    <GlowingButton disabled>Download Certificate (Not Yet Earned)</GlowingButton>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="lg:col-span-1">
                        <ProgressClientPage courseStructure={courseStructure} />
                    </div>
                </div>
            </div>
        </div>
    )
}
