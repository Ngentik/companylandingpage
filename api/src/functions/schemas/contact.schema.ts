import { z } from 'zod';

export const contactSchema = z
  .object({
    firstName: z.string().trim().min(1).max(100),
    lastName: z.string().trim().max(100).optional(),
    email: z.string().trim().email().max(254),
    phone: z.string().trim().max(50).optional(),
    company: z.string().trim().min(1).max(200),
    subject: z.string().trim().min(1).max(200),
    message: z.string().trim().min(10).max(5000),
    consent: z.literal(true),
    turnstileToken: z.string().min(1).max(2048),
  })
  .strict();

export type ContactRequest = z.infer<typeof contactSchema>;