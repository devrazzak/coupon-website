'use client';

import { Button } from '@/components/ui/button';
import { Bell, Globe, Lock, Moon, Shield, User } from 'lucide-react';

const settingsGroups = [
    {
        title: 'Account',
        items: [
            {
                icon: <User className="w-5 h-5" />,
                title: 'Personal Information',
                description: 'Update your personal details and information',
            },
            {
                icon: <Lock className="w-5 h-5" />,
                title: 'Password & Security',
                description: 'Manage your password and security preferences',
            },
        ],
    },
    {
        title: 'Preferences',
        items: [
            {
                icon: <Bell className="w-5 h-5" />,
                title: 'Notifications',
                description: 'Choose what notifications you want to receive',
            },
            {
                icon: <Globe className="w-5 h-5" />,
                title: 'Language & Region',
                description: 'Set your language and regional preferences',
            },
            {
                icon: <Moon className="w-5 h-5" />,
                title: 'Appearance',
                description: 'Customize the look and feel of the dashboard',
            },
        ],
    },
    {
        title: 'Privacy & Security',
        items: [
            {
                icon: <Shield className="w-5 h-5" />,
                title: 'Privacy Settings',
                description: 'Manage your privacy and data settings',
            },
        ],
    },
];

export default function SettingsPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
                {settingsGroups.map((group, index) => (
                    <div key={index} className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-semibold mb-4">
                            {group.title}
                        </h2>
                        <div className="space-y-4">
                            {group.items.map((item, itemIndex) => (
                                <div
                                    key={itemIndex}
                                    className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="text-gray-500">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-medium">
                                                {item.title}
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                    <Button variant="outline">Manage</Button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
