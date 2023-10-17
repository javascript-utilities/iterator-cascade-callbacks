# Change Log
[[heading__top]: #change-log ""


---


- [Version `1.0.0`][heading__version_100]
  - [File and directory changes for `1.0.0`][heading__file_and_directory_changes_for_100]
  - [Migrating to `1.0.0` from `0.0.6`tips][heading__migrating_from_006_tips]
  - [TODOs beyond `1.0.0`][heading__todos_beyond_100]
- [Version `0.0.6`][heading__version_006]
- [Version `0.0.5`][heading__version_005]


---


## Version `1.0.0`
[heading__version_100]: #version-100


Adds support for asynchronous iterator/generator sources, as well as
asynchronous callbacks!...  And reorganizes code, documentation, and transpiled
source code among other changes.


### File and directory changes for `1.0.0`
[heading__file_and_directory_changes_for_100]: #file-and-directory-changes-for-100


- Add `examples/` sub-directory, and MVP example NPM workspaces
- Add `docs/` sub-directory, generated from source code doc-comments
- Add `targets/` sub-directory, for both `import` and `require` consumers
- Move `ts/` to `src/` sub-directory, so as to align with standards
- Remove redundant `@types/`, and add new, declarations
- Move `README.md` some sub-sections to relevant sub-directories
- Add `package.json` helper scripts and development dependencies


### Migrating to `1.0.0` from `0.0.6`tips
[heading__migrating_from_006_tips]: #migrating-from-006-tips


- `.zip()` now behaves like `.zipValues()`, chain with `.entries()` if behavior
  from previous versions is desired.
- `.next()` now returns `.value` only, suffix chain with `.entries()` if
  key/index with value is needed.
- `Iterator_Cascade_Callbacks` is now by default under `Synchronous` namespace
  either; update `import` or `require` statements, or source directly from
  `targets/cjs/synchronous.js` or `targets/mjs/synchronous.mjs` files instead.
- removed `.compareValues()`, and related features, `git show:v0.0.6 <path>`
  may be used to resurrect via sub-class if functionality is required.

> Please open an Issue if there are any other breaking changes not noted above!


### TODOs beyond `1.0.0`
[heading__todos_beyond_100]: #todos-beyond-100


> Note; any of the following un-checked check-boxes may make for a good "First
> Pull Request" :wink:

- [ ] Add `examples/` for common JavaScript projects, and demonstrate
  importing/referencing JSDoc comments from `.d.ts` files.
- [ ] Reduce redundant wrapping/awaiting of `Promises` within
  `Asynchronous.Iterator_Cascade_Callbacks`, and `Asynchronous.Wrappers`,
  source code.
- [ ] Incorporate static site builder with GitHub Pages, such as Jekyll, that
  includes `docs/api/` MarkDown files within web-site output.
- [ ] Add support for GitHub Actions that executes `npm ci-cd:all` scripts.
- [ ] Enable linting source code doc-comments, and fix warnings/errors.


______



## Version `0.0.6`
[heading__version_006]: #version-006


**`@types/iterator-cascade-callbacks/iterator-cascade-callbacks.d.ts`**


- [X] [`Synchronous.Iterator_Cascade_Callbacks`][heading__class_synchronousiterator_cascade_callbacks]
  -- Define `static` method types in a way that TypeScript understands and
  produce errors **only** if used improperly
   > Achieved via experimental TypeScript decorator features


**`ts/iterator-cascade-callbacks.ts`**


- [X] Remove `/* istanbul ignore next */` comments from source code; currently
  there are three (`3`) places that JestJS tests ignores

- [ ] Add _`Skip_Iteration`_, or similar, `Error` type and refactor `skip`, and
  `step`, methods to throw such error type

- [X] `zipCompareValues` - Fix `any` usage to utilize the correct type hint of
  [`Synchronous.Iterator_Cascade_Callbacks`][heading__class_synchronousiterator_cascade_callbacks]
   > **Fixed** by changing _`any`_ to _`Synchronous.Iterator_Cascade_Callbacks`_, after
   > enabling experimental TypeScript decorator features, and adjusting
   > _`interface`s_


**`tsconfig.json`**


- [X] Change `removeComments` to `true` once `/* istanbul ignore next */`
  commits are removed from source

- [X] Enable _stricter_ transpiling options
   > Added `strictBindCallApply`, `strictFunctionTypes`, and
   > `strictPropertyInitialization` configurations


______


## Version `0.0.5`
[heading__version_005]: #version-005


**`ts/__tests__/tests-iterator-cascade-callbacks.ts`**


- [X] `testsInspect` - Sort out why JestJS does not recognize tests as covering
  lines within `inspect_wrapper` function.

> _**Fixed**_ by testing `...paramaters` within an `inspect` callback function

