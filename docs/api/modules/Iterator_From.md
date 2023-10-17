# Namespace: Iterator\_From

## Table of contents

### Functions

- [array](Iterator_From.md#array)
- [asyncGenerator](Iterator_From.md#asyncgenerator)
- [generator](Iterator_From.md#generator)
- [object](Iterator_From.md#object)

## Functions

### array

▸ **array**<`T`\>(`values`): `IterableIterator`<[`Yielded_Data`](internal_.md#yielded_data)<`T`, `number`\>\>

Converts `Array` to `GeneratorFunction`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `unknown` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `values` | `T`[] |

#### Returns

`IterableIterator`<[`Yielded_Data`](internal_.md#yielded_data)<`T`, `number`\>\>

**`Yields`**

#### Defined in

[src/lib/iterator-from.ts:18](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/v1.0.1/src/lib/iterator-from.ts#L18)

___

### asyncGenerator

▸ **asyncGenerator**<`T`\>(`iterator`): `AsyncGenerator`<[`Yielded_Data`](internal_.md#yielded_data)<`T`, `number`\>, `void`, `unknown`\>

Converts Asynchronous Iterator class

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `unknown` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `iterator` | `AsyncIterable`<`T`\> | Objects with `.next()` or `[Symbol.asyncIterator]()` method defined |

#### Returns

`AsyncGenerator`<[`Yielded_Data`](internal_.md#yielded_data)<`T`, `number`\>, `void`, `unknown`\>

**`Yields`**

#### Defined in

[src/lib/iterator-from.ts:57](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/v1.0.1/src/lib/iterator-from.ts#L57)

___

### generator

▸ **generator**<`T`\>(`iterator`): `IterableIterator`<[`Yielded_Data`](internal_.md#yielded_data)<`T`, `number`\>\>

Converts Iterator class or `GeneratorFunction` to `Generator`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `unknown` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `iterator` | `Generator`<`T`, `void`, `unknown`\> | Objects with `.next()` or `[Symbol.iterator]()` method defined |

#### Returns

`IterableIterator`<[`Yielded_Data`](internal_.md#yielded_data)<`T`, `number`\>\>

**`Yields`**

#### Defined in

[src/lib/iterator-from.ts:42](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/v1.0.1/src/lib/iterator-from.ts#L42)

___

### object

▸ **object**<`T`\>(`dictionary`): `IterableIterator`<[`Yielded_Data`](internal_.md#yielded_data)<`T`, `string`\>\>

Converts `Object` to `GeneratorFunction`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `unknown` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `dictionary` | [`Dictionary`](internal_.md#dictionary)<`T`\> | Dictionary of key value pares |

#### Returns

`IterableIterator`<[`Yielded_Data`](internal_.md#yielded_data)<`T`, `string`\>\>

**`Yields`**

#### Defined in

[src/lib/iterator-from.ts:29](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/v1.0.1/src/lib/iterator-from.ts#L29)
