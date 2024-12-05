import {
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject,
    UploadMetadata
} from 'firebase/storage';
import {storage} from "../../config/firebase.client.ts";

export class FirebaseStorageService {
    private getStoragePath(userId: string, type: string, filename: string) {
        return `${type}/${userId}/${Date.now()}_${filename}`;
    }

    async uploadFile(
        file: File,
        userId: string,
        type: 'documents' | 'avatars' | 'logos',
        metadata?: UploadMetadata
    ): Promise<string> {
        const path = this.getStoragePath(userId, type, file.name);
        const storageRef = ref(storage, path);

        const fileMetadata: UploadMetadata = {
            contentType: file.type,
            ...metadata,
        };

        await uploadBytes(storageRef, file, fileMetadata);
        return await getDownloadURL(storageRef);
    }

    async deleteFile(url: string): Promise<void> {
        const fileRef = ref(storage, url);
        await deleteObject(fileRef);
    }
}

export const storageService = new FirebaseStorageService();
