import { addAccessRule } from '@/services/addAccessRule'

export const postRules = [
  addAccessRule('post', 'add', () => true),
  addAccessRule('post', 'repost', ({ poop }: { poop?: boolean }) => poop ?? false),
] as const
