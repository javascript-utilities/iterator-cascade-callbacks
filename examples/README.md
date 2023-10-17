# Examples
[heading__top]:
  #examples
  "Usage examples for the JavaScript Utilities Iterator Cascade Callbacks project"


---


- [&#x2B06; Top of Document][heading__top]

- [Contributing new examples][heading__contributing_new_examples]
  - [Initialize an example workspace with given `NAME`] [heading__initialize_an_example_workspace_with_given_name]
  - [Update `package.json` to define `"type": "module"`] [heading__update_packagejson_to_define_type_module_if_using_import_syntax]
  - [Update `package.json` to define `"private": true`][heading__update_packagejson_to_define_private_true]
  - [Define root of repository as `file:` path dependency] [heading__define_root_of_repository_as_file_path_dependency]
  - [Install dependencies, if any, to workspace of selected `NAME`] [heading__install_dependencies_if_any_to_workspace_of_selected_name]
  - [Define a TypeScript configuration file] [heading__define_a_typescript_configuration_file]
  - [Make a `src/` directory and `index.ts` file] [heading__make_a_src_directory_and_indexts_file]
  - [Either `import` or `require` library features within example script] [heading__either_import_or_require_library_features_within_example_script]

- [Development tips and tricks][heading__development_tips_and_tricks]


---


## Contributing new examples
[heading__contributing_new_examples]: #contributing-new-examples


> Note; please start with following the
> [`README.md` -- `Forking`][file__readme__heading__forking]
>  instructions.
>
> Examples _should_ be simple and, other than Iterator Cascade Callbacks
> features, must not contain local file-path dependencies.


### Initialize an example workspace with given `NAME`
[heading__initialize_an_example_workspace_with_given_name]: #initialize-an-example-workspace-with-given-name


```bash
npm init --workspace examples/NAME
```

> Example input/output from `npm init --workspace examples/mts_node_fibonacci`

```
package name: (fibonacci) mts_node_fibonacci
version: (1.0.0) 0.0.2
description: Example of utilizing Iterator Cascade Callbacks with Fibonacci generator
entry point: (index.js) dist/index.mjs
test command: 
git repository: (https://github.com/javascript-utilities/iterator-cascade-callbacks.git) 
keywords: example, iterator, generator
author: S0AndS0
license: (ISC) AGPL-3.0
```

> Notice; for consistency `NAME` should be structured with underscores (`_`)
> between components and dashes/hyphens (`-`) between words.
>
>     <target-type>_<target-environment-or-bundler>_<example-name>
>
> For example;
>
> - `mjs_webpack_counter`
>   - target type: `../targets/mjs`
>   - bundler: `webpack`
>   - example name: `counter`
>
> - `.mts_node_fibonacci`
>   - target type: `../targets/mjs`
>   - target environment: `node`
>   - example name: `fibonacci`


### Update `package.json` to define `"type": "module"`
[heading__update_packagejson_to_define_type_module_if_using_import_syntax]: #update-packagejson-to-define-type-module-if-using-import-syntax


> Note; this seems to be _mostly_ required if using `import` syntax within
> TypeScript projects, and may not be necessary if utilizing `require` instead.


```bash
npm --workspace examples/mts_node_fibonacci pkg set type="module"
```

> Example `examples/mts_node_fibonacci/package.json` snip

```json
  "type": "module",
```


### Update `package.json` to define `"private": true`
[heading__update_packagejson_to_define_private_true]: #update-packagejson-to-define-private-true


```bash
npm --workspace examples/mts_node_fibonacci pkg --json set private=true
```

> Example `examples/mts_node_fibonacci/package.json` snip

```json
  "private": true,
```


### Define root of repository as `file:` path dependency
[heading__define_root_of_repository_as_file_path_dependency]: #define-root-of-repository-as-file-path-dependency


```bash
npm --workspace examples/mts_node_fibonacci pkg set 'dependencies.@javascript-utilities/iterator-cascade-callbacks=file:../../'
```

> Example `examples/mts_node_fibonacci/package.json` snip

```json
  "dependencies": {
    "@javascript-utilities/iterator-cascade-callbacks": "file:../../"
  },
```


### Install dependencies, if any, to workspace of selected `NAME`
[heading__install_dependencies_if_any_to_workspace_of_selected_name]: #install-dependencies-if-any-to-workspace-of-selected-name


```bash
npm install --workspace NAME DEPENDENCY
```

> Example `npm install --workspace mts_node_fibonacci --save-dev typescript @types/node`


### Define a TypeScript configuration file
[heading__define_a_typescript_configuration_file]: #define-a-typescript-configuration-file


> Example `examples/mts_node_fibonacci/tsconfig.json`

```json
{
  "comments": ["This file is intended for use by IDEs and developers"],
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "lib": ["dom", "dom.iterable", "es2021"],
    "sourceMap": true,
    "moduleResolution": "NodeNext",
    "sourceMap": true,
    "strictBindCallApply": true,
    "strictFunctionTypes": true,
    "strictNullChecks": true,
    "strictPropertyInitialization": true,
    "noImplicitAny": true,
    "removeComments": true,
    "experimentalDecorators": true,
    "skipLibCheck": true,
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "rootDir": "src",
    "outDir": "dist"
  },
  "include": ["src/**/*", "@types/**/*"],
  "exclude": []
}
```


### Make a `src/` directory and `index.ts` file
[heading__make_a_src_directory_and_indexts_file]: #make-a-src-directory-and-indexts-file


```bash
mkdir examples/mts_node_fibonacci/src

touch examples/mts_node_fibonacci/src/index.ts
```


### Either `import` or `require` library features within example script
[heading__either_import_or_require_library_features_within_example_script]: #either-import-or-require-library-features-within-example-script


```typescript
import { Synchronous } from '@javascript-utilities/iterator-cascade-callbacks';

import type { Synchronous as Synchronous_Types } from '@javascript-utilities/iterator-cascade-callbacks';
```


______


## Development tips and tricks
[heading__development_tips_and_tricks]: #development-tips-and-tricks


- While developing/testing the `ts-node` application may be useful

   ```bash
   npx --workspace examples/mts_node_fibonacci ts-node --esm src/index.ts
   ```




[file__readme__heading__forking]:
  ../README.md#forking
  "&#x1F531; Tips for forking iterator-cascade-callbacks"

