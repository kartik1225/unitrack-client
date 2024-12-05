// src/components/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';
import {useAuth} from "../contexts/auth/AuthContext.tsx";

interface ProtectedRouteProps {
    children: React.ReactNode;
    redirectTo?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
                                                                  children,
                                                                  redirectTo = '/login'
                                                              }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>; // Or your loading component
    }

    if (!user) {
        return <Navigate to={redirectTo} replace />;
    }

    return <>{children}</>;
};
