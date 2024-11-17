import { AccessRules } from '@/types/accessRule'
import { Resource } from '@/types/resource'
import { AccessRuleMap } from '@/types/accessRuleMap'

export type Action<
  TRules extends AccessRules,
  TResource extends Resource<TRules>
> = AccessRuleMap<TRules, TResource>['action']
