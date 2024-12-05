import React, { useCallback } from 'react';
import {useStorage} from "../../hooks/firebase/useStorage.ts";
import {useAuth} from "../../contexts/auth/AuthContext.tsx";

interface FileUploadProps {
    type: 'documents' | 'avatars' | 'logos';
    onUploadComplete: (url: string) => void;
    onUploadError?: (error: Error) => void;
    acceptedFileTypes?: string;
    maxSizeMB?: number;
}

export const FileUpload: React.FC<FileUploadProps> = ({
                                                          type,
                                                          onUploadComplete,
                                                          onUploadError,
                                                          acceptedFileTypes = '*',
                                                          maxSizeMB = 5,
                                                      }) => {
    const { uploadFile, loading, error, progress } = useStorage();
    const { user } = useAuth();

    const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file || !user) return;

        // Validate file size
        if (file.size > maxSizeMB * 1024 * 1024) {
            const error = new Error(`File size must be less than ${maxSizeMB}MB`);
            onUploadError?.(error);
            return;
        }

        try {
            const url = await uploadFile(file, user.uid, type);
            onUploadComplete(url);
        } catch (err) {
            if (err instanceof Error && onUploadError) {
                onUploadError(err);
            }
        }
    }, [user, uploadFile, maxSizeMB, type, onUploadComplete, onUploadError]);

    return (
        <div className="w-full">
            <input
                type="file"
                onChange={handleFileChange}
                accept={acceptedFileTypes}
                disabled={loading}
                className="hidden"
                id="file-upload"
            />
            <label
                htmlFor="file-upload"
                className={`cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                    loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            >
                {loading ? 'Uploading...' : 'Upload File'}
            </label>

            {loading && (
                <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                            className="bg-indigo-600 h-2.5 rounded-full"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{progress}% uploaded</p>
                </div>
            )}

            {error && (
                <p className="mt-2 text-sm text-red-600">
                    {error.message}
                </p>
            )}
        </div>
    );
};
