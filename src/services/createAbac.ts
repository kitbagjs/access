import { Abac } from '@/types/abac'
import { AccessRules } from '@/types/accessRule'
import { createCheckAccess } from '@/services/checkAccess'

export function createAbac<const TRules extends AccessRules>(rules: TRules): Abac<TRules> {
  const checkAccess = createCheckAccess(rules)

  return {
    checkAccess,
  }
}
