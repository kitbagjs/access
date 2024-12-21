import { AccessControl } from '@/types/accessControl'
import { AccessRules } from '@/types/accessRule'
import { createCheckAccess } from '@/services/checkAccess'

export function createAccessControl<const TRules extends AccessRules>(rules: TRules): AccessControl<TRules> {
  const checkAccess = createCheckAccess(rules)

  return {
    checkAccess,
  }
}
