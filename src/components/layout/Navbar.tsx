import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {Bell, Settings, LogOut, User} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const Navbar: React.FC = () => {
    const [unreadNotifications] = useState(3); // This would come from a context/store in real app

    return (
        <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <Link to="/" className="flex items-center">
                            <span className="text-xl font-bold text-primary">UniTrack</span>
                        </Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Button variant="ghost" size="icon">
                                <Bell className="h-5 w-5"/>
                                {unreadNotifications > 0 && (
                                    <span
                                        className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-destructive text-xs text-white flex items-center justify-center">
                    {unreadNotifications}
                  </span>
                                )}
                            </Button>
                        </div>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                    <Settings className="h-5 w-5"/>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuItem asChild>
                                    <Link to="/profile" className="flex items-center">
                                        <User className="mr-2 h-4 w-4"/>
                                        Profile
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link to="/settings" className="flex items-center">
                                        <Settings className="mr-2 h-4 w-4"/>
                                        Settings
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">
                                    <LogOut className="mr-2 h-4 w-4"/>
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </nav>
    );
};
