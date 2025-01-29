import { PostMeta } from '@/features/post/types';
import { ApiResponse } from '@/shared/types/response';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getAllPosts(): Promise<PostMeta[]> {
  const response = await fetch(`${BASE_URL}/api/post`, {
    next: { revalidate: 0 },
  });

  const result = (await response.json()) as ApiResponse<PostMeta[]>;

  if (!response.ok || result.error) {
    throw new Error(result.error || 'Failed to fetch posts');
  }

  console.log('result', result);
  console.log('result.data', result.data);

  return result.data!;
}
