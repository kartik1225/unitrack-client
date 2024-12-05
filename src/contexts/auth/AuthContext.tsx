import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import {User} from "../../types";
import {auth} from "../../config/firebase.client.ts";
import {authService} from "../../services/firebase";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    signIn: (email: string, password: string) => Promise<User>;
    signUp: (email: string, password: string, userData: Partial<User>) => Promise<User>;
    signOut: () => Promise<void>;
    signInWithGoogle: () => Promise<User>;
    resetPassword: (email: string) => Promise<void>;
    updateProfile: (userData: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                const enrichedUser = await authService.getCurrentUser();
                setUser(enrichedUser);
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const value = {
        user,
        loading,
        signIn: authService.signIn,
        signUp: authService.signUp,
        signOut: async () => {
            await authService.signOut();
            setUser(null);
        },
        signInWithGoogle: authService.signInWithGoogle,
        resetPassword: authService.resetPassword,
        updateProfile: authService.updateUserProfile,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
