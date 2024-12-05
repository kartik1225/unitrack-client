import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    Calendar,
    Bell,
    BellOff,
    Trash2,
    CheckCircle,
    School,
    AlertCircle
} from 'lucide-react';
import { formatDate } from '@/lib/utils';
import type { Deadline } from '@/types';

interface DeadlineCardProps {
    deadline: Deadline;
    onUpdate: (deadline: Deadline) => void;
    onDelete: (id: string) => void;
}

export const DeadlineCard: React.FC<DeadlineCardProps> = ({
                                                              deadline,
                                                              onUpdate,
                                                              onDelete,
                                                          }) => {
    const isOverdue = new Date(deadline.deadline) < new Date() && !deadline.completed;
    const daysUntil = Math.ceil(
        (new Date(deadline.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    );

    const toggleReminder = () => {
        onUpdate({
            ...deadline,
            reminderSet: !deadline.reminderSet,
        });
    };

    const toggleComplete = () => {
        onUpdate({
            ...deadline,
            completed: !deadline.completed,
        });
    };


    return (
        <Card className={`${isOverdue ? 'border-red-200 bg-red-50' : ''}`}>
            <CardContent className="p-6">
                <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                        <div className="p-2 bg-primary/10 rounded-full">
                            <School className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <h3 className="font-medium">{deadline.university}</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                                {deadline.program} • {deadline.type}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                                <Calendar className="h-4 w-4" />
                                <span className="text-sm">
                  Due: {formatDate(deadline.deadline)}
                                    {!deadline.completed && (
                                        <span className={`ml-2 ${isOverdue ? 'text-red-500' : 'text-muted-foreground'}`}>
                      ({isOverdue ? 'Overdue' : `${daysUntil} days left`})
                    </span>
                                    )}
                </span>
                            </div>
                            {deadline.notes && (
                                <p className="text-sm text-muted-foreground mt-2">
                                    {deadline.notes}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={toggleComplete}
                            className={deadline.completed ? 'text-green-500' : ''}
                        >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            {deadline.completed ? 'Completed' : 'Mark Complete'}
                        </Button>

                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={toggleReminder}
                            className={deadline.reminderSet ? 'text-primary' : ''}
                        >
                            {deadline.reminderSet ? (
                                <BellOff className="h-4 w-4 mr-2" />
                            ) : (
                                <Bell className="h-4 w-4 mr-2" />
                            )}
                            {deadline.reminderSet ? 'Remove Reminder' : 'Set Reminder'}
                        </Button>

                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onDelete(deadline.id)}
                            className="text-destructive"
                        >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                        </Button>
                    </div>
                </div>

                {isOverdue && (
                    <div className="mt-4 flex items-center gap-2 text-sm text-red-500">
                        <AlertCircle className="h-4 w-4" />
                        This deadline is overdue!
                    </div>
                )}
            </CardContent>
        </Card>
    );
};
