# Defining Rules

Each rule is comprised of a resource, action, and a callback that returns a boolean. Kitbag Access provides a `createAccessRule` utility that can be used to create a rule.

| Argument | Type | Required |
|----------|------|----------|
| resource | string | Yes |
| action | string | Yes |
| callback | (context: any) => boolean \| Promise\<boolean\> | No |

```ts
import { createAccessRule } from '@kitbag/access'

const rule = createAccessRule(RESOURCE, ACTION, CALLBACK)
```

## Resource

The resource is the name of the resource that the rule is for. There are no restrictions on the value you use.

For example, if the application is a task management system, the resource could be `task`, `project`, `user`, etc.

## Action

The action is the name of the action that the rule is for. Again, there are no restrictions on the value you use.

For example, if the application is a task management system, the action could be `create`, `update`, `delete`, etc.

## Callback

The callback is where you define the business logic for the given resource and action. The callback must return a boolean (or `Promise<boolean>`). The callback can optionally have arguments, any arguments defined by your callback will be required by the access control check.

```ts
createAccessRule('project', 'create', (user: User) => {
  return user.role === 'admin'
})
```

If your callback requires more than 1 argument, you should take each argument as the property of an object.

```ts
createAccessRule('project', 'delete', ({ user, project }: { user: User, project: Project }) => {
  return user.role === 'admin' || user.id === project.ownerId
})
```

## Async Rules

If you need to perform an asynchronous operation, you can return a promise from the callback.

```ts
createAccessRule('project', 'create', async (user: User) => {
  const result = await someAsyncOperation(user)

  return result.status === 'success'
})
```

> [!IMPORTANT] Awaiting Checks
> If your rule returns a promise, the `access.can` method will also return a promise. This means your application will need to await the result.
>
> ```ts
> const result = await access.can('project', 'create', currentUser)
> ```
