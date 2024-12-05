import React, { useState } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    MapPin,
    Calendar,
    ChevronDown,
    ChevronUp,
    Trash2
} from 'lucide-react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { formatDate } from '@/lib/utils';
import type { University } from '@/types';

interface UniversityCardProps {
    university: University;
    onDelete: (id: string) => void;
}

export const UniversityCard: React.FC<UniversityCardProps> = ({
                                                                  university,
                                                                  onDelete
                                                              }) => {
    const [showPrograms, setShowPrograms] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    return (
        <>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-xl font-bold">{university.name}</CardTitle>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive"
                        onClick={() => setShowDeleteDialog(true)}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            <span>{university.country}</span>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <h4 className="font-medium">Programs ({university.programs.length})</h4>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setShowPrograms(!showPrograms)}
                                >
                                    {showPrograms ? (
                                        <ChevronUp className="h-4 w-4" />
                                    ) : (
                                        <ChevronDown className="h-4 w-4" />
                                    )}
                                </Button>
                            </div>

                            {showPrograms && (
                                <div className="space-y-4 mt-4">
                                    {university.programs.map((program) => (
                                        <div
                                            key={program.id}
                                            className="border rounded-lg p-4 space-y-2"
                                        >
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h5 className="font-medium">{program.name}</h5>
                                                    <p className="text-sm text-muted-foreground">
                                                        {program.degree} • {program.department}
                                                    </p>
                                                </div>
                                                {program.deadline && (
                                                    <div className="flex items-center gap-1 text-sm">
                                                        <Calendar className="h-4 w-4" />
                                                        <span>{formatDate(program.deadline)}</span>
                                                    </div>
                                                )}
                                            </div>

                                            {program.requirements && (
                                                <div className="space-y-1">
                                                    <p className="text-sm font-medium">Requirements:</p>
                                                    <ul className="text-sm text-muted-foreground list-disc list-inside">
                                                        {program.requirements.map((req, index) => (
                                                            <li key={index}>{req}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>

            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete University</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to remove {university.name} from your list?
                            This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            className="bg-destructive text-destructive-foreground"
                            onClick={() => onDelete(university.id)}
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};
