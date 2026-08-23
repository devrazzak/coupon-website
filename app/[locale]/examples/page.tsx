'use client';

import { InputField } from '@/components/ui/input-field';
import { User } from 'lucide-react';

export default function InputFieldDemo() {
    return (
        <div className="max-w-4xl mx-auto p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-6">
                        Basic Form Example
                    </h2>

                    {/* Standard text input */}
                    <InputField
                        label="Username"
                        asterisk
                        placeholder="Enter your username"
                        name="username"
                        id="username"
                        groupIcon={<User className="h-4 w-4 text-gray-500" />}
                    />
                </div>
            </div>
        </div>
    );
}
