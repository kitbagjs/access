import { addAccessRule } from '@/services/addAccessRule'
import { createAbac } from '@/services/createAbac'

type User = {
  id: string,
}

type Comment = {
  commentId: string,
  userId: string,
}

const rules = [
  addAccessRule('comment', 'update', true),
  addAccessRule('comment', 'add', true),
  addAccessRule('comment', 'delete', ({ user, comment }: { user: User, comment: Comment }) => {
    return user.id === comment.userId
  }),
  addAccessRule('post', 'add', true),
  addAccessRule('post', 'repost', true),
] as const

const { checkAccess } = createAbac(rules)

const check1 = checkAccess('comment', 'add')
const check2 = checkAccess('comment', 'delete', { user: { id: '1' }, comment: { commentId: '2', userId: '1' } })
const check3 = checkAccess('post', 'repost')
