import { AccessCallback } from '@/types/accessCallback'

export type AccessRule<
  TResource extends string = string,
  TAction extends string = string,
  TRule extends AccessCallback = AccessCallback
> = {
  resource: TResource,
  action: TAction,
  rule: TRule,
}

export type AccessRules = readonly AccessRule[]
