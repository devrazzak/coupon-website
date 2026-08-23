'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type StockInForm = {
    productId: string;
    quantity: number;
    unitPrice: number;
    supplier: string;
    batchNumber: string;
    date: string;
};

export default function StockInPage() {
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<StockInForm>();

    const onSubmit = async (data: StockInForm) => {
        setIsLoading(true);
        try {
            // API call would go here
            console.log(data);
            alert('Stock added successfully');
        } catch (error) {
            console.error(error);
            alert('Error adding stock');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold">Stock In</h1>
                <p className="text-gray-600">Add new stock to inventory</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Add Stock</CardTitle>
                    </CardHeader>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Product ID
                                </label>
                                <input
                                    {...register('productId', {
                                        required: true,
                                    })}
                                    type="text"
                                    className="w-full p-2 border rounded-md"
                                    placeholder="Enter product ID"
                                />
                                {errors.productId && (
                                    <span className="text-red-500 text-sm">
                                        Product ID is required
                                    </span>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Quantity
                                </label>
                                <input
                                    {...register('quantity', {
                                        required: true,
                                        min: 1,
                                        valueAsNumber: true,
                                    })}
                                    type="number"
                                    className="w-full p-2 border rounded-md"
                                    placeholder="Enter quantity"
                                />
                                {errors.quantity && (
                                    <span className="text-red-500 text-sm">
                                        Valid quantity is required
                                    </span>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Unit Price
                                </label>
                                <input
                                    {...register('unitPrice', {
                                        required: true,
                                        min: 0,
                                        valueAsNumber: true,
                                    })}
                                    type="number"
                                    step="0.01"
                                    className="w-full p-2 border rounded-md"
                                    placeholder="Enter unit price"
                                />
                                {errors.unitPrice && (
                                    <span className="text-red-500 text-sm">
                                        Valid unit price is required
                                    </span>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Supplier
                                </label>
                                <input
                                    {...register('supplier', {
                                        required: true,
                                    })}
                                    type="text"
                                    className="w-full p-2 border rounded-md"
                                    placeholder="Enter supplier name"
                                />
                                {errors.supplier && (
                                    <span className="text-red-500 text-sm">
                                        Supplier is required
                                    </span>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Batch Number
                                </label>
                                <input
                                    {...register('batchNumber', {
                                        required: true,
                                    })}
                                    type="text"
                                    className="w-full p-2 border rounded-md"
                                    placeholder="Enter batch number"
                                />
                                {errors.batchNumber && (
                                    <span className="text-red-500 text-sm">
                                        Batch number is required
                                    </span>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Date
                                </label>
                                <input
                                    {...register('date', { required: true })}
                                    type="date"
                                    className="w-full p-2 border rounded-md"
                                />
                                {errors.date && (
                                    <span className="text-red-500 text-sm">
                                        Date is required
                                    </span>
                                )}
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full"
                            >
                                {isLoading ? 'Adding Stock...' : 'Add Stock'}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Recent Stock Entries</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {/* Mock data - replace with actual data */}
                            {[1, 2, 3].map((item) => (
                                <div
                                    key={item}
                                    className="p-4 border rounded-md hover:bg-gray-50"
                                >
                                    <div className="flex justify-between">
                                        <span className="font-medium">
                                            Product #{item}
                                        </span>
                                        <span className="text-gray-600">
                                            10 units
                                        </span>
                                    </div>
                                    <div className="text-sm text-gray-600 mt-1">
                                        Added on{' '}
                                        {new Date().toLocaleDateString()}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
