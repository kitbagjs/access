# Getting Started

## Installation

Install Kitbag Access with your favorite package manager

```bash
# bun
bun add @kitbag/access
# yarn
yarn add @kitbag/access
# npm
npm install @kitbag/access
```

## Define Rules

The guide will cover [defining rules](/defining-rules) in greater depth, for now let's just write some simple examples.

```ts
import { createAccessRule } from '@kitbag/access'

const rules = [
  createAccessRule('task', 'create', () => true),
  createAccessRule('repository', 'fork', (user: User) => user.location === 'US'),
  createAccessRule('comment', 'delete', ({ user, comment }: { user: User, comment: Comment }) => {
    if(user.role === 'admin') {
      return true
    }

    return user.id === comment.authorId
  }),
] as const
```

> [!IMPORTANT] Type Safety
> Using `as const` when defining rules is important as it ensures the types are correctly inferred.

## Applying Rules

Kitbag Access exports a singleton instance of `AccessControl`. This instance makes it easy to apply rules automatically and always those rules available anywhere in your codebase.

```ts {2,8}
import { createAccessRule } from '@kitbag/access'
import access from '@kitbag/access'

const rules = [
  ...
] as const

access.register(rules)
```

### Type Safety for Global Rules

When using the singleton, we're going to use [declaration merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html) to update the `Register` interface, which will ensure type safety.

```ts {10-14}
import { createAccessRule } from '@kitbag/access'
import access from '@kitbag/access'

const rules = [
  ...
] as const

access.register(rules)

declare module '@kitbag/access' {
  interface Register {
    rules: typeof rules
  }
}
```

## Creating Access Control Instances

Alternatively, you can use `createAccessControl` to create a new instance of `AccessControl`.

```ts {2,8}
import { createAccessRule } from '@kitbag/access'
import { createAccessControl } from '@kitbag/access'

const rules = [
  ...
] as const

const access = createAccessControl(rules)
```

## Using the Access Control

Once you have an Access Control instance, you can use it to check access to resources. Any rules that have required arguments will expect those values to be passed in.

```ts
import access from '@kitbag/access'

access.can('task', 'create')
access.can('repository', 'fork', user)
access.can('comment', 'delete', { user, comment })
```
