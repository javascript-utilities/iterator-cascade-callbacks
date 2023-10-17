# Module: <internal\>

## Table of contents

### Classes

- [Callback\_Object\_Base](../classes/internal_.Callback_Object_Base.md)
- [Pause\_Iteration](../classes/internal_.Pause_Iteration.md)
- [Stop\_Iteration](../classes/internal_.Stop_Iteration.md)

### Type Aliases

- [Callback\_Function](internal_.md#callback_function)
- [Callback\_Function](internal_.md#callback_function-1)
- [Callback\_Function\_References](internal_.md#callback_function_references)
- [Callback\_Function\_References](internal_.md#callback_function_references-1)
- [Callback\_Wrapper](internal_.md#callback_wrapper)
- [Callback\_Wrapper](internal_.md#callback_wrapper-1)
- [Collect\_To\_Function](internal_.md#collect_to_function)
- [Collect\_To\_Function](internal_.md#collect_to_function-1)
- [Dictionary](internal_.md#dictionary)
- [Index\_Or\_Key](internal_.md#index_or_key)
- [Yielded\_Data](internal_.md#yielded_data)

## Type Aliases

### Callback\_Function

Ƭ **Callback\_Function**<`Value`, `Result`, `Parameters`, `Key`\>: (`value`: `Value`, `index_or_key`: `Key`, `references`: [`Callback_Function_References`](internal_.md#callback_function_references)<`Value`, `Result`, `Parameters`, `Key`\>, ...`parameters`: `Parameters`) => `Result`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Value` | `Value` |
| `Result` | `Result` |
| `Parameters` | extends `unknown`[] |
| `Key` | `Key` |

#### Type declaration

▸ (`value`, `index_or_key`, `references`, `...parameters`): `Result`

Generic callback function for parsing and/or mutating iterator data

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `Value` | First half of `Yielded_Tuple` stored in `this.value` or `value` from `this.iterator.next()` |
| `index_or_key` | `Key` | Either a `string` or `number` depending upon iterable type |
| `references` | [`Callback_Function_References`](internal_.md#callback_function_references)<`Value`, `Result`, `Parameters`, `Key`\> | Dictionary with reference to _`this`_ `Iterator_Cascade_Callbacks` and _`this`_ `Callback_Object` |
| `...parameters` | `Parameters` | List of arguments that are passed to callback on each iteration |

##### Returns

`Result`

#### Defined in

[@types/iterator-cascade-callbacks/asynchronous.d.ts:38](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/63bd328/@types/iterator-cascade-callbacks/asynchronous.d.ts#L38)

___

### Callback\_Function

Ƭ **Callback\_Function**<`Value`, `Result`, `Parameters`, `Key`\>: (`value`: `Value`, `index_or_key`: `Key`, `references`: [`Callback_Function_References`](internal_.md#callback_function_references-1)<`Value`, `Result`, `Parameters`, `Key`\>, ...`parameters`: `Parameters`) => `Result`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Value` | `Value` |
| `Result` | `Result` |
| `Parameters` | extends `unknown`[] |
| `Key` | `Key` |

#### Type declaration

▸ (`value`, `index_or_key`, `references`, `...parameters`): `Result`

Generic callback function for parsing and/or mutating iterator data

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `Value` | First half of `Yielded_Tuple` stored in `this.value` or `value` from `this.iterator.next()` |
| `index_or_key` | `Key` | Either a `string` or `number` depending upon iterable type |
| `references` | [`Callback_Function_References`](internal_.md#callback_function_references-1)<`Value`, `Result`, `Parameters`, `Key`\> | Dictionary with reference to _`this`_ `Iterator_Cascade_Callbacks` and _`this`_ `Callback_Object` |
| `...parameters` | `Parameters` | List of arguments that are passed to callback on each iteration |

##### Returns

`Result`

#### Defined in

[@types/iterator-cascade-callbacks/synchronous.d.ts:34](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/63bd328/@types/iterator-cascade-callbacks/synchronous.d.ts#L34)

___

### Callback\_Function\_References

Ƭ **Callback\_Function\_References**<`Value`, `Result`, `Parameters`, `Key`\>: `Object`

Object with references to `Iterator_Cascade_Callbacks` and `Callback_Object` instances

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Value` | `Value` |
| `Result` | `Result` |
| `Parameters` | extends `unknown`[] |
| `Key` | `Key` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `callback_object` | [`Callback_Object`](../classes/Asynchronous.Callback_Object.md)<`Value`, `Result`, `Parameters`, `Key`\> |
| `iterator_cascade_callbacks` | [`Iterator_Cascade_Callbacks`](../classes/Asynchronous.Iterator_Cascade_Callbacks.md)<`unknown`\> |

#### Defined in

[@types/iterator-cascade-callbacks/asynchronous.d.ts:20](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/63bd328/@types/iterator-cascade-callbacks/asynchronous.d.ts#L20)

___

### Callback\_Function\_References

Ƭ **Callback\_Function\_References**<`Value`, `Result`, `Parameters`, `Key`\>: `Object`

Object with references to `Iterator_Cascade_Callbacks` and `Callback_Object` instances

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Value` | `Value` |
| `Result` | `Result` |
| `Parameters` | extends `unknown`[] |
| `Key` | `Key` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `callback_object` | [`Callback_Object`](../classes/Synchronous.Callback_Object.md)<`Value`, `Result`, `Parameters`, `Key`\> |
| `iterator_cascade_callbacks` | [`Iterator_Cascade_Callbacks`](../classes/Synchronous.Iterator_Cascade_Callbacks.md)<`unknown`\> |

#### Defined in

[@types/iterator-cascade-callbacks/synchronous.d.ts:21](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/63bd328/@types/iterator-cascade-callbacks/synchronous.d.ts#L21)

___

### Callback\_Wrapper

Ƭ **Callback\_Wrapper**<`Value`, `Result`, `Parameters`, `Key`\>: (`callback_object`: [`Callback_Object`](../classes/Asynchronous.Callback_Object.md)<`Value`, `Result`, `Parameters`, `Key`\>, `iterator_cascade_callbacks`: [`Iterator_Cascade_Callbacks`](../classes/Asynchronous.Iterator_Cascade_Callbacks.md)<`unknown`\>) => `Promise`<`void`\> \| `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Value` | `Value` |
| `Result` | `Result` |
| `Parameters` | extends `unknown`[] |
| `Key` | `Key` |

#### Type declaration

▸ (`callback_object`, `iterator_cascade_callbacks`): `Promise`<`void`\> \| `void`

Wrapper for callback function that parses inputs and outputs, and passes parameters to `Callback_Function`

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback_object` | [`Callback_Object`](../classes/Asynchronous.Callback_Object.md)<`Value`, `Result`, `Parameters`, `Key`\> | Instance reference to `this` of `Callback_Object` |
| `iterator_cascade_callbacks` | [`Iterator_Cascade_Callbacks`](../classes/Asynchronous.Iterator_Cascade_Callbacks.md)<`unknown`\> | Instance reference to `this` of `Iterator_Cascade_Callbacks` |

##### Returns

`Promise`<`void`\> \| `void`

#### Defined in

[@types/iterator-cascade-callbacks/asynchronous.d.ts:51](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/63bd328/@types/iterator-cascade-callbacks/asynchronous.d.ts#L51)

___

### Callback\_Wrapper

Ƭ **Callback\_Wrapper**<`Value`, `Result`, `Parameters`, `Key`\>: (`callback_object`: [`Callback_Object`](../classes/Synchronous.Callback_Object.md)<`Value`, `Result`, `Parameters`, `Key`\>, `iterator_cascade_callbacks`: [`Iterator_Cascade_Callbacks`](../classes/Synchronous.Iterator_Cascade_Callbacks.md)<`unknown`\>) => `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Value` | `Value` |
| `Result` | `Result` |
| `Parameters` | extends `unknown`[] |
| `Key` | `Key` |

#### Type declaration

▸ (`callback_object`, `iterator_cascade_callbacks`): `void`

Wrapper for callback function that parses inputs and outputs, and passes parameters to `Callback_Function`

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback_object` | [`Callback_Object`](../classes/Synchronous.Callback_Object.md)<`Value`, `Result`, `Parameters`, `Key`\> | Instance reference to `this` of `Callback_Object` |
| `iterator_cascade_callbacks` | [`Iterator_Cascade_Callbacks`](../classes/Synchronous.Iterator_Cascade_Callbacks.md)<`unknown`\> | Instance reference to `this` of `Iterator_Cascade_Callbacks` |

##### Returns

`void`

#### Defined in

[@types/iterator-cascade-callbacks/synchronous.d.ts:47](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/63bd328/@types/iterator-cascade-callbacks/synchronous.d.ts#L47)

___

### Collect\_To\_Function

Ƭ **Collect\_To\_Function**<`Target`, `Value`\>: (`target`: `Target`, `value`: `Value`, `index_or_key`: [`Index_Or_Key`](internal_.md#index_or_key), `iterator_cascade_callbacks`: [`Iterator_Cascade_Callbacks`](../classes/Asynchronous.Iterator_Cascade_Callbacks.md)) => `Promise`<`Target`\> \| `Target`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Target` | `any` |
| `Value` | `any` |

#### Type declaration

▸ (`target`, `value`, `index_or_key`, `iterator_cascade_callbacks`): `Promise`<`Target`\> \| `Target`

Callback function for custom collection algorithms

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `target` | `Target` | An object that function will collect values to |
| `value` | `Value` | `content` portion of `Shared.Yielded_Data` from `Asynchronous.Iterator_Cascade_Callbacks.next` |
| `index_or_key` | [`Index_Or_Key`](internal_.md#index_or_key) | Index or Key portion of `Shared.Yielded_Data` from `Iterator_Cascade_Callbacks` |
| `iterator_cascade_callbacks` | [`Iterator_Cascade_Callbacks`](../classes/Asynchronous.Iterator_Cascade_Callbacks.md) | Instance reference to `this` of `Iterator_Cascade_Callbacks` |

##### Returns

`Promise`<`Target`\> \| `Target`

**`See`**

 - [Iterator_Cascade_Callbacks#collectToFunction](../classes/Asynchronous.Iterator_Cascade_Callbacks.md#collecttofunction)
 - [Iterator_Cascade_Callbacks#collect](../classes/Asynchronous.Iterator_Cascade_Callbacks.md#collect)

**`Example`**

```ts
const icca = new Asynchronous.Iterator_Cascade_Callbacks({ spam: 'flavored', canned: 'ham' });

const map = new Map();

(async () => {
  const collection = icca.collectToFunction(map, (target, value) => {
    target.set(index_or_key, value);
  });

  console.log(collection);
  //> Map(2) { 'spam' => 'flavored', 'canned' => 'ham' }
})()
```

#### Defined in

[@types/iterator-cascade-callbacks/asynchronous.d.ts:79](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/63bd328/@types/iterator-cascade-callbacks/asynchronous.d.ts#L79)

___

### Collect\_To\_Function

Ƭ **Collect\_To\_Function**<`Target`, `Value`\>: (`target`: `Target`, `value`: `Value`, `index_or_key`: [`Index_Or_Key`](internal_.md#index_or_key), `iterator_cascade_callbacks`: [`Iterator_Cascade_Callbacks`](../classes/Synchronous.Iterator_Cascade_Callbacks.md)<`unknown`\>) => `Target`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Target` | `any` |
| `Value` | `any` |

#### Type declaration

▸ (`target`, `value`, `index_or_key`, `iterator_cascade_callbacks`): `Target`

Callback function for custom collection algorithms

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `target` | `Target` | An object that function will collect values to |
| `value` | `Value` | - |
| `index_or_key` | [`Index_Or_Key`](internal_.md#index_or_key) | Index or Key portion of `Yielded_Tuple` from `Iterator_Cascade_Callbacks` |
| `iterator_cascade_callbacks` | [`Iterator_Cascade_Callbacks`](../classes/Synchronous.Iterator_Cascade_Callbacks.md)<`unknown`\> | Instance reference to `this` of `Iterator_Cascade_Callbacks` |

##### Returns

`Target`

**`Example`**

```ts
const icca = new Synchronous.Iterator_Cascade_Callbacks({ spam: 'flavored', canned: 'ham' });

const map = new Map();

const collection = icca.collectToFunction(map, (target, value) => {
  target.set(index_or_key, value);
});

console.log(collection);
//> Map(2) { 'spam' => 'flavored', 'canned' => 'ham' }
```

#### Defined in

[@types/iterator-cascade-callbacks/synchronous.d.ts:71](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/63bd328/@types/iterator-cascade-callbacks/synchronous.d.ts#L71)

___

### Dictionary

Ƭ **Dictionary**<`T`\>: `Object`

Generic dictionary like object

**`Example`**

```ts
const data: Dictionary = { key: 'value' };
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `unknown` |

#### Index signature

▪ [key: `string`]: `T`

#### Defined in

[@types/iterator-cascade-callbacks/index.d.ts:13](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/63bd328/@types/iterator-cascade-callbacks/index.d.ts#L13)

___

### Index\_Or\_Key

Ƭ **Index\_Or\_Key**<`K`\>: `K` \| `unknown`

Array `index` or Object `key` or Generator `count`

**`Example`**

```ts
const key: Index_Or_Key = 'key';
const index: Index_Or_Key = 42;
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | `number` \| `string` |

#### Defined in

[@types/iterator-cascade-callbacks/index.d.ts:23](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/63bd328/@types/iterator-cascade-callbacks/index.d.ts#L23)

___

### Yielded\_Data

Ƭ **Yielded\_Data**<`T`, `K`\>: `Object`

Classy object with `value` and `index_or_key` entries

**`Example`**

```typescript
const result: Yielded_Data = new Yielded_Data({ content: 'spam', index_or_key: 3 });
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `unknown` \| `undefined` |
| `K` | [`Index_Or_Key`](internal_.md#index_or_key) \| `undefined` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `content` | `T` |
| `index_or_key` | `K` |

#### Defined in

[@types/iterator-cascade-callbacks/index.d.ts:33](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/63bd328/@types/iterator-cascade-callbacks/index.d.ts#L33)
