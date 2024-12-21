import { AccessRuleTypeError } from '@/types/accessRuleTypeError'
import { AnyFunction } from '@/types/utilities'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Imported = Record<PropertyKey, any>
type MaybeImport = Imported | (() => Imported)
type RecordValue<T> = T extends Record<PropertyKey, infer TValue> ? TValue : T
type UnArray<T> = T extends readonly (infer TValue)[] ? FlatArray<TValue, 999> : T
type ImportValue<T> = UnArray<RecordValue<T>>

function toValue(maybeImport: MaybeImport): Imported {
  if (typeof maybeImport === 'function') {
    return maybeImport()
  }

  return maybeImport
}

export function loadAccessRules<
  TImported extends MaybeImport,
  TReturns = TImported extends AnyFunction ? ImportValue<ReturnType<TImported>> : ImportValue<TImported>
>(load: TImported): TReturns[] {
  const value = toValue(load)
  const rulesToLoad = Object.values(value).flat(Infinity)

  if (!rulesToLoad.every(isValidAccessRule)) {
    throw new AccessRuleTypeError()
  }

  return rulesToLoad
}

function isValidAccessRule(value: unknown): boolean {
  return !!value && typeof value === 'object'
    && 'resource' in value && typeof value.resource === 'string'
    && 'TAction' in value && typeof value.TAction === 'string'
    && 'rule' in value && typeof value.rule === 'function'
}
