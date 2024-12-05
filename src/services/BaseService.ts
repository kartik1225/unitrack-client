import {
    collection,
    doc,
    getDoc,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    Timestamp,
    type Query,
    type DocumentData,
    type WhereFilterOp
} from 'firebase/firestore';
import {db} from "../config/firebase.client.ts";

export class BaseService<T extends { uid: string }> {
    protected collection: string;

    constructor(collectionName: string) {
        this.collection = collectionName;
    }

    protected getCollection() {
        return collection(db, this.collection);
    }

    protected getDocRef(id: string) {
        return doc(db, this.collection, id);
    }

    protected createQuery(constraints: { field: string; op: WhereFilterOp; value: any }[], sortBy?: { field: string; direction: 'asc' | 'desc' }) {
        let q: Query<DocumentData> = collection(db, this.collection);

        // Add where clauses
        constraints.forEach(({ field, op, value }) => {
            q = query(q, where(field, op, value));
        });

        // Add orderBy if specified
        if (sortBy) {
            q = query(q, orderBy(sortBy.field, sortBy.direction));
        }

        return q;
    }

    protected async getDocument(id: string): Promise<T | null> {
        const docRef = this.getDocRef(id);
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? { ...docSnap.data(), uid: docSnap.id } as T : null;
    }

    protected async getDocuments(userId: string): Promise<T[]> {
        const q = query(
            this.getCollection(),
            where('userId', '==', userId),
            orderBy('createdAt', 'desc')
        );

        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ ...doc.data(), uid: doc.id }) as T);
    }

    protected async createDocument(data: Omit<T, 'uid'>): Promise<T> {
        const docRef = await addDoc(this.getCollection(), {
            ...data,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now()
        });

        return { ...data, uid: docRef.id } as T;
    }

    protected async updateDocument(id: string, data: Partial<T>): Promise<void> {
        const docRef = this.getDocRef(id);
        await updateDoc(docRef, {
            ...data,
            updatedAt: Timestamp.now()
        });
    }

    protected async deleteDocument(id: string): Promise<void> {
        const docRef = this.getDocRef(id);
        await deleteDoc(docRef);
    }
}
