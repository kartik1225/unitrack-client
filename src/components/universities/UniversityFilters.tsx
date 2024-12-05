import React from 'react';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { Search } from 'lucide-react';

interface UniversityFiltersProps {
    filters: {
        country: string;
        degree: string;
        search: string;
    };
    onFilterChange: (filters: any) => void;
}

export const UniversityFilters: React.FC<UniversityFiltersProps> = ({
                                                                        filters,
                                                                        onFilterChange,
                                                                    }) => {
    return (
        <div className="flex flex-wrap gap-4">
            <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search universities..."
                    value={filters.search}
                    onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
                    className="pl-8"
                />
            </div>

            <Select
                value={filters.country}
                onValueChange={(value) => onFilterChange({ ...filters, country: value })}
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Country" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Countries</SelectItem>
                    <SelectItem value="United States">United States</SelectItem>
                    <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                    <SelectItem value="Canada">Canada</SelectItem>
                    <SelectItem value="Australia">Australia</SelectItem>
                    <SelectItem value="Germany">Germany</SelectItem>
                </SelectContent>
            </Select>

            <Select
                value={filters.degree}
                onValueChange={(value) => onFilterChange({ ...filters, degree: value })}
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Degree" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Degrees</SelectItem>
                    <SelectItem value="Bachelors">Bachelors</SelectItem>
                    <SelectItem value="Masters">Masters</SelectItem>
                    <SelectItem value="PhD">PhD</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
};
