import React, {useState} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Switch} from '@/components/ui/switch';
import {Label} from '@/components/ui/label';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {useToast} from '@/components/ui/use-toast';
import {Bell, Globe} from 'lucide-react';

const Settings: React.FC = () => {
    const { toast } = useToast();
    const [settings, setSettings] = useState({
        notifications: {
            email: true,
            push: true,
            deadlineReminder: 14, // days before deadline
        },
        appearance: {
            theme: 'light',
            language: 'en',
        },
        privacy: {
            shareProfile: false,
            showProgress: true,
        }
    });

    const handleNotificationChange = (key: 'email' | 'push', value: boolean) => {
        setSettings(prev => ({
            ...prev,
            notifications: {
                ...prev.notifications,
                [key]: value
            }
        }));

        toast({
            title: "Settings updated",
            description: `${key.charAt(0).toUpperCase() + key.slice(1)} notifications ${value ? 'enabled' : 'disabled'}.`
        });
    };

    const handleReminderDaysChange = (days: string) => {
        setSettings(prev => ({
            ...prev,
            notifications: {
                ...prev.notifications,
                deadlineReminder: parseInt(days)
            }
        }));
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>

            <div className="grid gap-6">
                {/* Notifications Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Bell className="h-5 w-5" />
                            Notifications
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>Email Notifications</Label>
                                <p className="text-sm text-muted-foreground">
                                    Receive email updates about your applications
                                </p>
                            </div>
                            <Switch
                                checked={settings.notifications.email}
                                onCheckedChange={(checked) => handleNotificationChange('email', checked)}
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>Push Notifications</Label>
                                <p className="text-sm text-muted-foreground">
                                    Receive push notifications for important updates
                                </p>
                            </div>
                            <Switch
                                checked={settings.notifications.push}
                                onCheckedChange={(checked) => handleNotificationChange('push', checked)}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Deadline Reminder</Label>
                            <Select
                                value={settings.notifications.deadlineReminder.toString()}
                                onValueChange={handleReminderDaysChange}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select reminder time" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="7">1 week before</SelectItem>
                                    <SelectItem value="14">2 weeks before</SelectItem>
                                    <SelectItem value="30">1 month before</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Privacy Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Globe className="h-5 w-5" />
                            Privacy
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>Share Profile</Label>
                                <p className="text-sm text-muted-foreground">
                                    Allow other students to view your profile
                                </p>
                            </div>
                            <Switch
                                checked={settings.privacy.shareProfile}
                                onCheckedChange={(checked) =>
                                    setSettings(prev => ({
                                        ...prev,
                                        privacy: { ...prev.privacy, shareProfile: checked }
                                    }))
                                }
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>Show Progress</Label>
                                <p className="text-sm text-muted-foreground">
                                    Display your application progress publicly
                                </p>
                            </div>
                            <Switch
                                checked={settings.privacy.showProgress}
                                onCheckedChange={(checked) =>
                                    setSettings(prev => ({
                                        ...prev,
                                        privacy: { ...prev.privacy, showProgress: checked }
                                    }))
                                }
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Settings;
