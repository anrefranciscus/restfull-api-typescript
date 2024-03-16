import {z, ZodType} from "zod";

export class ContactValidation {

    static readonly Create : ZodType = z.object({
        first_name: z.string().min(1).max(100),
        last_name: z.string().min(1).max(100),
        email: z.string().min(1).max(100).email().optional(),
        phone: z.string().min(1).max(20).optional(),
    })
}