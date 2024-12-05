import { Timestamp } from 'firebase/firestore';


export interface Document {
    id: string;
    name: string;
    type: 'I-20' | 'Application' | 'Transcript' | 'Recommendation' | 'Resume' | 'Other';
    uploadDate: Date;
    fileUrl: string;  // Changed from 'url' to 'fileUrl'
    university: string;
    program?: string;
    status: 'pending' | 'approved' | 'rejected';
    notes?: string;
}

export interface Deadline {
    id: string;
    university: string;
    program: string;
    deadline: Date;
    type: 'Application' | 'Document' | 'Interview' | 'Decision';
    reminderSet: boolean;
    reminderDate?: Date;
    priority: 'high' | 'medium' | 'low';
    notes?: string;
    completed: boolean;
    [key: string]: any;
}

export interface University {
    id: string;
    name: string;
    country: string;
    programs: Program[];
}

export interface Program {
    id: string;
    name: string;
    degree: 'Bachelors' | 'Masters' | 'PhD';
    department: string;
    deadline?: Date;
    requirements?: string[];
}

export interface Notification {
    id: string;
    type: 'deadline' | 'document' | 'system';
    title: string;
    message: string;
    date: Date;
    read: boolean;
    actionUrl?: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string;
    targetCountry?: string;
    preferredPrograms?: string[];
}

export interface NotificationPreferences {
    email: boolean;
    push: boolean;
    sms: boolean;
}

// Common types based on your Strapi models
export interface StudentDocument {
    id: string;
    name: string;
    type: 'Application' | 'Transcript' | 'Recommendation' | 'Resume' | 'Other';
    program: string;
    notes?: string;
    uploadDate: Timestamp;
    expiryDate?: Timestamp;
    tags?: string[];
    isRequired: boolean;
    verificationStatus: 'unverified' | 'in-review' | 'verified' | 'rejected';
    version: number;
    universityId?: string;
    userId: string;
    fileUrl?: string;
}

export interface University {
    id: string;
    name: string;
    country: string;
    website?: string;
    contactEmail?: string;
    address?: {
        street?: string;
        city?: string;
        state?: string;
        country?: string;
        postalCode?: string;
    };
    ranking?: number;
    isActive: boolean;
    logoUrl?: string;
}
