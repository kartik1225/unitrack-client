import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut as firebaseSignOut,
    sendPasswordResetEmail,
    sendEmailVerification,
    updateProfile,
    GoogleAuthProvider,
    signInWithPopup,
    User as FirebaseUser
} from 'firebase/auth';
import { auth, db } from '@/config/firebase.client';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import {User} from "../types";

export interface AuthService {
    signUp: (email: string, password: string, userData: Partial<User>) => Promise<User>;
    signIn: (email: string, password: string) => Promise<User>;
    signInWithGoogle: () => Promise<User>;
    signOut: () => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
    updateUserProfile: (userData: Partial<User>) => Promise<void>;
    getCurrentUser: () => Promise<User | null>;
}

class FirebaseAuthService implements AuthService {
    async signUp(email: string, password: string, userData: Partial<User>): Promise<User> {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        await this.createUserProfile(user, userData);
        await sendEmailVerification(user);
        return this.enrichUserData(user);
    }

    async signIn(email: string, password: string): Promise<User> {
        const { user } = await signInWithEmailAndPassword(auth, email, password);
        return this.enrichUserData(user);
    }

    async signInWithGoogle(): Promise<User> {
        const provider = new GoogleAuthProvider();
        const { user } = await signInWithPopup(auth, provider);
        await this.createUserProfile(user, {});
        return this.enrichUserData(user);
    }

    async signOut(): Promise<void> {
        await firebaseSignOut(auth);
    }

    async resetPassword(email: string): Promise<void> {
        await sendPasswordResetEmail(auth, email);
    }

    async updateUserProfile(userData: Partial<User>): Promise<void> {
        const user = auth.currentUser;
        if (!user) throw new Error('No user logged in');

        if (userData.name) {
            await updateProfile(user, { displayName: userData.name });
        }

        await setDoc(doc(db, 'users', user.uid), userData, { merge: true });
    }

    async getCurrentUser(): Promise<User | null> {
        const user = auth.currentUser;
        if (!user) return null;
        return this.enrichUserData(user);
    }

    private async createUserProfile(user: FirebaseUser, userData: Partial<User>): Promise<void> {
        await setDoc(doc(db, 'users', user.uid), {
            email: user.email,
            emailVerified: user.emailVerified,
            ...userData,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }

    private async enrichUserData(user: FirebaseUser): Promise<User> {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const userData = userDoc.data();
        return {
            id: user.uid,
            name: user.displayName || '',
            email: user.email || '',
            avatarUrl: user.photoURL || '',
            ...userData,
        }
    }
}

export const authService = new FirebaseAuthService();
