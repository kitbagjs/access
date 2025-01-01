import { AccessRule, AccessRules } from '@/types/accessRule'
import { CheckAccess } from './checkAccess'

export type AccessControl<TRules extends AccessRules> = {
  register: (accessRules: AccessRule[] | readonly AccessRule[] | AccessRule) => void,
  has: (sourceKey: string, destinationKey: string) => boolean,
  clear: () => void,
  can: CheckAccess<TRules>,
}
