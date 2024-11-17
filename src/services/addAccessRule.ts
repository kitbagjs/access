import { AccessCallback } from '@/types/accessCallback'
import { AccessRule } from '@/types/accessRule'

export function addAccessRule<
  const TResource extends string,
  const TAction extends string,
  const TRule extends boolean | AccessCallback
>(resource: TResource, action: TAction, rule: TRule): AccessRule<TResource, TAction, TRule> {
  throw new Error('not implemented')
}
