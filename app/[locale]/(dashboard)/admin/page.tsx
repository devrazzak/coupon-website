'use client';

import { Card } from '@/components/ui/card';
import { BarChart2, Users, ShoppingCart, DollarSign } from 'lucide-react';

export default function DashboardPage() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-blue-100 rounded-lg">
                            <Users className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Total Users</p>
                            <p className="text-2xl font-bold">2,543</p>
                        </div>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-green-100 rounded-lg">
                            <ShoppingCart className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Orders</p>
                            <p className="text-2xl font-bold">1,259</p>
                        </div>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-purple-100 rounded-lg">
                            <BarChart2 className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Sales</p>
                            <p className="text-2xl font-bold">$45,234</p>
                        </div>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-orange-100 rounded-lg">
                            <DollarSign className="w-6 h-6 text-orange-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Revenue</p>
                            <p className="text-2xl font-bold">$89,324</p>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
