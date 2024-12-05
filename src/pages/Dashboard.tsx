import React from 'react';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { UpcomingDeadlines } from '@/components/dashboard/UpcomingDeadlines';
import { RecentDocuments } from '@/components/dashboard/RecentDocuments';
import { ApplicationProgress } from '@/components/dashboard/ApplicationProgress';

const Dashboard: React.FC = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

            <DashboardStats />

            <div className="grid gap-6 md:grid-cols-2">
                <UpcomingDeadlines />
                <RecentDocuments />
            </div>

            <ApplicationProgress />
        </div>
    );
};

export default Dashboard;
