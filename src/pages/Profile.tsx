import React, { useState } from 'react';
import { ProfileForm } from '@/components/profile/ProfileForm';
import { ProfileStats } from '@/components/profile/ProfileStats';
import type { User } from '@/types';

const Profile: React.FC = () => {
    const [user, setUser] = useState<User>({
        id: '1',
        name: 'Kartik Garasiya',
        email: 'kartik@unitrack.com',
        targetCountry: 'United States',
        preferredPrograms: ['Computer Science', 'Data Science'],
        avatarUrl: '/api/placeholder/150/150'
    });

    const handleUpdateProfile = (updatedUser: User) => {
        setUser(updatedUser);
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Profile</h1>

            <div className="grid gap-6 md:grid-cols-2">
                <ProfileForm user={user} onUpdate={handleUpdateProfile} />
                <div className="space-y-6">
                    <ProfileStats />
                </div>
            </div>
        </div>
    );
};

export default Profile;
