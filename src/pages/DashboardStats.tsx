import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Calendar, School, CheckCircle } from 'lucide-react';

const stats = [
    {
        name: 'Total Documents',
        value: '12',
        icon: FileText,
        trend: '+2 this week'
    },
    {
        name: 'Upcoming Deadlines',
        value: '5',
        icon: Calendar,
        trend: '3 this week'
    },
    {
        name: 'Universities',
        value: '8',
        icon: School,
        trend: '2 in progress'
    },
    {
        name: 'Completed Tasks',
        value: '24',
        icon: CheckCircle,
        trend: '85% completion'
    }
];

export const DashboardStats: React.FC = () => {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
                <Card key={stat.name}>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">
                                    {stat.name}
                                </p>
                                <h3 className="text-2xl font-bold mt-2">{stat.value}</h3>
                                <p className="text-xs text-muted-foreground mt-1">
                                    {stat.trend}
                                </p>
                            </div>
                            <div className="p-2 bg-primary/10 rounded-full">
                                <stat.icon className="h-5 w-5 text-primary" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};
