import {
    collection,
    doc,
    addDoc,
    getDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    Timestamp,
    limit as firestoreLimit
} from 'firebase/firestore';
import {db} from "../../config/firebase.client.ts";
import {StudentDocument, University} from "../../types";

export class FirestoreService<T> {
    protected collection: string;

    constructor(collectionName: string) {
        this.collection = collectionName;
    }

    protected collectionRef() {
        return collection(db, this.collection);
    }

    protected docRef(id: string) {
        return doc(db, this.collection, id);
    }

    async getById(id: string): Promise<T | null> {
        const docSnap = await getDoc(this.docRef(id));
        return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as T : null;
    }

    async getAll(): Promise<T[]> {
        const querySnapshot = await getDocs(this.collectionRef());
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as T);
    }

    async create(data: Omit<T, 'id'>): Promise<T> {
        const docRef = await addDoc(this.collectionRef(), {
            ...data,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now(),
        });
        const newDoc = await getDoc(docRef);
        return { id: newDoc.id, ...newDoc.data() } as T;
    }

    async update(id: string, data: Partial<T>): Promise<void> {
        await updateDoc(this.docRef(id), {
            ...data,
            updatedAt: Timestamp.now(),
        });
    }

    async delete(id: string): Promise<void> {
        await deleteDoc(this.docRef(id));
    }
}

// StudentDocument Service
export class StudentDocumentService extends FirestoreService<StudentDocument> {
    constructor() {
        super('studentDocuments');
    }

    async getByUser(userId: string): Promise<StudentDocument[]> {
        const q = query(
            this.collectionRef(),
            where('userId', '==', userId),
            orderBy('uploadDate', 'desc')
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as StudentDocument);
    }

    async getByUniversity(universityId: string): Promise<StudentDocument[]> {
        const q = query(
            this.collectionRef(),
            where('universityId', '==', universityId),
            orderBy('uploadDate', 'desc')
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as StudentDocument);
    }

    async getRequired(): Promise<StudentDocument[]> {
        const q = query(
            this.collectionRef(),
            where('isRequired', '==', true)
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as StudentDocument);
    }
}

// University Service
export class UniversityService extends FirestoreService<University> {
    constructor() {
        super('universities');
    }

    async getActive(): Promise<University[]> {
        const q = query(
            this.collectionRef(),
            where('isActive', '==', true),
            orderBy('ranking', 'asc')
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as University);
    }

    async getByCountry(country: string): Promise<University[]> {
        const q = query(
            this.collectionRef(),
            where('country', '==', country),
            where('isActive', '==', true)
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as University);
    }

    async getTopRanked(limit: number = 10): Promise<University[]> {
        const q = query(
            this.collectionRef(),
            where('isActive', '==', true),
            orderBy('ranking', 'asc'),
            firestoreLimit(limit)
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as University);
    }
}

// Export service instances
export const studentDocumentService = new StudentDocumentService();
export const universityService = new UniversityService();
