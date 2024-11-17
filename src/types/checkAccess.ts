import { AccessRules } from '@/types/accessRule'
import { AccessRuleMap } from '@/types/accessRuleMap'
import { Resource } from '@/types/resource'
import { AccessCallback } from '@/types/accessCallback'
import { Action } from '@/types/action'

type RuleContext<
  TRules extends AccessRules,
  TResource extends Resource<TRules>,
  TAction extends Action<TRules, TResource>
> = AccessRuleMap<TRules, TResource, TAction>['rule'] extends AccessCallback ? Parameters<AccessRuleMap<TRules, TResource, TAction>['rule']>[0] : never

export type CheckAccess<TRules extends AccessRules> = {
  <
    const TResource extends Resource<TRules>
  >(resource: TResource, action: AccessRuleMap<TRules, TResource>['action']): boolean,
  <
    const TResource extends Resource<TRules>,
    const TAction extends AccessRuleMap<TRules, TResource, string, AccessCallback>['action']
  >(resource: TResource, action: TAction, context: RuleContext<TRules, TResource, TAction>): boolean,
}
