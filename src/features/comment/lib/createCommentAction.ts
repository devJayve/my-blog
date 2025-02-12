'use server';
import { revalidatePath } from 'next/cache';

import { db } from '@/db/drizzle';
import { CommentTable } from '@/db/schema';

export interface CommentActionState {
  message: string;
  success: boolean;
}

export async function createCommentAction(
  prevState: CommentActionState | null,
  formData: FormData,
): Promise<CommentActionState> {
  try {
    const content = formData.get('content')?.toString();
    const postId = formData.get('postId')?.toString();
    const userId = formData.get('userId')?.toString();
    const parentId = formData.get('parentId')?.toString();

    if (!content) {
      return {
        message: '댓글 내용을 입력해주세요',
        success: false,
      };
    }

    if (!postId || !userId) {
      return {
        message: '문제가 발생했어요.\n나중에 다시 시도해주세요.',
        success: false,
      };
    }

    await db.insert(CommentTable).values({
      postId: Number(postId),
      userId: userId,
      parentId: Number(parentId) || null,
      content: content,
    });

    revalidatePath(`/post/${postId}`);

    return {
      message: '댓글이 등록되었어요',
      success: true,
    };
  } catch (error) {
    console.error(error);
    return {
      message: '문제가 발생했어요.\n나중에 다시 시도해주세요.',
      success: false,
    };
  }
}
