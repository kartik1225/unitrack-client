import { useState } from 'react';
import {storageService} from "../../services/firebase/storage.ts";

interface UploadProgress {
    progress: number;
    url: string | null;
}

export const useStorage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [uploadProgress, setUploadProgress] = useState<UploadProgress>({
        progress: 0,
        url: null,
    });

    const uploadFile = async (
        file: File,
        userId: string,
        type: 'documents' | 'avatars' | 'logos',
        metadata?: { [key: string]: string }
    ) => {
        try {
            setLoading(true);
            setError(null);
            setUploadProgress({ progress: 0, url: null });

            const url = await storageService.uploadFile(file, userId, type, metadata);

            setUploadProgress({ progress: 100, url });
            return url;
        } catch (err) {
            const error = err instanceof Error ? err : new Error('Failed to upload file');
            setError(error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const deleteFile = async (url: string) => {
        try {
            setLoading(true);
            setError(null);
            await storageService.deleteFile(url);
        } catch (err) {
            const error = err instanceof Error ? err : new Error('Failed to delete file');
            setError(error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return {
        uploadFile,
        deleteFile,
        loading,
        error,
        progress: uploadProgress.progress,
        uploadedUrl: uploadProgress.url,
    };
};
