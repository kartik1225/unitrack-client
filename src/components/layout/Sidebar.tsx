import React from 'react';
import {NavLink} from 'react-router-dom';
import {
    LayoutDashboard,
    FolderOpen,
    Calendar,
    GraduationCap,
    Settings,
} from 'lucide-react';
import {cn} from '@/lib/utils';

interface NavItemProps {
    to: string;
    icon: React.ReactNode;
    label: string;
}

const NavItem: React.FC<NavItemProps> = ({to, icon, label}) => (
    <NavLink
        to={to}
        className={({isActive}) =>
            cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900",
                "hover:bg-gray-100",
                isActive && "bg-gray-100 text-gray-900"
            )
        }
    >
        {icon}
        <span>{label}</span>
    </NavLink>
);

export const Sidebar: React.FC = () => {
    const navItems = [
        {to: "/dashboard", icon: <LayoutDashboard className="h-5 w-5"/>, label: "Dashboard"},
        {to: "/documents", icon: <FolderOpen className="h-5 w-5"/>, label: "Documents"},
        {to: "/deadlines", icon: <Calendar className="h-5 w-5"/>, label: "Deadlines"},
        {to: "/universities", icon: <GraduationCap className="h-5 w-5"/>, label: "Universities"},
        {to: "/settings", icon: <Settings className="h-5 w-5"/>, label: "Settings"}
    ];

    return (
        <div className="hidden lg:flex lg:flex-shrink-0">
            <div className="flex w-64 flex-col">
                <div className="flex min-h-0 flex-1 flex-col border-r bg-background">
                    <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
                        <nav className="mt-5 flex-1 space-y-1 px-2">
                            {navItems.map((item) => (
                                <NavItem key={item.to} {...item} />
                            ))}
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
};
