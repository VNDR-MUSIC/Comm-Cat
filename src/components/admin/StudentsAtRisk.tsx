
'use server';

import { initializeFirebase } from "@/firebase";
import { collection, getDocs, query } from "firebase/firestore";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { AlertTriangle, UserCheck } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    isAdmin?: boolean;
}

interface UserLessonProgress {
    userId: string;
}

async function getAtRiskStudents() {
    const { firestore } = initializeFirebase();

    const usersQuery = query(collection(firestore, 'users'));
    const progressQuery = query(collection(firestore, 'userLessonProgress'));
    
    try {
        const [userSnap, progressSnap] = await Promise.all([
            getDocs(usersQuery),
            getDocs(progressQuery)
        ]);

        const allUsers = userSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as User));
        const activeStudentIds = new Set(progressSnap.docs.map(doc => (doc.data() as UserLessonProgress).userId));

        const atRiskStudents = allUsers.filter(user => !user.isAdmin && !activeStudentIds.has(user.id));
        
        return at-risk-students;

    } catch (error) {
        console.error("Error fetching students at risk:", error);
        return [];
    }
}

export async function StudentsAtRisk() {
    const atRiskStudents = await getAtRiskStudents();

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="text-destructive" />
                    <span>Students at Risk</span>
                </CardTitle>
                <CardDescription>
                    Students who have enrolled but have not completed any lessons.
                </CardDescription>
            </CardHeader>
            <CardContent>
                {atRiskStudents.length > 0 ? (
                    <div className="space-y-4">
                        {atRiskStudents.map(student => (
                            <div key={student.id} className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <Avatar>
                                        <AvatarImage src={`https://picsum.photos/seed/${student.id}/40/40`} />
                                        <AvatarFallback>{student.firstName?.[0]}{student.lastName?.[0]}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-bold">{student.firstName} {student.lastName}</p>
                                        <p className="text-sm text-muted-foreground">{student.email}</p>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm">Reach Out</Button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center text-center py-8">
                        <UserCheck className="w-16 h-16 text-green-500 mb-4" />
                        <h3 className="text-xl font-bold">All Students Engaged</h3>
                        <p className="text-muted-foreground mt-2">
                            Great work! All students have started their learning journey.
                        </p>
                    </div>
                )}
                 <div className="mt-6 border-t pt-4">
                    <Button variant="ghost" asChild>
                        <Link href="/admin/users">View All Users</Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
