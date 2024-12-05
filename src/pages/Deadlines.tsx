import React, { useState } from 'react';
import { DeadlineList } from '@/components/deadlines/DeadlineList';
import { DeadlineForm } from '@/components/deadlines/DeadlineForm';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import type { Deadline } from '@/types';

const Deadlines: React.FC = () => {
    const { toast } = useToast();
    const [isAddingDeadline, setIsAddingDeadline] = useState(false);
    const [deadlines, setDeadlines] = useState<Deadline[]>([
        {
            id: '1',
            university: 'Stanford University',
            program: 'Computer Science MS',
            deadline: new Date('2024-12-15'),
            type: 'Application',
            reminderSet: true,
            priority: 'high',
            completed: false,
            notes: 'Submit SOP and recommendations'
        },
        // Add more sample deadlines
    ]);

    const handleAddDeadline = (newDeadline: Deadline) => {
        setDeadlines(prev => [...prev, newDeadline]);
        setIsAddingDeadline(false);
        toast({
            title: "Deadline added",
            description: "New deadline has been successfully added.",
        });
    };

    const handleUpdateDeadline = (updatedDeadline: Deadline) => {
        setDeadlines(prev =>
            prev.map(d => d.id === updatedDeadline.id ? updatedDeadline : d)
        );
        toast({
            title: "Deadline updated",
            description: "The deadline has been successfully updated.",
        });
    };

    const handleDeleteDeadline = (id: string) => {
        setDeadlines(prev => prev.filter(d => d.id !== id));
        toast({
            title: "Deadline deleted",
            description: "The deadline has been successfully removed.",
            variant: "destructive"
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">Application Deadlines</h1>
                <Button onClick={() => setIsAddingDeadline(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Deadline
                </Button>
            </div>

            <DeadlineList
                deadlines={deadlines}
                onUpdate={handleUpdateDeadline}
                onDelete={handleDeleteDeadline}
            />

            <DeadlineForm
                open={isAddingDeadline}
                onOpenChange={setIsAddingDeadline}
                onSubmit={handleAddDeadline}
            />
        </div>
    );
};

export default Deadlines;
