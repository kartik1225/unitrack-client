import React from 'react';
import AuthForms from '@/components/auth/AuthForms';

const Auth: React.FC = () => {
    // const navigate = useNavigate();

    // // Add authentication check here
    // // If user is already authenticated, redirect to dashboard
    // React.useEffect(() => {
    //     const isAuthenticated = false; // Replace with your auth check
    //     if (isAuthenticated) {
    //         navigate('/');
    //     }
    // }, [navigate]);

    return <AuthForms/>;
};

export default Auth;
