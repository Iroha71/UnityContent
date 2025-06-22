import { z, defineCollection } from "astro:content";

const category = z.object({
  name: z.string(),
  id: z.string(),
})

const postCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    thumbnail: image(),
    category: category,
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = {
  post: postCollection,
  invector: postCollection,
}