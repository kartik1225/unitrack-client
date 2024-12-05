import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { formatDate } from '@/lib/utils';

// First, let's add these types to our types/index.ts if not already present
interface ApplicationStatus {
    id: string;
    university: string;
    program: string;
    deadline: Date;
    documentsUploaded: number;
    totalDocuments: number;
    status: 'not-started' | 'in-progress' | 'submitted' | 'accepted' | 'rejected';
    lastUpdated: Date;
}

// Sample data - in a real app this would come from your backend
const applications: ApplicationStatus[] = [
    {
        id: '1',
        university: 'Stanford University',
        program: 'Computer Science MS',
        deadline: new Date('2024-12-15'),
        documentsUploaded: 4,
        totalDocuments: 6,
        status: 'in-progress',
        lastUpdated: new Date('2024-03-01'),
    },
    {
        id: '2',
        university: 'MIT',
        program: 'Data Science MS',
        deadline: new Date('2024-12-01'),
        documentsUploaded: 6,
        totalDocuments: 6,
        status: 'submitted',
        lastUpdated: new Date('2024-02-28'),
    },
    {
        id: '3',
        university: 'UC Berkeley',
        program: 'Computer Science MS',
        deadline: new Date('2024-12-10'),
        documentsUploaded: 2,
        totalDocuments: 7,
        status: 'in-progress',
        lastUpdated: new Date('2024-02-25'),
    },
];

const getStatusBadge = (status: ApplicationStatus['status']) => {
    const variants: Record<ApplicationStatus['status'], {
        variant: "default" | "secondary" | "destructive" | "outline",
        label: string
    }> = {
        'not-started': { variant: 'outline', label: 'Not Started' },
        'in-progress': { variant: 'secondary', label: 'In Progress' },
        'submitted': { variant: 'default', label: 'Submitted' },
        'accepted': { variant: 'default', label: 'Accepted' },
        'rejected': { variant: 'destructive', label: 'Rejected' }
    };

    return (
        <Badge variant={variants[status].variant}>
            {variants[status].label}
        </Badge>
    );
};

export const ApplicationProgress: React.FC = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Application Progress</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>University & Program</TableHead>
                            <TableHead>Deadline</TableHead>
                            <TableHead>Documents</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Last Updated</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {applications.map((app) => (
                            <TableRow key={app.id}>
                                <TableCell className="font-medium">
                                    <div>
                                        <p className="font-semibold">{app.university}</p>
                                        <p className="text-sm text-muted-foreground">{app.program}</p>
                                    </div>
                                </TableCell>
                                <TableCell>{formatDate(app.deadline)}</TableCell>
                                <TableCell>
                                    <div className="space-y-2">
                                        <Progress
                                            value={(app.documentsUploaded / app.totalDocuments) * 100}
                                        />
                                        <p className="text-sm text-muted-foreground">
                                            {app.documentsUploaded} of {app.totalDocuments} documents
                                        </p>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    {getStatusBadge(app.status)}
                                </TableCell>
                                <TableCell className="text-muted-foreground">
                                    {formatDate(app.lastUpdated)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};
