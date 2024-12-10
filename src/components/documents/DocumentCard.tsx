import React from 'react';
import {
    Card,
    CardContent,
    CardFooter
} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {
    Trash2,
    FileText,
    CheckCircle,
    Clock,
    XCircle
} from 'lucide-react';
import {formatDate} from '@/lib/utils';
import type {Document} from '@/types';

interface DocumentCardProps {
    document: Document;
    onDelete: (id: string) => void;
}

export const DocumentCard: React.FC<DocumentCardProps> = ({
                                                              document,
                                                              onDelete
                                                          }) => {
    const statusIcons = {
        pending: <Clock className="h-4 w-4 text-yellow-500"/>,
        approved: <CheckCircle className="h-4 w-4 text-green-500"/>,
        rejected: <XCircle className="h-4 w-4 text-red-500"/>
    };

    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                        <div className="p-2 bg-primary/10 rounded-full">
                            <FileText className="h-5 w-5 text-primary"/>
                        </div>
                        <div>
                            <h3 className="font-medium">{document.name}</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                                {document.university} • {document.type}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                                {statusIcons[document.status]}
                                <span className="text-sm capitalize">{document.status}</span>
                            </div>
                        </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        {formatDate(document.uploadDate)}
                    </p>
                </div>
                {document.notes && (
                    <p className="text-sm text-muted-foreground mt-4">
                        {document.notes}
                    </p>
                )}
            </CardContent>
            <CardFooter className="bg-muted/50 px-6 py-4">
                <div className="flex items-center justify-between w-full">
                    <Button variant="ghost" size="sm" className="text-destructive"
                            onClick={() => onDelete(document.id)}>
                        <Trash2 className="h-4 w-4 mr-2"/>
                        Delete
                    </Button>
                    <Button variant="secondary" size="sm" onClick={() => {
                        window.open(document.fileUrl, '_blank');
                    }}>
                        Download
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
};
