import { AccessRules } from '@/types/accessRule'
import { AccessRuleMap } from '@/types/accessRuleMap'
import { Resource } from '@/types/resource'
import { Action } from '@/types/action'
import { AllPropertiesAreOptional } from '@/types/utilities'

type RuleParameters<
  TRules extends AccessRules,
  TResource extends Resource<TRules>,
  TAction extends Action<TRules, TResource>
> = Parameters<AccessRuleMap<TRules, TResource, TAction>['rule']>[0]

export type RuleReturns<
  TRules extends AccessRules,
  TResource extends Resource<TRules>,
  TAction extends Action<TRules, TResource>
> = ReturnType<AccessRuleMap<TRules, TResource, TAction>['rule']>

type CheckAccessArgs<
  TRules extends AccessRules,
  TResource extends Resource<TRules>,
  TAction extends Action<TRules, TResource>
> = AllPropertiesAreOptional<RuleParameters<TRules, TResource, TAction>> extends true
  ? [params?: RuleParameters<TRules, TResource, TAction>]
  : [params: RuleParameters<TRules, TResource, TAction>]

export type CheckAccess<TRules extends AccessRules> = <
  const TResource extends Resource<TRules>,
  const TAction extends AccessRuleMap<TRules, TResource>['action']
>(resource: TResource, action: TAction, ...args: CheckAccessArgs<TRules, TResource, TAction>) => RuleReturns<TRules, TResource, TAction>
