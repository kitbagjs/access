# Auto Importing Rules

Kitbag Access can automatically import rules from your codebase. This is useful if you have a large codebase with many rules and you plan to use the `access` singleton. If you store all of your rules in the same folder with a simple [barrel file](https://github.com/basarat/typescript-book/blob/master/docs/tips/barrel.md).

```text
└── src
   └── rules
      ├── project.ts
      ├── task.ts
      ├── index.ts
      └── organization
        ├── organization.ts
        ├── user.ts
        └── index.ts
```

Kitbag Access can automatically loading these rules in this directory.

```ts
import { loadAccessRules } from '@kitbag/access'
import * as rulesToLoad from '@/rules'

const rules = loadAccessRules(rulesToLoad)

access.register(rules)

declare module '@kitbag/access' {
  interface Register {
    rules: typeof rules
  }
}
```
