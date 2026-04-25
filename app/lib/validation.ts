import { z } from "zod";

export const contactSchema = z.object({
  full_name: z.string().min(2, "Name is required"),
  company_name: z.string().optional(),
  email: z.email("Valid email required"),
  phone: z.string().optional(),
  number_of_employees: z.string().optional(),
  message: z.string().min(10, "Message is required"),
});

export type ContactInput = z.infer<typeof contactSchema>;