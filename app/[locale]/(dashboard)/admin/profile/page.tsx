'use client';

import { User } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

interface UserProfile {
    name: string;
    email: string;
    role: string;
    avatar?: string;
}

export default function ProfilePage() {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="max-w-3xl mx-auto p-6 text-center text-gray-500">
                Loading profile...
            </div>
        );
    }

    if (!user) {
        return (
            <div className="max-w-3xl mx-auto p-6 text-center text-gray-500">
                No user profile found.
            </div>
        );
    }

    const profile: UserProfile = {
        name: user.name,
        email: user.email,
        role: user.role,
    };

    return (
        <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                        <User className="w-10 h-10 text-gray-400" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">{profile.name}</h1>
                        <p className="text-gray-600">{profile.email}</p>
                        <span className="inline-block px-2 py-1 text-sm bg-indigo-50 text-indigo-700 rounded-full mt-1 capitalize">
                            {profile.role}
                        </span>
                    </div>
                </div>

                <div className="grid gap-6">
                    <section>
                        <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
                        <div className="grid gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    value={profile.name}
                                    readOnly
                                    className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={profile.email}
                                    readOnly
                                    className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Role
                                </label>
                                <input
                                    type="text"
                                    value={profile.role}
                                    readOnly
                                    className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md"
                                />
                            </div>
                        </div>
                    </section>

                    <div className="flex justify-end">
                        <Button variant="outline">Edit Profile</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
