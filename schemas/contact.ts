import { z } from 'zod';

export const contactSchema = z.object({
    name: z.string().trim().min(2, 'Please enter your name.').max(100, 'Name is too long.'),
    email: z.string().trim().email('Please enter a valid email address.'),
    subject: z.string().trim().min(3, 'Please enter a subject.').max(150, 'Subject is too long.'),
    message: z
        .string()
        .trim()
        .min(10, 'Please provide a little more detail.')
        .max(2000, 'Message is too long.'),
});

export type ContactFormData = z.infer<typeof contactSchema>;
