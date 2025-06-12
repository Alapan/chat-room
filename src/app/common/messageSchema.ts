import { z } from "zod";

export const messageSchema = z.object({
  text: z
    .string()
    .nonempty({ message: "Message cannot be empty" })
    .max(1000, { message: "Message cannot exceed 1000 characters" }),
});
