// src/App.tsx
import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Toaster } from '@/components/ui/toaster';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { FirebaseProvider } from '@/contexts/FirebaseContext';
import Documents from "./components/documents/Documents.tsx";
import Login from './pages/Login';
import Landing from "./pages/Landing.tsx";

// Lazy loading pages for better performance
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Deadlines = React.lazy(() => import('./pages/Deadlines'));
const Universities = React.lazy(() => import('./pages/Universities'));
const Profile = React.lazy(() => import('./pages/Profile'));
const Settings = React.lazy(() => import('./pages/Settings'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
const Auth = React.lazy(() => import('./pages/Auth.tsx'));

const App: React.FC = () => {
    return (
        <FirebaseProvider>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={
                    // <ProtectedRoute>
                        <Layout>
                            <Suspense fallback={<LoadingSpinner />}>
                                <Routes>
                                    <Route path="/auth" element={<Auth />} />
                                    <Route path="/dashboard" element={<Dashboard />} />
                                    <Route path="/documents" element={<Documents />} />
                                    <Route path="/deadlines" element={<Deadlines />} />
                                    <Route path="/universities" element={<Universities />} />
                                    <Route path="/profile" element={<Profile />} />
                                    <Route path="/settings" element={<Settings />} />
                                    <Route path="*" element={<NotFound />} />
                                </Routes>
                            </Suspense>
                        </Layout>
                    // </ProtectedRoute>
                } />
            </Routes>
            <Toaster />
        </FirebaseProvider>
    );
};

export default App;
