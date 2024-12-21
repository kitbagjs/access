import { AccessCallback } from '@/types/accessCallback'
import { AccessRule } from '@/types/accessRule'

export function addAccessRule<
  const TResource extends string,
  const TAction extends string,
  const TRule extends AccessCallback
// eslint-disable-next-line @typescript-eslint/no-unused-vars
>(_resource: TResource, _action: TAction, _rule: TRule): AccessRule<TResource, TAction, TRule> {
  throw new Error('not implemented')
}
