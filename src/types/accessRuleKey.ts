import { AccessRule } from '@/types/accessRule'

export type AccessRuleKey<T extends AccessRule> = `${T['resource']}-${T['action']}`
