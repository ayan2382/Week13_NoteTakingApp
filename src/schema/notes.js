import { z } from "zod";

export const noteSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(50, 'Title must be 50 characters or less'),
  content: z
    .string()
    .min(1, 'Content is required')
    .max(500, 'Content must be 500 characters or less'),
});







  //TODO: create the title and content schema, 
  // Make sure the title is required and the content is required
  // Make sure the title is max 50 characters and the content is max 500 characters

  