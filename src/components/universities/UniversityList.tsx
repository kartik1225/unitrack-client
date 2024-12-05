import React from 'react';
import { UniversityCard } from './UniversityCard';
import type { University } from '@/types';

interface UniversityListProps {
    universities: University[];
    onDelete: (id: string) => void;
}

export const UniversityList: React.FC<UniversityListProps> = ({
                                                                  universities,
                                                                  onDelete
                                                              }) => {
    if (universities.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-muted-foreground">No universities found matching your criteria.</p>
            </div>
        );
    }

    return (
        <div className="grid gap-6 md:grid-cols-2">
            {universities.map((university) => (
                <UniversityCard
                    key={university.id}
                    university={university}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};
