import { AccessControl } from '@/types/accessControl'
import { AccessRule, AccessRules } from '@/types/accessRule'
import { asArray } from '@/services/utilities'
import { AccessRuleKey } from '@/types/accessRuleKey'
import { AccessRuleNotFoundError } from '@/types/accessRuleNotFoundError'
import { RuleReturns } from '@/types/checkAccess'

export function createAccessControl<const TRules extends AccessRules>(accessRules: TRules): AccessControl<TRules> {
  const ruleMap = new Map<AccessRuleKey<AccessRule>, AccessRule>(accessRules.map((accessRule) => [`${accessRule.resource}-${accessRule.action}`, accessRule]))

  function getAccessRule(resource: AccessRule['resource'], action: AccessRule['action']): AccessRule {
    const key: AccessRuleKey<AccessRule> = `${resource}-${action}`
    const accessRule = ruleMap.get(key)

    if (!accessRule) {
      throw new AccessRuleNotFoundError(resource, action)
    }

    return accessRule
  }

  const register: AccessControl<TRules>['register'] = (maybeAccessRules) => {
    const rules = asArray(maybeAccessRules)

    for (const rule of rules) {
      ruleMap.set(`${rule.resource}-${rule.action}`, rule)
    }
  }

  const has: AccessControl<TRules>['has'] = (resource, action) => {
    try {
      getAccessRule(resource, action)

      return true
    } catch {
      return false
    }
  }

  const clear: AccessControl<TRules>['clear'] = () => {
    ruleMap.clear()
  }

  const checkAccess: AccessControl<TRules>['checkAccess'] = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resource: string, action: string, context?: any,
  ) => {
    const { rule } = getAccessRule(resource, action)

    return rule(context) as RuleReturns<TRules, string, string>
  }

  return {
    register,
    has,
    clear,
    checkAccess,
  }
}
