import { createAccessControl } from '@/services/createAccessControl'
import { AccessRuleMap } from './types/accessRuleMap'
import { loadAccessRules } from './services/loadAccessRules'
import * as rulesToLoad from './rules'
import { RuleReturns } from './types/checkAccess'

const rules = loadAccessRules(rulesToLoad)
const { register, checkAccess } = createAccessControl(rules)

register(rules)

// declare module '@kitbag/access-control' {
//   interface Register {
//     profiles: typeof profiles,
//   }
// }

export const check1 = checkAccess('comment', 'add')
export const check2 = checkAccess('comment', 'delete', { user: { id: '1' }, comment: { commentId: '2', userId: '1' } })
checkAccess('post', 'repost')

export type AllCommentUnion = AccessRuleMap<typeof rules, 'comment'>
//           ^?
export type SpecificCommentAction = AccessRuleMap<typeof rules, 'comment', 'delete'>
//           ^?

export type T1 = RuleReturns<typeof rules, 'comment', 'delete'>
