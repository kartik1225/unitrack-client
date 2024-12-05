import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { Plus, Minus } from 'lucide-react';
import type { University, Program } from '@/types';

interface UniversityFormProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (university: University) => void;
}

export const UniversityForm: React.FC<UniversityFormProps> = ({
                                                                  open,
                                                                  onOpenChange,
                                                                  onSubmit
                                                              }) => {
    const [formData, setFormData] = useState<Partial<University>>({
        name: '',
        country: '',
        programs: [{
            id: '1',
            name: '',
            degree: 'Masters',
            department: '',
            requirements: []
        }]
    });

    const handleAddProgram = () => {
        setFormData(prev => ({
            ...prev,
            programs: [...(prev.programs || []), {
                id: Date.now().toString(),
                name: '',
                degree: 'Masters',
                department: '',
                requirements: []
            }]
        }));
    };

    const handleRemoveProgram = (index: number) => {
        setFormData(prev => ({
            ...prev,
            programs: prev.programs?.filter((_, i) => i !== index)
        }));
    };

    const handleProgramChange = (index: number, field: keyof Program, value: any) => {
        setFormData(prev => ({
            ...prev,
            programs: prev.programs?.map((program, i) =>
                i === index ? { ...program, [field]: value } : program
            )
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            id: Date.now().toString(),
            ...formData as Omit<University, 'id'>
        });
        setFormData({
            name: '',
            country: '',
            programs: [{
                id: '1',
                name: '',
                degree: 'Masters',
                department: '',
                requirements: []
            }]
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Add New University</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">University Name</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="country">Country</Label>
                            <Select
                                value={formData.country}
                                onValueChange={(value) => setFormData(prev => ({ ...prev, country: value }))}
                                required
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select country" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="United States">United States</SelectItem>
                                    <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                                    <SelectItem value="Canada">Canada</SelectItem>
                                    <SelectItem value="Australia">Australia</SelectItem>
                                    <SelectItem value="Germany">Germany</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Label>Programs</Label>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={handleAddProgram}
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Program
                                </Button>
                            </div>

                            {formData.programs?.map((program, index) => (
                                <div key={program.id} className="space-y-4 border rounded-lg p-4">
                                    <div className="flex justify-between items-center">
                                        <h4 className="font-medium">Program {index + 1}</h4>
                                        {index > 0 && (
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                className="text-destructive"
                                                onClick={() => handleRemoveProgram(index)}
                                            >
                                                <Minus className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </div>

                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label>Program Name</Label>
                                            <Input
                                                value={program.name}
                                                onChange={(e) => handleProgramChange(index, 'name', e.target.value)}
                                                required
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label>Degree</Label>
                                            <Select
                                                value={program.degree}
                                                onValueChange={(value) => handleProgramChange(index, 'degree', value)}
                                                required
                                            >
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Bachelors">Bachelors</SelectItem>
                                                    <SelectItem value="Masters">Masters</SelectItem>
                                                    <SelectItem value="PhD">PhD</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-2">
                                            <Label>Department</Label>
                                            <Input
                                                value={program.department}
                                                onChange={(e) => handleProgramChange(index, 'department', e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit">Add University</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};
