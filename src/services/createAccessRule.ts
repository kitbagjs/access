import { AccessCallback } from '@/types/accessCallback'
import { AccessRule } from '@/types/accessRule'

export function createAccessRule<
  const TResource extends string,
  const TAction extends string,
  const TRule extends AccessCallback
>(resource: TResource, action: TAction, rule: TRule): AccessRule<TResource, TAction, TRule> {
  return { resource, action, rule }
}
