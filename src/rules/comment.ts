import { addAccessRule } from '@/services/addAccessRule'

type User = {
  id: string,
}

type Comment = {
  commentId: string,
  userId: string,
}

export const commentRules = [
  addAccessRule('comment', 'update', () => true),
  addAccessRule('comment', 'add', () => true),
  addAccessRule('comment', 'delete', async ({ user, comment }: { user?: User, comment?: Comment }): Promise<boolean> => {
    // return checkAccess('comment', 'add') && true
    return !!user && !!comment
  }),
  addAccessRule('post', 'add', () => true),
  addAccessRule('post', 'repost', ({ poop }: { poop?: boolean }) => poop ?? false),
] as const
