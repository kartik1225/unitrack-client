import React from 'react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import type { Document } from '@/types';

interface DocumentFiltersProps {
    filter: {
        type: string;
        university: string;
        status: string;
    };
    onFilterChange: (filter: any) => void;
    documents: Document[];
}

export const DocumentFilters: React.FC<DocumentFiltersProps> = ({
                                                                    filter,
                                                                    onFilterChange,
                                                                    documents
                                                                }) => {
    const universities = Array.from(new Set(documents.map(doc => doc.university)));
    const types = Array.from(new Set(documents.map(doc => doc.type)));

    return (
        <div className="flex flex-wrap gap-4">
            <Select
                value={filter.type}
                onValueChange={(value) => onFilterChange({ ...filter, type: value })}
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Document Type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="all">All Types</SelectItem>
                        {types.map(type => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>

            <Select
                value={filter.university}
                onValueChange={(value) => onFilterChange({ ...filter, university: value })}
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="University" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="all">All Universities</SelectItem>
                        {universities.map(uni => (
                            <SelectItem key={uni} value={uni}>{uni}</SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>

            <Select
                value={filter.status}
                onValueChange={(value) => onFilterChange({ ...filter, status: value })}
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
};
