import React, { useState } from 'react';
import { UniversityList } from '@/components/universities/UniversityList';
import { UniversityForm } from '@/components/universities/UniversityForm';
import { UniversityFilters } from '@/components/universities/UniversityFilters';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import type { University } from '@/types';

const Universities: React.FC = () => {
    const { toast } = useToast();
    const [isAddingUniversity, setIsAddingUniversity] = useState(false);
    const [universities, setUniversities] = useState<University[]>([
        {
            id: '1',
            name: 'Stanford University',
            country: 'United States',
            programs: [
                {
                    id: 'p1',
                    name: 'Computer Science',
                    degree: 'Masters',
                    department: 'School of Engineering',
                    deadline: new Date('2024-12-15'),
                    requirements: [
                        'GRE Required',
                        'TOEFL/IELTS Required',
                        'Three Letters of Recommendation'
                    ]
                }
            ],
            isActive: true
        },
        {
            id: '2',
            name: 'Massachusetts Institute of Technology',
            country: 'United States',
            programs: [
                {
                    id: 'p2',
                    name: 'Data Science',
                    degree: 'Masters',
                    department: 'School of Computing',
                    deadline: new Date('2024-12-01'),
                    requirements: [
                        'GRE Optional',
                        'TOEFL/IELTS Required',
                        'Two Letters of Recommendation'
                    ]
                }
            ],
            isActive: true
        }
    ]);

    const [filters, setFilters] = useState({
        country: 'all',
        degree: 'all',
        search: ''
    });

    const handleAddUniversity = (newUniversity: University) => {
        setUniversities(prev => [...prev, newUniversity]);
        setIsAddingUniversity(false);
        toast({
            title: "University added",
            description: "New university has been successfully added to your list.",
        });
    };

    const handleDeleteUniversity = (id: string) => {
        setUniversities(prev => prev.filter(uni => uni.id !== id));
        toast({
            title: "University removed",
            description: "The university has been removed from your list.",
            variant: "destructive"
        });
    };

    const filteredUniversities = universities.filter(uni => {
        const matchesCountry = filters.country === 'all' || uni.country === filters.country;
        const matchesDegree = filters.degree === 'all' ||
            uni.programs.some(prog => prog.degree === filters.degree);
        const matchesSearch = filters.search === '' ||
            uni.name.toLowerCase().includes(filters.search.toLowerCase());

        return matchesCountry && matchesDegree && matchesSearch;
    });

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">Universities</h1>
                <Button onClick={() => setIsAddingUniversity(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add University
                </Button>
            </div>

            <UniversityFilters
                filters={filters}
                onFilterChange={setFilters}
            />

            <UniversityList
                universities={filteredUniversities}
                onDelete={handleDeleteUniversity}
            />

            <UniversityForm
                open={isAddingUniversity}
                onOpenChange={setIsAddingUniversity}
                onSubmit={handleAddUniversity}
            />
        </div>
    );
};

export default Universities;
