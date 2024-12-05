import { Navigate } from 'react-router-dom';
import {useFirebase} from "../../contexts/FirebaseContext.tsx";
import React from "react";
import {LoadingSpinner} from "../ui/loading-spinner.tsx";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { user, loading } = useFirebase();

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    return <>{children}</>;
};
