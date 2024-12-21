import { addAccessRule } from '@/services/addAccessRule'
import { createAccessControl } from '@/services/createAccessControl'
import { AccessRuleMap } from './types/accessRuleMap'

type User = {
  id: string,
}

type Comment = {
  commentId: string,
  userId: string,
}

const rules = [
  addAccessRule('comment', 'update', () => true),
  addAccessRule('comment', 'add', () => true),
  addAccessRule('comment', 'delete', async (context: { user: User, comment: Comment }): Promise<boolean> => {
    return checkAccess('comment', 'add') && true
  }),
  addAccessRule('post', 'add', () => true),
  addAccessRule('post', 'repost', ({ poop }: { poop?: boolean }) => poop ?? false),
] as const

const { checkAccess } = createAccessControl(rules)

const check1 = checkAccess('comment', 'add')
const check2 = checkAccess('comment', 'delete', { user: { id: '1' }, comment: { commentId: '2', userId: '1' } })
checkAccess('post', 'repost', { poop: false })

export type AllCommentUnion = AccessRuleMap<typeof rules, 'comment'>
//           ^?
export type SpecificCommentAction = AccessRuleMap<typeof rules, 'comment', 'delete'>
//           ^?
