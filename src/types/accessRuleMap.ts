import { AccessRules } from '@/types/accessRule'
import { AccessCallback } from '@/types/accessCallback'

export type AccessRuleMap<
  TRules extends AccessRules,
  TResource extends string,
  TAction extends string = string
> = Extract<
  TRules[number],
  { resource: TResource, action: TAction, rule: AccessCallback }
>
