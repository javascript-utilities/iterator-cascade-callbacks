# Class: Stop\_Iteration

[<internal>](../modules/internal_.md).Stop_Iteration

Custom error type to permanently stop iteration prematurely

**`Example`**

```ts
const icc = new Iterator_Cascade_Callbacks([1, 2, 3, 4]);

const collection = icc.map((value, index_or_key) => {
  if (index_or_key > 2) {
    throw new Stop_Iteration('map says to stop at indexes greater than 2');
  }
  return value;
}).collect([]);

console.log(collection);
//> [ 1, 2, 3 ]
```

## Hierarchy

- `Error`

  ↳ **`Stop_Iteration`**

## Table of contents

### Constructors

- [constructor](internal_.Stop_Iteration.md#constructor)

## Constructors

### constructor

• **new Stop_Iteration**(`message?`)

Builds new instance of `Stop_Iteration` for throwing

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message?` | `string` | Error message to print |

#### Overrides

Error.constructor

#### Defined in

[ts/lib/errors.ts:45](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/63bd328/ts/lib/errors.ts#L45)
