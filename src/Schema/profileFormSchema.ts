import { z } from "zod";

export const profileFormSchema = z.object({
    whatsappNumber: z
        .string()
        .regex(/^[6-9][0-9]{9}$/, {
            message: "WhatsApp number must start with 6-9 and be exactly 10 digits",
        }),

    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    companyName: z.string().min(1, { message: "Company name is required" }),
    state: z.string().min(1, { message: "State is required" }),
    city: z.string().min(1, { message: "City is required" }),
});
