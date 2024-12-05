import { useState } from 'react';
import {User} from "../../types";
import {useAuth} from "../../contexts/auth/AuthContext.tsx";

interface UseFirebaseAuthReturn {
    user: User | null;
    loading: boolean;
    error: Error | null;
    signIn: (email: string, password: string) => Promise<void>;
    signUp: (email: string, password: string, userData: Partial<User>) => Promise<void>;
    signOut: () => Promise<void>;
    signInWithGoogle: () => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
    updateProfile: (userData: Partial<User>) => Promise<void>;
}

export const useFirebaseAuth = (): UseFirebaseAuthReturn => {
    const auth = useAuth();
    const [error, setError] = useState<Error | null>(null);

    const handleError = (error: unknown) => {
        if (error instanceof Error) {
            setError(error);
        } else {
            setError(new Error('An unknown error occurred'));
        }
    };

    const signIn = async (email: string, password: string) => {
        try {
            setError(null);
            await auth.signIn(email, password);
        } catch (err) {
            handleError(err);
        }
    };

    const signUp = async (email: string, password: string, userData: Partial<User>) => {
        try {
            setError(null);
            await auth.signUp(email, password, userData);
        } catch (err) {
            handleError(err);
        }
    };

    const signInWithGoogle = async () => {
        try {
            setError(null);
            await auth.signInWithGoogle();
        } catch (err) {
            handleError(err);
        }
    };

    return {
        user: auth.user,
        loading: auth.loading,
        error,
        signIn,
        signUp,
        signOut: auth.signOut,
        signInWithGoogle,
        resetPassword: auth.resetPassword,
        updateProfile: auth.updateProfile,
    };
};
