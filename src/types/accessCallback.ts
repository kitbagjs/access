import { MaybePromise } from '@/types/promise'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AccessCallback = (context: any) => MaybePromise<boolean>
