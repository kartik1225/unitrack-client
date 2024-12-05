import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import type { Document } from '@/types';

interface DocumentUploadProps {
    children: React.ReactNode;
    onUpload: (document: Document) => void;
}

export const DocumentUpload: React.FC<DocumentUploadProps> = ({ children, onUpload }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        type: '',
        university: '',
        notes: '',
        file: null as File | null
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData(prev => ({ ...prev, file }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // In a real app, you would upload the file to your backend here
            const newDocument: Document = {
                id: Date.now().toString(),
                name: formData.name,
                type: formData.type as Document['type'],
                uploadDate: new Date(),
                fileUrl: 'dummy-url',
                university: formData.university,
                status: 'pending',
                notes: formData.notes
            };

            onUpload(newDocument);
            setIsOpen(false);
            setFormData({
                name: '',
                type: '',
                university: '',
                notes: '',
                file: null
            });
        } catch (error) {
            console.error('Error uploading document:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Upload New Document</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="file">Document File</Label>
                        <Input
                            id="file"
                            type="file"
                            onChange={handleFileChange}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="name">Document Name</Label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="type">Document Type</Label>
                        <Select
                            value={formData.type}
                            onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
                            required
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="I-20">I-20</SelectItem>
                                <SelectItem value="Application">Application</SelectItem>
                                <SelectItem value="Transcript">Transcript</SelectItem>
                                <SelectItem value="Recommendation">Recommendation</SelectItem>
                                <SelectItem value="Resume">Resume</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="university">University</Label>
                        <Input
                            id="university"
                            value={formData.university}
                            onChange={(e) => setFormData(prev => ({ ...prev, university: e.target.value }))}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="notes">Notes (Optional)</Label>
                        <Textarea
                            id="notes"
                            value={formData.notes}
                            onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                            placeholder="Add any additional notes..."
                        />
                    </div>

                    <div className="flex justify-end">
                        <Button type="submit" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {isLoading ? 'Uploading...' : 'Upload Document'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};
