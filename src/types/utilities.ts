export type IsEmptyObject<T> = T extends Record<string, never> ? (keyof T extends never ? true : false) : false

export type OnlyRequiredProperties<T> = {
  [K in keyof T as Extract<T[K], undefined> extends never ? K : never]: T[K]
}

export type AllPropertiesAreOptional<T> = undefined extends T
  ? true
  : Record<string, unknown> extends T
    ? true
    : false
