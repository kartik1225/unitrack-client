import { Timestamp } from 'firebase/firestore';
import {Deadline, Program, University, User} from "../types";

export interface FirestoreUser extends Omit<User, 'id'> {
    uid: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

export interface FirestoreDocument extends Omit<Document, 'id' | 'uploadDate'> {
    uid: string;
    userId: string;
    fileUrl: string;  // Changed from 'url' to 'fileUrl' for clarity
    uploadDate: Timestamp;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

export interface FirestoreDeadline extends Omit<Deadline, 'id' | 'deadline' | 'reminderDate'> {
    uid: string;
    userId: string;
    deadline: Timestamp;
    reminderDate?: Timestamp;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

export interface FirestoreProgram extends Omit<Program, 'id' | 'deadline'> {
    uid: string;
    deadline?: Timestamp;
}

export interface FirestoreUniversity extends Omit<University, 'id' | 'programs'> {
    uid: string;
    userId: string;
    programs: FirestoreProgram[];
    createdAt: Timestamp;
    updatedAt: Timestamp;
}
