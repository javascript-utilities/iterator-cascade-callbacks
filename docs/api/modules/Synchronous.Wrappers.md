# Namespace: Wrappers

[Synchronous](Synchronous.md).Wrappers

## Table of contents

### Functions

- [entries](Synchronous.Wrappers.md#entries)
- [filter](Synchronous.Wrappers.md#filter)
- [forEach](Synchronous.Wrappers.md#foreach)
- [inspect](Synchronous.Wrappers.md#inspect)
- [limit](Synchronous.Wrappers.md#limit)
- [map](Synchronous.Wrappers.md#map)
- [skip](Synchronous.Wrappers.md#skip)
- [step](Synchronous.Wrappers.md#step)
- [take](Synchronous.Wrappers.md#take)
- [zip](Synchronous.Wrappers.md#zip)

## Functions

### entries

▸ **entries**<`Value`, `Parameters`, `Key`\>(`callback_object`, `iterator_cascade_callbacks`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Value` | `unknown` |
| `Parameters` | extends `unknown`[] = `unknown`[] |
| `Key` | `unknown` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback_object` | [`Callback_Object`](../classes/Synchronous.Callback_Object.md)<`Value`, `void`, `Parameters`, `Key`\> | Instance reference to `this` of `Callback_Object` |
| `iterator_cascade_callbacks` | [`Iterator_Cascade_Callbacks`](../classes/Synchronous.Iterator_Cascade_Callbacks.md)<`unknown`\> | Instance reference to `this` of `Iterator_Cascade_Callbacks` |

#### Returns

`void`

**`See`**

[For usage details](../classes/Synchronous.Iterator_Cascade_Callbacks.md#entries)

#### Defined in

[ts/synchronous/wrappers.ts:62](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/main/ts/synchronous/wrappers.ts#L62)

___

### filter

▸ **filter**<`Value`, `Parameters`, `Key`\>(`callback_object`, `iterator_cascade_callbacks`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Value` | `unknown` |
| `Parameters` | extends `unknown`[] = `unknown`[] |
| `Key` | `unknown` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback_object` | [`Callback_Object`](../classes/Synchronous.Callback_Object.md)<`Value`, `boolean`, `Parameters`, `Key`\> | Instance reference to `this` of `Callback_Object` |
| `iterator_cascade_callbacks` | [`Iterator_Cascade_Callbacks`](../classes/Synchronous.Iterator_Cascade_Callbacks.md)<`unknown`\> | Instance reference to `this` of `Iterator_Cascade_Callbacks` |

#### Returns

`void`

**`See`**

[For usage details](../classes/Synchronous.Iterator_Cascade_Callbacks.md#filter)

#### Defined in

[ts/synchronous/wrappers.ts:81](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/main/ts/synchronous/wrappers.ts#L81)

___

### forEach

▸ **forEach**<`Value`, `Parameters`, `Key`\>(`callback_object`, `iterator_cascade_callbacks`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Value` | `unknown` |
| `Parameters` | extends `unknown`[] = `unknown`[] |
| `Key` | `unknown` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback_object` | [`Callback_Object`](../classes/Synchronous.Callback_Object.md)<`Value`, `void`, `Parameters`, `Key`\> | Instance reference to `this` of `Callback_Object` |
| `iterator_cascade_callbacks` | [`Iterator_Cascade_Callbacks`](../classes/Synchronous.Iterator_Cascade_Callbacks.md)<`unknown`\> | Instance reference to `this` of `Iterator_Cascade_Callbacks` |

#### Returns

`void`

**`See`**

[For usage details](../classes/Synchronous.Iterator_Cascade_Callbacks.md#foreach)

#### Defined in

[ts/synchronous/wrappers.ts:152](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/main/ts/synchronous/wrappers.ts#L152)

___

### inspect

▸ **inspect**<`Value`, `Parameters`, `Key`\>(`callback_object`, `iterator_cascade_callbacks`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Value` | `unknown` |
| `Parameters` | extends `unknown`[] = `unknown`[] |
| `Key` | `unknown` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback_object` | [`Callback_Object`](../classes/Synchronous.Callback_Object.md)<`Value`, `void`, `Parameters`, `Key`\> | Instance reference to `this` of `Callback_Object` |
| `iterator_cascade_callbacks` | [`Iterator_Cascade_Callbacks`](../classes/Synchronous.Iterator_Cascade_Callbacks.md)<`unknown`\> | Instance reference to `this` of `Iterator_Cascade_Callbacks` |

#### Returns

`void`

**`See`**

[For usage details](../classes/Synchronous.Iterator_Cascade_Callbacks.md#inspect)

#### Defined in

[ts/synchronous/wrappers.ts:173](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/main/ts/synchronous/wrappers.ts#L173)

___

### limit

▸ **limit**<`Value`, `Parameters`, `Key`\>(`callback_object`, `iterator_cascade_callbacks`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Value` | `unknown` |
| `Parameters` | extends `unknown`[] = [`number`, ...unknown[]] |
| `Key` | `unknown` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback_object` | [`Callback_Object`](../classes/Synchronous.Callback_Object.md)<`Value`, `void`, [`number`, ...Parameters[]], `Key`\> | Instance reference to `this` of `Callback_Object` |
| `iterator_cascade_callbacks` | [`Iterator_Cascade_Callbacks`](../classes/Synchronous.Iterator_Cascade_Callbacks.md)<`unknown`\> | Instance reference to `this` of `Iterator_Cascade_Callbacks` |

#### Returns

`void`

**`Note`**

this expects `callback_object.parameters[0]` to contain the limit

**`See`**

[For usage details](../classes/Synchronous.Iterator_Cascade_Callbacks.md#limit)

#### Defined in

[ts/synchronous/wrappers.ts:195](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/main/ts/synchronous/wrappers.ts#L195)

___

### map

▸ **map**<`Value`, `Result`, `Parameters`, `Key`\>(`callback_object`, `iterator_cascade_callbacks`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Value` | `unknown` |
| `Result` | `unknown` |
| `Parameters` | extends `unknown`[] = `unknown`[] |
| `Key` | `unknown` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback_object` | [`Callback_Object`](../classes/Synchronous.Callback_Object.md)<`Value`, `Result`, `Parameters`, `Key`\> | Instance reference to `this` of `Callback_Object` |
| `iterator_cascade_callbacks` | [`Iterator_Cascade_Callbacks`](../classes/Synchronous.Iterator_Cascade_Callbacks.md)<`unknown`\> | Instance reference to `this` of `Iterator_Cascade_Callbacks` |

#### Returns

`void`

**`See`**

[For usage details](../classes/Synchronous.Iterator_Cascade_Callbacks.md#map)

#### Defined in

[ts/synchronous/wrappers.ts:232](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/main/ts/synchronous/wrappers.ts#L232)

___

### skip

▸ **skip**<`Value`, `Parameters`, `Key`\>(`callback_object`, `iterator_cascade_callbacks`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Value` | `unknown` |
| `Parameters` | extends `unknown`[] = [`number`, ...unknown[]] |
| `Key` | `unknown` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback_object` | [`Callback_Object`](../classes/Synchronous.Callback_Object.md)<`Value`, `void`, [`number`, ...Parameters[]], `Key`\> | Instance reference to `this` of `Callback_Object` |
| `iterator_cascade_callbacks` | [`Iterator_Cascade_Callbacks`](../classes/Synchronous.Iterator_Cascade_Callbacks.md)<`unknown`\> | Instance reference to `this` of `Iterator_Cascade_Callbacks` |

#### Returns

`void`

**`Note`**

this expects `callback_object.parameters[0]` to contain the limit

**`See`**

[For usage details](../classes/Synchronous.Iterator_Cascade_Callbacks.md#skip)

#### Defined in

[ts/synchronous/wrappers.ts:264](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/main/ts/synchronous/wrappers.ts#L264)

___

### step

▸ **step**<`Value`, `Parameters`, `Key`\>(`callback_object`, `iterator_cascade_callbacks`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Value` | `unknown` |
| `Parameters` | extends `unknown`[] = [`number`, ...unknown[]] |
| `Key` | `unknown` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback_object` | [`Callback_Object`](../classes/Synchronous.Callback_Object.md)<`Value`, `void`, [`number`, ...Parameters[]], `Key`\> | Instance reference to `this` of `Callback_Object` |
| `iterator_cascade_callbacks` | [`Iterator_Cascade_Callbacks`](../classes/Synchronous.Iterator_Cascade_Callbacks.md)<`unknown`\> | Instance reference to `this` of `Iterator_Cascade_Callbacks` |

#### Returns

`void`

**`Note`**

this expects `callback_object.parameters[0]` to contain the limit

**`See`**

[For usage details](../classes/Synchronous.Iterator_Cascade_Callbacks.md#step)

#### Defined in

[ts/synchronous/wrappers.ts:313](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/main/ts/synchronous/wrappers.ts#L313)

___

### take

▸ **take**<`Value`, `Parameters`, `Key`\>(`callback_object`, `iterator_cascade_callbacks`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Value` | `unknown` |
| `Parameters` | extends `unknown`[] = [`number`, ...unknown[]] |
| `Key` | `unknown` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback_object` | [`Callback_Object`](../classes/Synchronous.Callback_Object.md)<`Value`, `void`, [`number`, ...Parameters[]], `Key`\> | Instance reference to `this` of `Callback_Object` |
| `iterator_cascade_callbacks` | [`Iterator_Cascade_Callbacks`](../classes/Synchronous.Iterator_Cascade_Callbacks.md)<`unknown`\> | Instance reference to `this` of `Iterator_Cascade_Callbacks` |

#### Returns

`void`

**`Note`**

this expects `callback_object.parameters[0]` to contain the limit

**`See`**

[For usage details](../classes/Synchronous.Iterator_Cascade_Callbacks.md#take)

#### Defined in

[ts/synchronous/wrappers.ts:364](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/main/ts/synchronous/wrappers.ts#L364)

___

### zip

▸ **zip**(`iterables`, `iterator_cascade_callbacks`): `IterableIterator`<([`Yielded_Data`](internal_.md#yielded_data) \| `undefined`)[]\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `iterables` | `unknown`[] | Almost anything that implements `[Symbol.iterator]` or [Symbol.iterator] |
| `iterator_cascade_callbacks` | typeof [`Iterator_Cascade_Callbacks`](../classes/Synchronous.Iterator_Cascade_Callbacks.md) | Uninitialized class that is, or inherits from, `Iterator_Cascade_Callbacks` |

#### Returns

`IterableIterator`<([`Yielded_Data`](internal_.md#yielded_data) \| `undefined`)[]\>

**`See`**

[For usage details](../classes/Synchronous.Iterator_Cascade_Callbacks.md#zip)

#### Defined in

[ts/synchronous/wrappers.ts:28](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/main/ts/synchronous/wrappers.ts#L28)
