import { addAccessRule } from '@/services/addAccessRule'
import { createAccessControl } from '@/services/createAccessControl'
import { loadAccessRules } from '@/services/loadAccessRules'

import { AccessCallback } from '@/types/accessCallback'
import { AccessControl } from '@/types/accessControl'
import { AccessRule } from '@/types/accessRule'
import { AccessRuleNotFoundError } from '@/types/accessRuleNotFoundError'
import { AccessRuleTypeError } from '@/types/accessRuleTypeError'
import { CheckAccess } from '@/types/checkAccess'
import { Register, RegisteredRules } from '@/types/register'

const access = createAccessControl([])

export default access as AccessControl<RegisteredRules>
export { addAccessRule, createAccessControl, loadAccessRules }
export type { AccessCallback, AccessControl, AccessRule, AccessRuleNotFoundError, AccessRuleTypeError, CheckAccess, Register }
