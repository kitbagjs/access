export class AccessRuleNotFoundError extends Error {
  public constructor(resource: string, action: string) {
    super(`Access rule not found for resource: ${resource} and action: ${action}`)
  }
}
