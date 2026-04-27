import { z } from "zod";

export const contactSchema = z.object({
  full_name: z.string().min(2, "Name is required"),
  company_name: z.string().optional(),
  email: z.string().email("Valid email required"),
  message: z.string().min(10, "Message is required"),
  phone: z.string().optional(),
  number_of_employees: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;