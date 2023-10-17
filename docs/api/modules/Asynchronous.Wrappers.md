# Namespace: Wrappers

[Asynchronous](Asynchronous.md).Wrappers

## Table of contents

### Functions

- [entries](Asynchronous.Wrappers.md#entries)
- [filter](Asynchronous.Wrappers.md#filter)
- [forEach](Asynchronous.Wrappers.md#foreach)
- [inspect](Asynchronous.Wrappers.md#inspect)
- [limit](Asynchronous.Wrappers.md#limit)
- [map](Asynchronous.Wrappers.md#map)
- [skip](Asynchronous.Wrappers.md#skip)
- [step](Asynchronous.Wrappers.md#step)
- [take](Asynchronous.Wrappers.md#take)
- [zip](Asynchronous.Wrappers.md#zip)

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
| `callback_object` | [`Callback_Object`](../classes/Asynchronous.Callback_Object.md)<`Value`, `void`, `Parameters`, `Key`\> | Instance reference to `this` of `Callback_Object` |
| `iterator_cascade_callbacks` | [`Iterator_Cascade_Callbacks`](../classes/Asynchronous.Iterator_Cascade_Callbacks.md)<`unknown`\> | Instance reference to `this` of `Iterator_Cascade_Callbacks` |

#### Returns

`void`

**`See`**

[For usage details](../classes/Asynchronous.Iterator_Cascade_Callbacks.md#entries)

#### Defined in

[src/asynchronous/wrappers.ts:62](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/v1.0.0/src/asynchronous/wrappers.ts#L62)

___

### filter

▸ **filter**<`Value`, `Parameters`, `Key`\>(`callback_object`, `iterator_cascade_callbacks`): `Promise`<`void`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Value` | `unknown` |
| `Parameters` | extends `unknown`[] = `unknown`[] |
| `Key` | `unknown` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback_object` | [`Callback_Object`](../classes/Asynchronous.Callback_Object.md)<`Value`, `boolean`, `Parameters`, `Key`\> | Instance reference to `this` of `Callback_Object` |
| `iterator_cascade_callbacks` | [`Iterator_Cascade_Callbacks`](../classes/Asynchronous.Iterator_Cascade_Callbacks.md)<`unknown`\> | Instance reference to `this` of `Iterator_Cascade_Callbacks` |

#### Returns

`Promise`<`void`\>

**`See`**

[For usage details](../classes/Asynchronous.Iterator_Cascade_Callbacks.md#filter)

#### Defined in

[src/asynchronous/wrappers.ts:81](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/v1.0.0/src/asynchronous/wrappers.ts#L81)

___

### forEach

▸ **forEach**<`Value`, `Parameters`, `Key`\>(`callback_object`, `iterator_cascade_callbacks`): `Promise`<`void`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Value` | `unknown` |
| `Parameters` | extends `unknown`[] = `unknown`[] |
| `Key` | `unknown` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback_object` | [`Callback_Object`](../classes/Asynchronous.Callback_Object.md)<`Value`, `void`, `Parameters`, `Key`\> | Instance reference to `this` of `Callback_Object` |
| `iterator_cascade_callbacks` | [`Iterator_Cascade_Callbacks`](../classes/Asynchronous.Iterator_Cascade_Callbacks.md)<`unknown`\> | Instance reference to `this` of `Iterator_Cascade_Callbacks` |

#### Returns

`Promise`<`void`\>

**`See`**

[For usage details](../classes/Asynchronous.Iterator_Cascade_Callbacks.md#foreach)

#### Defined in

[src/asynchronous/wrappers.ts:152](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/v1.0.0/src/asynchronous/wrappers.ts#L152)

___

### inspect

▸ **inspect**<`Value`, `Parameters`, `Key`\>(`callback_object`, `iterator_cascade_callbacks`): `Promise`<`void`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Value` | `unknown` |
| `Parameters` | extends `unknown`[] = `unknown`[] |
| `Key` | `unknown` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback_object` | [`Callback_Object`](../classes/Asynchronous.Callback_Object.md)<`Value`, `void`, `Parameters`, `Key`\> | Instance reference to `this` of `Callback_Object` |
| `iterator_cascade_callbacks` | [`Iterator_Cascade_Callbacks`](../classes/Asynchronous.Iterator_Cascade_Callbacks.md)<`unknown`\> | Instance reference to `this` of `Iterator_Cascade_Callbacks` |

#### Returns

`Promise`<`void`\>

**`See`**

[For usage details](../classes/Asynchronous.Iterator_Cascade_Callbacks.md#inspect)

#### Defined in

[src/asynchronous/wrappers.ts:173](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/v1.0.0/src/asynchronous/wrappers.ts#L173)

___

### limit

▸ **limit**<`Value`, `Parameters`, `Key`\>(`callback_object`, `iterator_cascade_callbacks`): `Promise`<`void`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Value` | `unknown` |
| `Parameters` | extends `unknown`[] = [`number`, ...unknown[]] |
| `Key` | `unknown` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback_object` | [`Callback_Object`](../classes/Asynchronous.Callback_Object.md)<`Value`, `void`, [`number`, ...Parameters[]], `Key`\> | Instance reference to `this` of `Callback_Object` |
| `iterator_cascade_callbacks` | [`Iterator_Cascade_Callbacks`](../classes/Asynchronous.Iterator_Cascade_Callbacks.md)<`unknown`\> | Instance reference to `this` of `Iterator_Cascade_Callbacks` |

#### Returns

`Promise`<`void`\>

**`Note`**

this expects `callback_object.parameters[0]` to contain the limit

**`See`**

[For usage details](../classes/Asynchronous.Iterator_Cascade_Callbacks.md#limit)

#### Defined in

[src/asynchronous/wrappers.ts:195](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/v1.0.0/src/asynchronous/wrappers.ts#L195)

___

### map

▸ **map**<`Value`, `Result`, `Parameters`, `Key`\>(`callback_object`, `iterator_cascade_callbacks`): `Promise`<`void`\>

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
| `callback_object` | [`Callback_Object`](../classes/Asynchronous.Callback_Object.md)<`Value`, `Result`, `Parameters`, `Key`\> | Instance reference to `this` of `Callback_Object` |
| `iterator_cascade_callbacks` | [`Iterator_Cascade_Callbacks`](../classes/Asynchronous.Iterator_Cascade_Callbacks.md)<`unknown`\> | Instance reference to `this` of `Iterator_Cascade_Callbacks` |

#### Returns

`Promise`<`void`\>

**`See`**

[For usage details](../classes/Asynchronous.Iterator_Cascade_Callbacks.md#map)

#### Defined in

[src/asynchronous/wrappers.ts:231](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/v1.0.0/src/asynchronous/wrappers.ts#L231)

___

### skip

▸ **skip**<`Value`, `Parameters`, `Key`\>(`callback_object`, `iterator_cascade_callbacks`): `Promise`<`void`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Value` | `unknown` |
| `Parameters` | extends `unknown`[] = [`number`, ...unknown[]] |
| `Key` | `unknown` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback_object` | [`Callback_Object`](../classes/Asynchronous.Callback_Object.md)<`Value`, `void`, [`number`, ...Parameters[]], `Key`\> | Instance reference to `this` of `Callback_Object` |
| `iterator_cascade_callbacks` | [`Iterator_Cascade_Callbacks`](../classes/Asynchronous.Iterator_Cascade_Callbacks.md)<`unknown`\> | Instance reference to `this` of `Iterator_Cascade_Callbacks` |

#### Returns

`Promise`<`void`\>

**`Note`**

this expects `callback_object.parameters[0]` to contain the limit

**`See`**

[For usage details](../classes/Asynchronous.Iterator_Cascade_Callbacks.md#skip)

#### Defined in

[src/asynchronous/wrappers.ts:263](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/v1.0.0/src/asynchronous/wrappers.ts#L263)

___

### step

▸ **step**<`Value`, `Parameters`, `Key`\>(`callback_object`, `iterator_cascade_callbacks`): `Promise`<`void`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Value` | `unknown` |
| `Parameters` | extends `unknown`[] = [`number`, ...unknown[]] |
| `Key` | `unknown` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback_object` | [`Callback_Object`](../classes/Asynchronous.Callback_Object.md)<`Value`, `void`, [`number`, ...Parameters[]], `Key`\> | Instance reference to `this` of `Callback_Object` |
| `iterator_cascade_callbacks` | [`Iterator_Cascade_Callbacks`](../classes/Asynchronous.Iterator_Cascade_Callbacks.md)<`unknown`\> | Instance reference to `this` of `Iterator_Cascade_Callbacks` |

#### Returns

`Promise`<`void`\>

**`Note`**

this expects `callback_object.parameters[0]` to contain the limit

**`See`**

[For usage details](../classes/Asynchronous.Iterator_Cascade_Callbacks.md#step)

#### Defined in

[src/asynchronous/wrappers.ts:312](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/v1.0.0/src/asynchronous/wrappers.ts#L312)

___

### take

▸ **take**<`Value`, `Parameters`, `Key`\>(`callback_object`, `iterator_cascade_callbacks`): `Promise`<`void`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Value` | `unknown` |
| `Parameters` | extends `unknown`[] = [`number`, ...unknown[]] |
| `Key` | `unknown` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback_object` | [`Callback_Object`](../classes/Asynchronous.Callback_Object.md)<`Value`, `void`, [`number`, ...Parameters[]], `Key`\> | Instance reference to `this` of `Callback_Object` |
| `iterator_cascade_callbacks` | [`Iterator_Cascade_Callbacks`](../classes/Asynchronous.Iterator_Cascade_Callbacks.md)<`unknown`\> | Instance reference to `this` of `Iterator_Cascade_Callbacks` |

#### Returns

`Promise`<`void`\>

**`Note`**

this expects `callback_object.parameters[0]` to contain the limit

**`See`**

[For usage details](../classes/Asynchronous.Iterator_Cascade_Callbacks.md#take)

#### Defined in

[src/asynchronous/wrappers.ts:363](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/v1.0.0/src/asynchronous/wrappers.ts#L363)

___

### zip

▸ **zip**(`iterables`, `iterator_cascade_callbacks`): `AsyncGenerator`<([`Yielded_Data`](internal_.md#yielded_data) \| `undefined`)[]\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `iterables` | `unknown`[] | Almost anything that implements `[Symbol.iterator]` or [Symbol.asyncIterator] |
| `iterator_cascade_callbacks` | typeof [`Iterator_Cascade_Callbacks`](../classes/Asynchronous.Iterator_Cascade_Callbacks.md) | Uninitialized class that is, or inherits from, `Iterator_Cascade_Callbacks` |

#### Returns

`AsyncGenerator`<([`Yielded_Data`](internal_.md#yielded_data) \| `undefined`)[]\>

**`See`**

[For usage details](../classes/Asynchronous.Iterator_Cascade_Callbacks.md#zip)

#### Defined in

[src/asynchronous/wrappers.ts:28](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/v1.0.0/src/asynchronous/wrappers.ts#L28)
