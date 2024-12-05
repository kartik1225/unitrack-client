import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatDate } from '@/lib/utils';
import type { Deadline } from '@/types';

// This would come from your data store in a real app
const deadlines: Deadline[] = [
    {
        id: '1',
        university: 'Stanford University',
        program: 'Computer Science MS',
        deadline: new Date('2024-12-15'),
        type: 'Application',
        reminderSet: true,
        priority: 'high',
        completed: false
    },
    // Add more sample deadlines here
];

export const UpcomingDeadlines: React.FC = () => {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">Upcoming Deadlines</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                    <Link to="/deadlines" className="flex items-center gap-1">
                        View all
                        <ChevronRight className="h-4 w-4" />
                    </Link>
                </Button>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {deadlines.map((deadline) => (
                        <div
                            key={deadline.id}
                            className="flex items-center space-x-4 rounded-lg border p-4"
                        >
                            <Calendar className={`h-4 w-4 ${
                                deadline.priority === 'high' ? 'text-destructive' : 'text-primary'
                            }`} />
                            <div className="flex-1 space-y-1">
                                <p className="text-sm font-medium">{deadline.university}</p>
                                <p className="text-xs text-muted-foreground">
                                    {deadline.program} • Due {formatDate(deadline.deadline)}
                                </p>
                            </div>
                            <Button
                                variant={deadline.reminderSet ? "outline" : "secondary"}
                                size="sm"
                            >
                                {deadline.reminderSet ? 'Reminder Set' : 'Set Reminder'}
                            </Button>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};
