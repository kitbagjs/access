import { AccessRule } from './accessRule'

export interface Register {
  // rules: AccessRules
}

export type RegisteredRules = Register extends { rules: infer TRules extends readonly AccessRule[] }
  ? TRules
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  : any
