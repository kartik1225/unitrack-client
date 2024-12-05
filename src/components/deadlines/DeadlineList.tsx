import React from 'react';
import { DeadlineCard } from './DeadlineCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { Deadline } from '@/types';

interface DeadlineListProps {
    deadlines: Deadline[];
    onUpdate: (deadline: Deadline) => void;
    onDelete: (id: string) => void;
}

export const DeadlineList: React.FC<DeadlineListProps> = ({
                                                              deadlines,
                                                              onUpdate,
                                                              onDelete,
                                                          }) => {
    const upcomingDeadlines = deadlines.filter(d => !d.completed);
    const completedDeadlines = deadlines.filter(d => d.completed);

    const sortedUpcoming = [...upcomingDeadlines].sort(
        (a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
    );

    const sortedCompleted = [...completedDeadlines].sort(
        (a, b) => new Date(b.deadline).getTime() - new Date(a.deadline).getTime()
    );

    return (
        <Tabs defaultValue="upcoming" className="space-y-4">
            <TabsList>
                <TabsTrigger value="upcoming">
                    Upcoming ({upcomingDeadlines.length})
                </TabsTrigger>
                <TabsTrigger value="completed">
                    Completed ({completedDeadlines.length})
                </TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-4">
                {sortedUpcoming.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground">No upcoming deadlines.</p>
                    </div>
                ) : (
                    sortedUpcoming.map((deadline) => (
                        <DeadlineCard
                            key={deadline.id}
                            deadline={deadline}
                            onUpdate={onUpdate}
                            onDelete={onDelete}
                        />
                    ))
                )}
            </TabsContent>

            <TabsContent value="completed" className="space-y-4">
                {sortedCompleted.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground">No completed deadlines.</p>
                    </div>
                ) : (
                    sortedCompleted.map((deadline) => (
                        <DeadlineCard
                            key={deadline.id}
                            deadline={deadline}
                            onUpdate={onUpdate}
                            onDelete={onDelete}
                        />
                    ))
                )}
            </TabsContent>
        </Tabs>
    );
};
