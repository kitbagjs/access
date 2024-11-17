import { AccessRules } from '@/types/accessRule'
import { CheckAccess } from './checkAccess'

export type Abac<TRules extends AccessRules> = {
  checkAccess: CheckAccess<TRules>,
}
