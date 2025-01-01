# Introduction

Virtually every project eventually reaches the point where it needs an access control solution. Most developers will reach for role-based access control (RBAC) and simplistic methods.

```ts
if (user.role === 'admin') { ... }
```

Others will reach for more complex solutions like attribute-based access control (ABAC), which allows for more complex rules. 

```ts
if (user.role === 'admin' || user.id === comment.authorId) { ... }
```

Either way, these methods are usually just defined where their needed, duplicated, and without structure. Kitbag Access doesn't prescribe a solution, it simply provides a way to define whatever rules you need and check them in a type safe way.

```ts
import access from '@kitbag/access'

if (access.can(user, 'delete', comment)) { ... }
```
