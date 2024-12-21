import { AccessRules } from '@/types/accessRule'
import { CheckAccess } from './checkAccess'

export type AccessControl<TRules extends AccessRules> = {
  checkAccess: CheckAccess<TRules>,
}
