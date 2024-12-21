import { AccessRules } from '@/types/accessRule'
import { CheckAccess } from '@/types/checkAccess'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function createCheckAccess<const TRules extends AccessRules>(_rules: TRules): CheckAccess<TRules> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return (_resource: string, _action: string, _context?: unknown) => {
    throw new Error('not implemented')
  }
}
