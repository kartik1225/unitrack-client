import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import type { Deadline } from '@/types';
import {Calendar} from "../ui/calendar.tsx";

interface DeadlineFormProps {
    deadline?: Deadline;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (deadline: Deadline) => void;
}

export const DeadlineForm: React.FC<DeadlineFormProps> = ({
                                                              deadline,
                                                              open,
                                                              onOpenChange,
                                                              onSubmit,
                                                          }) => {
    const [formData, setFormData] = useState<Partial<Deadline>>(
        deadline || {
            university: '',
            program: '',
            type: 'Application',
            deadline: new Date(),
            priority: 'medium',
            notes: '',
            reminderSet: false,
            completed: false,
        }
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Ensure `formData` adheres to the `Deadline` structure
        const deadlineData: Deadline = {
            id: deadline?.id || Date.now().toString(), // Ensure `id` matches the `Deadline` type
            ...formData, // Spread `formData`, assuming it matches `Deadline`
        };

        onSubmit(deadlineData);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        {deadline ? 'Edit Deadline' : 'Add New Deadline'}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="university">University</Label>
                        <Input
                            id="university"
                            value={formData.university}
                            onChange={(e) => setFormData(prev => ({ ...prev, university: e.target.value }))}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="program">Program</Label>
                        <Input
                            id="program"
                            value={formData.program}
                            onChange={(e) => setFormData(prev => ({ ...prev, program: e.target.value }))}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Deadline Date</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !formData.deadline && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {formData.deadline ? (
                                        format(formData.deadline, "PPP")
                                    ) : (
                                        <span>Pick a date</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={formData.deadline}
                                    onSelect={(date) => setFormData(prev => ({ ...prev, deadline: date || new Date() }))}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="type">Type</Label>
                        <Select
                            value={formData.type}
                            onValueChange={(value: Deadline['type']) =>
                                setFormData(prev => ({ ...prev, type: value }))
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Application">Application</SelectItem>
                                <SelectItem value="Document">Document</SelectItem>
                                <SelectItem value="Interview">Interview</SelectItem>
                                <SelectItem value="Decision">Decision</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="priority">Priority</Label>
                        <Select
                            value={formData.priority}
                            onValueChange={(value: Deadline['priority']) =>
                                setFormData(prev => ({ ...prev, priority: value }))
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="high">High</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="low">Low</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="notes">Notes (Optional)</Label>
                        <Textarea
                            id="notes"
                            value={formData.notes}
                            onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                            placeholder="Add any additional notes..."
                        />
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline"
                                onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit">
                            {deadline ? 'Update' : 'Add'} Deadline
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};
