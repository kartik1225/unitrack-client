import React from 'react';
import { DocumentCard } from './DocumentCard';
import type { Document } from '@/types';

interface DocumentListProps {
    documents: Document[];
    onDelete: (id: string) => void;
}

export const DocumentList: React.FC<DocumentListProps> = ({
                                                              documents,
                                                              onDelete
                                                          }) => {
    if (documents.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-muted-foreground">No documents found.</p>
            </div>
        );
    }

    return (
        <div className="grid gap-6 md:grid-cols-2">
            {documents.map((document) => (
                <DocumentCard
                    key={document.id}
                    document={document}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};
