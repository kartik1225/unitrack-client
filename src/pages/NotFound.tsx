import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

const NotFound: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
            <p className="text-xl text-muted-foreground mb-2">Page Not Found</p>
            <p className="text-muted-foreground mb-8 max-w-md">
                Sorry, we couldn't find the page you're looking for. Please check the URL or return to the homepage.
            </p>
            <Button asChild>
                <Link to="/dashboard" className="flex items-center gap-2">
                    <Home className="h-4 w-4" />
                    Back to Home
                </Link>
            </Button>
        </div>
    );
};

export default NotFound;
