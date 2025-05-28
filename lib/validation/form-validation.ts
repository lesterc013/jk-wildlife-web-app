import { z } from "zod";

// Create the form schema
export const messageFormatterFormSchema = z.object({
  messageToFormat: z
    .string({ message: "Message is required!" })
    .min(1, "Message is required!"),
});

// Infer the generic
export type MessageFormatterFormShape = z.infer<
  typeof messageFormatterFormSchema
>;
