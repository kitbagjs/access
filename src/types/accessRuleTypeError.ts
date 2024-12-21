export class AccessRuleTypeError extends Error {
  public constructor() {
    super('Every value provided to loadAccessRules must satisfy AccessRule')
  }
}
