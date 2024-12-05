import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatDate } from '@/lib/utils';
import type { Document } from '@/types';

// This would come from your data store in a real app
const documents: Document[] = [
    {
        id: '1',
        name: 'Statement of Purpose - Stanford',
        type: 'Application',
        uploadDate: new Date('2024-03-01'),
        fileUrl: '',
        university: 'Stanford University',
        status: 'pending'
    },
    // Add more sample documents
];

export const RecentDocuments: React.FC = () => {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">Recent Documents</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                    <Link to="/documents" className="flex items-center gap-1">
                        View all
                        <ChevronRight className="h-4 w-4" />
                    </Link>
                </Button>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {documents.map((doc) => (
                        <div
                            key={doc.id}
                            className="flex items-center space-x-4 rounded-lg border p-4"
                        >
                            <FileText className="h-4 w-4 text-primary" />
                            <div className="flex-1 space-y-1">
                                <p className="text-sm font-medium">{doc.name}</p>
                                <p className="text-xs text-muted-foreground">
                                    {doc.type} • Uploaded {formatDate(doc.uploadDate)}
                                </p>
                            </div>
                            <Button variant="outline" size="sm">
                                Download
                            </Button>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};
