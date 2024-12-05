import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    FileText,
    Calendar,
    CheckCircle,
    GraduationCap
} from 'lucide-react';

interface StatItemProps {
    title: string;
    value: string;
    icon: React.ReactNode;
    description: string;
}

const StatItem: React.FC<StatItemProps> = ({ title, value, icon, description }) => (
    <div className="flex items-center space-x-4">
        <div className="p-2 bg-primary/10 rounded-full">
            {icon}
        </div>
        <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h4 className="text-2xl font-bold">{value}</h4>
            <p className="text-sm text-muted-foreground">{description}</p>
        </div>
    </div>
);

export const ProfileStats: React.FC = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Application Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <StatItem
                    title="Documents"
                    value="12"
                    icon={<FileText className="h-5 w-5 text-primary" />}
                    description="8 approved, 4 pending"
                />
                <StatItem
                    title="Deadlines"
                    value="5"
                    icon={<Calendar className="h-5 w-5 text-primary" />}
                    description="3 upcoming this month"
                />
                <StatItem
                    title="Universities"
                    value="8"
                    icon={<GraduationCap className="h-5 w-5 text-primary" />}
                    description="3 applications submitted"
                />
                <StatItem
                    title="Tasks Completed"
                    value="24"
                    icon={<CheckCircle className="h-5 w-5 text-primary" />}
                    description="85% completion rate"
                />
            </CardContent>
        </Card>
    );
};
