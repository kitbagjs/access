# @kitbag/access

Type safe attribute-based access control flow

[![NPM Version][npm-badge]][npm-url]
[![Netlify Status][netlify-badge]][netlify-url]
[![Discord chat][discord-badge]][discord-url]

## Getting Started

Get started with the [documentation](https://kitbag-access.netlify.app/)

## Installation

```bash
# bun
bun add @kitbag/access
# yarn
yarn add @kitbag/access
# npm
npm install @kitbag/access
```

## Define Rules

Each rule is comprised of a resource, action, and a callback that returns a boolean. Kitbag Access provides a `createAccessRule` utility that can be used to create a rule.

| Argument | Type | Required |
|----------|------|----------|
| resource | string | Yes |
| action | string | Yes |
| callback | (context: any) => boolean \| Promise\<boolean\> | No |

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

> [!IMPORTANT]  
> Using `as const` when defining rules is important as it ensures the types are correctly inferred.

### Resource

The resource is the name of the resource that the rule is for. There are no restrictions on the value you use.

For example, if the application is a task management system, the resource could be `task`, `project`, `user`, etc.

### Action

The action is the name of the action that the rule is for. Again, there are no restrictions on the value you use.

For example, if the application is a task management system, the action could be `create`, `update`, `delete`, etc.

### Callback

The callback is where you define the business logic for the given resource and action. The callback must return a boolean (or `Promise<boolean>`). The callback can optionally have arguments, any arguments defined by your callback will be required by the access control check.

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

[npm-badge]: https://img.shields.io/npm/v/@kitbag/access.svg
[npm-url]: https://www.npmjs.org/package/@kitbag/access
[netlify-badge]: https://api.netlify.com/api/v1/badges/f003aad4-3c51-4830-bb77-8f8fd3b67b58/deploy-status
[netlify-url]: https://app.netlify.com/sites/kitbag-access/deploys
[discord-badge]: https://img.shields.io/discord/1079625926024900739?logo=discord&label=Discord
[discord-url]: https://discord.gg/zw7dpcc5HV
