import { z } from "zod";
import { datePattern } from "../../../config/constants.js";

export const taskSchema = z.object({
    body: z.object({
        category: z.string(),
        title: z.string().min(3).max(255),
        description: z.string().min(3).max(500),
        days: z.string().regex(/^([1-7](\s[1-7])*)?$/).optional().nullable(),
        todayDate: z.string().regex(datePattern),
        maxDate: z.string().regex(datePattern).optional().nullable(),
        repeat: z.boolean(),
    }),
});
