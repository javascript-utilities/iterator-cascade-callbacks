# Iterator Cascade Callbacks
[heading__top]: #iterator-cascade-callbacks "&#x2B06; JavaScript/TypeScript Iterables with Rust-like ergonomics: `.filter`, `.map`, and more!"


JavaScript/TypeScript Iterables with Rust-like ergonomics: `.filter`, `.map`,
and more!


## [![Byte size of Iterator Cascade Callbacks][badge__main__iterator_cascade_callbacks__source_code]][iterator_cascade_callbacks__main__source_code] [![Open Issues][badge__issues__iterator_cascade_callbacks]][issues__iterator_cascade_callbacks] [![Open Pull Requests][badge__pull_requests__iterator_cascade_callbacks]][pull_requests__iterator_cascade_callbacks] [![Latest commits][badge__commits__iterator_cascade_callbacks__main]][commits__iterator_cascade_callbacks__main] [![Build Status][badge_travis_ci]][build_travis_ci]


---


- [&#x2B06; Top of Document][heading__top]
- [&#x1F3D7; Requirements][heading__requirements]
- [&#9889; Quick Start][heading__quick_start]
- [&#x1F9F0; Usage][heading__usage]
  - [`import` code and types as TypeScript module][heading__import_code_and_types_as_typescript_module]
  - [`require` as NodeJS library][heading__require_as_nodejs_library]
  - [`Synchronous.Iterator_Cascade_Callbacks` examples][heading__synchronousiterator_cascade_callbacks_examples]
  - [`Asynchronous.Iterator_Cascade_Callbacks` examples][heading__asynchronousiterator_cascade_callbacks_examples]
- [&#x1F5D2; Notes][heading__notes]
- [Common issues and possible fixes][heading__common_issues_and_possible_fixes]
  - [Could not find a declaration file for module][heading__could_not_find_a_declaration_file_for_module]
- [&#x1F4C8; Contributing][heading__contributing]
  - [&#x1F531; Forking][heading__forking]
  - [&#x1F4B1; Sponsor][heading__sponsor]
- [&#x1F4C7; Attribution][heading__attribution]
- [&#x2696; Licensing][heading__license]


---


## Requirements
[heading__requirements]: #requirements "&#x1F3D7; Prerequisites and/or dependencies that this project needs to function properly"


NodeJS development dependencies may be installed via NPM...


```Bash
npm install
```


**Notice** as of version `1.0.0` NodeJS dependencies are for **development
only**, ie. if utilizing this project within other applications or as a
Git submodule, then **no** third-party dependencies are required.


______


## Quick Start
[heading__quick_start]:
  #quick-start
  "&#9889; Perhaps as easy as one, 2.0,..."


NodeJS projects may use `npm` to install `iterator-cascade-callbacks` as a
dependency...


```Bash
npm install @javascript-utilities/iterator-cascade-callbacks
```


... or as a development dependency via `--save-dev` command-line flag...


```Bash
npm install --save-dev @javascript-utilities/iterator-cascade-callbacks
```


... Check [Usage][heading__usage] for quick tips on how to import this project
within your own source code.

[API](docs/api/) documentation _should_ be reasonably up-to-date with
quick examples, and tips.


______


## Usage
[heading__usage]: #usage "&#x1F9F0; Examples on how to utilize this repository"


> Note; the `examples/` directory contains sample projects, which likely will
> be more instructive than this set of sub-sections.


---


### `import` code and types as TypeScript module
[heading__import_code_and_types_as_typescript_module]: #import-code-and-types-as-typescript-module


```typescript
import { Asynchronous, Synchronous } from '@javascript-utilities/iterator-cascade-callbacks';

import type {
  Asynchronous as Asynchronous_Types,
  Synchronous as Synchronous_Types,
  Shared as Shared_Types
} from '@javascript-utilities/iterator-cascade-callbacks';
```


---


### `require` as NodeJS library
[heading__require_as_nodejs_library]: #require-as-nodejs-library


```javascript
const { Asynchronous, Synchronous } = require('@javascript-utilities/iterator-cascade-callbacks');
```


---


### `Synchronous.Iterator_Cascade_Callbacks` examples
[heading__synchronousiterator_cascade_callbacks_examples]: #synchronousiterator_cascade_callbacks-examples


- [`examples/mjs_webpack_counter/`](examples/mjs_webpack_counter/) ⇒
  Demonstrate utilizing Iterator Cascade Callbacks with synchronous Counter
  Iterator
- [`examples/mts_node_fibonacci/`](examples/mts_node_fibonacci/) ⇒  Demonstrate
  utilizing Iterator Cascade Callbacks with synchronous Fibonacci generator


---


### `Asynchronous.Iterator_Cascade_Callbacks` examples
[heading__asynchronousiterator_cascade_callbacks_examples]: #asynchronousiterator_cascade_callbacks-examples


- [`examples/mts_node_fetch/`](examples/mts_node_fetch/) ⇒ Demonstrate
  utilizing Iterator Cascade Callbacks with asynchronous fetch generator


______


## Notes
[heading__notes]: #notes "&#x1F5D2; Additional things to keep in mind when developing"


This repository may not be feature complete and/or fully functional, Pull
Requests that add features or fix bugs are certainly welcomed.

At time of writing (late 2023-10-16) it seems TypeScript will not fully parse
`exports` from the `package.json` file, so while this project does publish
features as self contained files, TypeScript consumers will need to `import` or
`require` from the related `index` file.

However, those that are authoring _pure_ JavaScript projects may make use of
target/feature specific transpiled files; `asynchronous.mjs`,
`asynchronous.js`, `synchronous.mjs`, and/or `synchronous.js` instead.  Which
_should_ reduce network/system overhead for applications that require only a
sub-set of features offered by the Iterator Cascade Callbacks library.


______


## Common issues and possible fixes
[heading__common_issues_and_possible_fixes]: #common-issues-and-possible-fixes


### Could not find a declaration file for module
[heading__could_not_find_a_declaration_file_for_module]: #could-not-find-a-declaration-file-for-module


**Error message example**

```
src/index.ts:3:30 - error TS7016: Could not find a declaration file for module '@javascript-utilities/iterator-cascade-callbacks'. '...' implicitly has an 'any' type.

Try `npm i --save-dev @types/iterator-cascade-callbacks` if it exists or add a new declaration (.d.ts) file containing `declare module '@javascript-utilities/iterator-cascade-callbacks';`

3 import { Asynchronous } from '@javascript-utilities/iterator-cascade-callbacks';
                               ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

**Possible fix** define `--moduleResolution` as either `node16` or `nodenext`

> `tsconfig.json` (snip)

```json
{
  "compilerOptions": {
    "moduleResolution": "NodeNext",
    "...": "..."
  }
}
```


______


## Contributing
[heading__contributing]: #contributing "&#x1F4C8; Options for contributing to Iterator Cascade Callbacks and JavaScript Utilities"


Options for contributing to Iterator Cascade Callbacks and JavaScript Utilities


---


### Forking
[heading__forking]: #forking "&#x1F531; Tips for forking iterator-cascade-callbacks"


Start making a [Fork][iterator_cascade_callbacks__fork_it] of this repository
to an account that you have write permissions for.


- Add remote for fork URL. The URL syntax is
  _`git@github.com:<NAME>/<REPO>.git`_...


```Bash
cd ~/git/hub/javascript-utilities/iterator-cascade-callbacks

git remote add fork git@github.com:<NAME>/iterator-cascade-callbacks.git
```


- Commit your changes and push to your fork, eg. to fix an issue...


```Bash
cd ~/git/hub/javascript-utilities/iterator-cascade-callbacks


git commit -F- <<'EOF'
:bug: Fixes #42 Issue


**Edits**


- `<SCRIPT-NAME>` script, fixes some bug reported in issue
EOF


git push fork main
```


> Note, the `-u` option may be used to set `fork` as the default remote, eg.
> _`git push -u fork main`_ however, this will also default the `fork` remote
> for pulling from too! Meaning that pulling updates from `origin` must be done
> explicitly, eg. _`git pull origin main`_


- Then on GitHub submit a Pull Request through the Web-UI, the URL syntax is
  _`https://github.com/<NAME>/<REPO>/pull/new/<BRANCH>`_


> Note; to decrease the chances of your Pull Request needing modifications
> before being accepted, please check the
> [dot-github](https://github.com/javascript-utilities/.github) repository for
> detailed contributing guidelines.


---


### Sponsor
[heading__sponsor]: #sponsor "&#x1F4B1; Methods for financially supporting javascript-utilities that maintains iterator-cascade-callbacks"


Thanks for even considering it!


Via Liberapay you may
<sub>[![sponsor__shields_io__liberapay]][sponsor__link__liberapay]</sub> on a
repeating basis.


Regardless of if you're able to financially support projects such as
iterator-cascade-callbacks that javascript-utilities maintains, please consider
sharing projects that are useful with others, because one of the goals of
maintaining Open Source repositories is to provide value to the community.


______


## Attribution
[heading__attribution]: #attribution "&#x1F4C7; Resources that where helpful in building this project so far."


- [GitHub -- `github-utilities/make-readme`](https://github.com/github-utilities/make-readme)

- [Dev IO -- Iterators in Typescript](https://dev.to/gsarciotto/iterators-in-typescript-1d78)

- [GitHub -- `Microsoft/TypeScript` -- Issue `3841` -- T.constructor should be of type T](https://github.com/Microsoft/TypeScript/issues/3841)

- [geekAbyte -- Typeing Iterables and Iterators with TypeScript](https://www.geekabyte.io/2019/06/typing-iterables-and-iterators-with.html)

- [Medium -- How to chain functions in JavaScript](https://medium.com/@jamischarles/how-to-chain-functions-in-javascript-6644d44793fd)

- [Mozilla Developer Network -- Iterators and Generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators)

- [StackOverflow -- check if function is a generator](https://stackoverflow.com/questions/16754956/)

- [StackOverflow -- Checking whether something is iterable](https://stackoverflow.com/questions/18884249/)

- [StackOverflow -- Interfaces with construct signatures not type checking](https://stackoverflow.com/questions/12952248/)

- [StackOverflow -- How can I add new line/linebreak character in title attribute in HTML](https://stackoverflow.com/questions/18606877/)

- [Anthony Fu -- Ship ESM & CJS in one Package](https://antfu.me/posts/publish-esm-and-cjs)

- [NPM -- Workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces)

- [GitHub -- TypeScript Issue `50794` -- Support package.json `exports` outside of Node](https://github.com/microsoft/TypeScript/issues/50794)

- [GitHub -- TypeScript Issue `49971` Type imports not taking "`exports`" of `package.json` into account](https://github.com/microsoft/TypeScript/issues/49971#issuecomment-1192993398)

- [GitHub -- TSDoc Issue `298` -- ESlint plugin: The TSDoc tag "@notExported" is not recognized](https://github.com/microsoft/tsdoc/issues/298)

- [API Extractor -- Defining your own TSDoc tags](https://api-extractor.com/pages/configs/tsdoc_json/#defining-your-own-tsdoc-tags)


______


## License
[heading__license]: #license "&#x2696; Legal side of Open Source"


```
Iterator that chains callback function execution
Copyright (C) 2023 S0AndS0

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published
by the Free Software Foundation, version 3 of the License.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
```


For further details review full length version of
[AGPL-3.0][branch__current__license] License.



[branch__current__license]:
  /LICENSE
  "&#x2696; Full length version of AGPL-3.0 License"


[badge__commits__iterator_cascade_callbacks__main]:
  https://img.shields.io/github/last-commit/javascript-utilities/iterator-cascade-callbacks/main.svg

[commits__iterator_cascade_callbacks__main]:
  https://github.com/javascript-utilities/iterator-cascade-callbacks/commits/main
  "&#x1F4DD; History of changes on this branch"


[iterator_cascade_callbacks__community]:
  https://github.com/javascript-utilities/iterator-cascade-callbacks/community
  "&#x1F331; Dedicated to functioning code"


[issues__iterator_cascade_callbacks]:
  https://github.com/javascript-utilities/iterator-cascade-callbacks/issues
  "&#x2622; Search for and _bump_ existing issues or open new issues for project maintainer to address."

[iterator_cascade_callbacks__fork_it]:
  https://github.com/javascript-utilities/iterator-cascade-callbacks/
  "&#x1F531; Fork it!"

[pull_requests__iterator_cascade_callbacks]:
  https://github.com/javascript-utilities/iterator-cascade-callbacks/pulls
  "&#x1F3D7; Pull Request friendly, though please check the Community guidelines"

[iterator_cascade_callbacks__main__source_code]:
  https://github.com/javascript-utilities/iterator-cascade-callbacks/
  "&#x2328; Project source!"

[badge__issues__iterator_cascade_callbacks]:
  https://img.shields.io/github/issues/javascript-utilities/iterator-cascade-callbacks.svg

[badge__pull_requests__iterator_cascade_callbacks]:
  https://img.shields.io/github/issues-pr/javascript-utilities/iterator-cascade-callbacks.svg

[badge__main__iterator_cascade_callbacks__source_code]:
  https://img.shields.io/github/repo-size/javascript-utilities/iterator-cascade-callbacks


[sponsor__shields_io__liberapay]:
  https://img.shields.io/static/v1?logo=liberapay&label=Sponsor&message=javascript-utilities

[sponsor__link__liberapay]:
  https://liberapay.com/javascript-utilities
  "&#x1F4B1; Sponsor developments and projects that javascript-utilities maintains via Liberapay"


[badge_travis_ci]:
  https://travis-ci.com/javascript-utilities/iterator-cascade-callbacks.svg?branch=main

[build_travis_ci]:
  https://travis-ci.com/javascript-utilities/iterator-cascade-callbacks


[iterator_cascade_callbacks__docs__api__readme]:
  docs/api/README.md
  "API documentation generated from source code doc-comments"

