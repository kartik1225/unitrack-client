import { BaseService } from './BaseService';
import { getDoc } from 'firebase/firestore';
import {FirestoreProgram, FirestoreUniversity} from "../lib/models.ts";

export class UniversityService extends BaseService<FirestoreUniversity> {
    constructor() {
        super('universities');
    }

    async getUserUniversities(userId: string): Promise<FirestoreUniversity[]> {
        return this.getDocuments(userId);
    }

    async createUniversity(data: Omit<FirestoreUniversity, 'uid'>): Promise<FirestoreUniversity> {
        return this.createDocument(data);
    }

    async updateUniversity(id: string, data: Partial<Omit<FirestoreUniversity, 'programs'>>): Promise<void> {
        return this.updateDocument(id, data);
    }

    async deleteUniversity(id: string): Promise<void> {
        return this.deleteDocument(id);
    }

    async addProgram(universityId: string, program: FirestoreProgram): Promise<void> {
        const docRef = this.getDocRef(universityId);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            throw new Error('University not found');
        }

        const university = docSnap.data() as FirestoreUniversity;
        const updatedPrograms = [...university.programs, program];

        return this.updateDocument(universityId, {
            programs: updatedPrograms
        } as Partial<FirestoreUniversity>);
    }

    async removeProgram(universityId: string, programUid: string): Promise<void> {
        const docRef = this.getDocRef(universityId);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            throw new Error('University not found');
        }

        const university = docSnap.data() as FirestoreUniversity;
        const updatedPrograms = university.programs.filter(p => p.uid !== programUid);

        return this.updateDocument(universityId, {
            programs: updatedPrograms
        } as Partial<FirestoreUniversity>);
    }

    async updateProgram(universityId: string, programUid: string, programUpdate: Partial<FirestoreProgram>): Promise<void> {
        const docRef = this.getDocRef(universityId);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            throw new Error('University not found');
        }

        const university = docSnap.data() as FirestoreUniversity;
        const updatedPrograms = university.programs.map(p =>
            p.uid === programUid ? { ...p, ...programUpdate } : p
        );

        return this.updateDocument(universityId, {
            programs: updatedPrograms
        } as Partial<FirestoreUniversity>);
    }
}
