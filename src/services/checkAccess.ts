import { AccessRules } from '@/types/accessRule'
import { CheckAccess } from '@/types/checkAccess'

export function createCheckAccess<const TRules extends AccessRules>(rules: TRules): CheckAccess<TRules> {
  return (resource: string, action: string, context?: unknown) => {
    throw new Error('not implemented')
  }
}
