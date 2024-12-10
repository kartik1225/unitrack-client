import React, { useState } from 'react';
import { DocumentList } from '@/components/documents/DocumentList';
import { DocumentUpload } from '@/components/documents/DocumentUpload';
import { DocumentFilters } from '@/components/documents/DocumentFilters';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import type { Document } from '@/types';

const Documents: React.FC = () => {
    const { toast } = useToast();
    const [documents, setDocuments] = useState<Document[]>([
        {
            id: '1',
            name: 'I-20 Form - Stanford',
            type: 'I-20',
            uploadDate: new Date('2024-03-01'),
            fileUrl: 'https://hio.harvard.edu/sites/hio.harvard.edu/files/Form%20I-20%20SAMPLE.pdf',
            university: 'Stanford University',
            status: 'pending',
            notes: 'Awaiting university verification'
        },
        {
            id: '2',
            name: 'Statement of Purpose - MIT',
            type: 'Application',
            uploadDate: new Date('2024-03-02'),
            fileUrl: 'https://www.uc.edu/content/dam/refresh/learning-commons-62/awc/awc-grad/sample-statement-handout-spring-2021.pdf',
            university: 'MIT',
            status: 'approved',
            notes: 'Final version'
        }
    ]);

    const [filter, setFilter] = useState({
        type: 'all',
        university: 'all',
        status: 'all'
    });

    const handleUpload = (newDoc: Document) => {
        setDocuments(prev => [newDoc, ...prev]);
        toast({
            title: "Document uploaded",
            description: `${newDoc.name} has been successfully uploaded.`,
        });
    };

    const handleDelete = (id: string) => {
        setDocuments(prev => prev.filter(doc => doc.id !== id));
        toast({
            title: "Document deleted",
            description: "The document has been successfully deleted.",
            variant: "destructive"
        });
    };

    const filteredDocuments = documents.filter(doc => {
        return (
            (filter.type === 'all' || doc.type === filter.type) &&
            (filter.university === 'all' || doc.university === filter.university) &&
            (filter.status === 'all' || doc.status === filter.status)
        );
    });

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
                <DocumentUpload onUpload={handleUpload}>
                    <Button className="flex items-center gap-2">
                        <Upload className="h-4 w-4" />
                        Upload Document
                    </Button>
                </DocumentUpload>
            </div>

            <DocumentFilters
                filter={filter}
                onFilterChange={setFilter}
                documents={documents}
            />

            <DocumentList
                documents={filteredDocuments}
                onDelete={handleDelete}
            />
        </div>
    );
};

export default Documents;
