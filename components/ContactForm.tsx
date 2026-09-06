'use client';

import { zodResolver } from '@hookform/resolvers/zod';

import { AxiosError } from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { type ContactFormData, contactSchema } from '@/schemas/contact';
import { submitContactRequest } from '@/utils/api/contact';

type ContactErrorResponse = {
    message?: string;
};

const fieldClassName =
    'mt-2 w-full rounded-xl border border-border bg-background px-3 text-[14px] text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/10';

export default function ContactForm() {
    const [successMessage, setSuccessMessage] = useState('');
    const [submitError, setSubmitError] = useState('');
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            name: '',
            email: '',
            subject: '',
            message: '',
        },
    });

    const onSubmit = async (data: ContactFormData) => {
        setSuccessMessage('');
        setSubmitError('');

        try {
            const response = await submitContactRequest(data);
            setSuccessMessage(
                response.data.message ||
                    'Thanks for reaching out. We received your message and will be in touch soon.',
            );
            reset();
        } catch (error: unknown) {
            const message =
                error instanceof AxiosError
                    ? error.response?.data?.message
                    : error instanceof Error
                      ? error.message
                      : undefined;
            setSubmitError(message || 'We could not send your message. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
            <div>
                <h2 className="font-display text-[24px] font-extrabold text-foreground">
                    Send us a message
                </h2>
                <p className="mt-1 text-[13px] leading-6 text-muted-foreground">
                    Share a question, report a coupon issue, or tell us how we can improve.
                </p>
            </div>

            {successMessage && (
                <p
                    role="status"
                    className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-3 text-[13px] font-medium text-emerald-700"
                >
                    {successMessage}
                </p>
            )}
            {submitError && (
                <p
                    role="alert"
                    className="rounded-xl border border-red-200 bg-red-50 px-3 py-3 text-[13px] font-medium text-red-700"
                >
                    {submitError}
                </p>
            )}

            <div className="grid gap-4 md:grid-cols-2">
                <label className="block text-[13px] font-medium text-foreground">
                    Name
                    <input
                        {...register('name')}
                        type="text"
                        autoComplete="name"
                        aria-invalid={Boolean(errors.name)}
                        className={`${fieldClassName} h-11`}
                    />
                    {errors.name && (
                        <span className="mt-1 block text-[12px] font-medium text-red-600">
                            {errors.name.message}
                        </span>
                    )}
                </label>
                <label className="block text-[13px] font-medium text-foreground">
                    Email
                    <input
                        {...register('email')}
                        type="email"
                        autoComplete="email"
                        aria-invalid={Boolean(errors.email)}
                        className={`${fieldClassName} h-11`}
                    />
                    {errors.email && (
                        <span className="mt-1 block text-[12px] font-medium text-red-600">
                            {errors.email.message}
                        </span>
                    )}
                </label>
            </div>

            <label className="block text-[13px] font-medium text-foreground">
                Subject
                <input
                    {...register('subject')}
                    type="text"
                    aria-invalid={Boolean(errors.subject)}
                    className={`${fieldClassName} h-11`}
                />
                {errors.subject && (
                    <span className="mt-1 block text-[12px] font-medium text-red-600">
                        {errors.subject.message}
                    </span>
                )}
            </label>

            <label className="block text-[13px] font-medium text-foreground">
                Message
                <textarea
                    {...register('message')}
                    rows={6}
                    aria-invalid={Boolean(errors.message)}
                    className={`${fieldClassName} py-3`}
                />
                {errors.message && (
                    <span className="mt-1 block text-[12px] font-medium text-red-600">
                        {errors.message.message}
                    </span>
                )}
            </label>

            <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-5 py-3 text-[13px] font-bold text-primary-foreground transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
            >
                {isSubmitting ? 'Sending...' : 'Send message'}
            </button>
        </form>
    );
}
