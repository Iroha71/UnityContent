import { z, defineCollection } from "astro:content";

const postCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    thumbnail: image(),
    directory: z.string().optional(),
    category: z.string(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = {
  post: postCollection,
}