import { AccessRules } from '@/types/accessRule'

export type Resource<TRules extends AccessRules> = TRules[number]['resource']
