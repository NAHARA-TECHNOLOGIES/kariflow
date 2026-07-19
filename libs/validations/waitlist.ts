import { z } from "zod";

export const waitlistSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  businessType: z.string().min(2),
  country: z.string().min(2),
  state: z.string().min(2),
  frequency: z.enum(["daily", "weekly"]).optional(),
  categories: z.array(z.string()).optional(),
});