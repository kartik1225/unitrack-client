import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Camera } from 'lucide-react';
import type { User } from '@/types';

interface ProfileFormProps {
    user: User;
    onUpdate: (user: User) => void;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ user, onUpdate }) => {
    const { toast } = useToast();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(user);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onUpdate(formData);
        setIsEditing(false);
        toast({
            title: "Profile updated",
            description: "Your profile has been successfully updated.",
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex justify-center">
                        <div className="relative">
                            <Avatar className="h-24 w-24">
                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <Button
                                size="icon"
                                variant="outline"
                                className="absolute bottom-0 right-0 rounded-full"
                                type="button"
                            >
                                <Camera className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                    disabled={!isEditing}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                    disabled={!isEditing}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="targetCountry">Target Country</Label>
                            <Select
                                disabled={!isEditing}
                                value={formData.targetCountry}
                                onValueChange={(value) => setFormData(prev => ({ ...prev, targetCountry: value }))}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select country" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="United States">United States</SelectItem>
                                    <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                                    <SelectItem value="Canada">Canada</SelectItem>
                                    <SelectItem value="Australia">Australia</SelectItem>
                                    <SelectItem value="Germany">Germany</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Preferred Programs</Label>
                            <div className="flex flex-wrap gap-2">
                                {formData.preferredPrograms && formData.preferredPrograms.map((program, index) => (
                                    <div
                                        key={index}
                                        className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                                    >
                                        {program}
                                        {isEditing && (
                                            <button
                                                type="button"
                                                className="ml-2 text-primary hover:text-primary/70"
                                                onClick={() => {
                                                        setFormData(prev => ({
                                                            ...prev,
                                                            preferredPrograms: prev.preferredPrograms?.filter((_, i) => i !== index)
                                                        }));

                                                }}
                                            >
                                                ×
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-2">
                        {isEditing ? (
                            <>
                                <Button type="button" variant="outline" onClick={() => {
                                    setIsEditing(false);
                                    setFormData(user);
                                }}>
                                    Cancel
                                </Button>
                                <Button type="submit">Save Changes</Button>
                            </>
                        ) : (
                            <Button type="button" onClick={() => setIsEditing(true)}>
                                Edit Profile
                            </Button>
                        )}
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};
