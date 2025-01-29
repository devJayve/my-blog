import { PostTable } from '@/db/schema';

export type Post = typeof PostTable.$inferSelect;

export type PostMeta = Omit<Post, 'content'>;

export type CreatePostRequest = Pick<
  Post,
  'title' | 'content' | 'description' | 'slug' | 'categories'
>;
