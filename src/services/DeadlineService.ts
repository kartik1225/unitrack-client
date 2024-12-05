import { BaseService } from './BaseService';
import { query, where, orderBy, getDocs, Timestamp } from 'firebase/firestore';
import {FirestoreDeadline} from "../lib/models.ts";

export class DeadlineService extends BaseService<FirestoreDeadline> {
    constructor() {
        super('deadlines');
    }

    async getUserDeadlines(userId: string): Promise<FirestoreDeadline[]> {
        return this.getDocuments(userId);
    }

    async getUpcomingDeadlines(userId: string): Promise<FirestoreDeadline[]> {
        const q = query(
            this.getCollection(),
            where('userId', '==', userId),
            where('deadline', '>=', Timestamp.now()),
            where('completed', '==', false),
            orderBy('deadline', 'asc')
        );

        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ ...doc.data(), uid: doc.id }) as FirestoreDeadline);
    }

    async createDeadline(data: Omit<FirestoreDeadline, 'uid' | 'createdAt' | 'updatedAt'>): Promise<FirestoreDeadline> {
        return this.createDocument(data);
    }

    async updateDeadline(id: string, data: Partial<FirestoreDeadline>): Promise<void> {
        return this.updateDocument(id, data);
    }

    async deleteDeadline(id: string): Promise<void> {
        return this.deleteDocument(id);
    }

    async markAsComplete(id: string, completed: boolean): Promise<void> {
        return this.updateDocument(id, { completed });
    }

    async setReminder(id: string, reminderDate: Date): Promise<void> {
        return this.updateDocument(id, {
            reminderDate: Timestamp.fromDate(reminderDate),
            reminderSet: true
        });
    }
}
