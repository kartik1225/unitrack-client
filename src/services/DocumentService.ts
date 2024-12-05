import { BaseService } from './BaseService';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { Timestamp } from 'firebase/firestore';
import {storage} from "../config/firebase.client.ts";
import {FirestoreDocument} from "../lib/models.ts";

export class DocumentService extends BaseService<FirestoreDocument> {
    constructor() {
        super('documents');
    }

    async uploadDocument(
        file: File,
        data: FirestoreDocument
    ): Promise<FirestoreDocument> {
        // Create storage reference
        const storageRef = ref(storage, `documents/${data.userId}/${Date.now()}_${file.name}`);

        // Upload file
        await uploadBytes(storageRef, file);

        // Get download URL
        const fileUrl = await getDownloadURL(storageRef);

        // Create document in Firestore
        const timestamp = Timestamp.now();
        const documentData: Omit<FirestoreDocument, 'uid'> = {
            ...data,
            fileUrl,
            uploadDate: timestamp,
            createdAt: timestamp,
            updatedAt: timestamp
        };

        return this.createDocument(documentData);
    }

    async getUserDocuments(userId: string): Promise<FirestoreDocument[]> {
        return this.getDocuments(userId);
    }

    async updateDocument(id: string, data: Partial<FirestoreDocument>): Promise<void> {
        return super.updateDocument(id, data);
    }

    async deleteDocument1(id: string, fileUrl: string): Promise<void> {
        // Delete from Storage
        const storageRef = ref(storage, fileUrl);
        await deleteObject(storageRef);

        // Delete from Firestore
        return super.deleteDocument(id);
    }
}
