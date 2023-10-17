# Class: Iterator\_Cascade\_Callbacks<Initial_Iterable_Value\>

[Asynchronous](../modules/Asynchronous.md).Iterator_Cascade_Callbacks

Asynchronous Iterator that chains asynchronous iterables and/or callback function execution

**`Author`**

S0AndS0

**`License`**

AGPL-3.0

**`See`**

 - [MDN -- AsyncGenerator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncGenerator)
 - [MDN -- AsyncIterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncIterator)
 - [TypeScript docs -- Async Iteration](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-3.html#async-iteration)

## Type parameters

| Name | Type |
| :------ | :------ |
| `Initial_Iterable_Value` | `unknown` |

## Table of contents

### Constructors

- [constructor](Asynchronous.Iterator_Cascade_Callbacks.md#constructor)

### Properties

- [#noOpParameters](Asynchronous.Iterator_Cascade_Callbacks.md##noopparameters)
- [callbacks](Asynchronous.Iterator_Cascade_Callbacks.md#callbacks)
- [done](Asynchronous.Iterator_Cascade_Callbacks.md#done)
- [iterator](Asynchronous.Iterator_Cascade_Callbacks.md#iterator)
- [state](Asynchronous.Iterator_Cascade_Callbacks.md#state)
- [yielded\_data](Asynchronous.Iterator_Cascade_Callbacks.md#yielded_data)

### Accessors

- [value](Asynchronous.Iterator_Cascade_Callbacks.md#value)

### Methods

- [#noOpCallback](Asynchronous.Iterator_Cascade_Callbacks.md##noopcallback)
- [[asyncIterator]](Asynchronous.Iterator_Cascade_Callbacks.md#[asynciterator])
- [collect](Asynchronous.Iterator_Cascade_Callbacks.md#collect)
- [collectToArray](Asynchronous.Iterator_Cascade_Callbacks.md#collecttoarray)
- [collectToFunction](Asynchronous.Iterator_Cascade_Callbacks.md#collecttofunction)
- [collectToObject](Asynchronous.Iterator_Cascade_Callbacks.md#collecttoobject)
- [copyCallbacksOnto](Asynchronous.Iterator_Cascade_Callbacks.md#copycallbacksonto)
- [entries](Asynchronous.Iterator_Cascade_Callbacks.md#entries)
- [filter](Asynchronous.Iterator_Cascade_Callbacks.md#filter)
- [forEach](Asynchronous.Iterator_Cascade_Callbacks.md#foreach)
- [inspect](Asynchronous.Iterator_Cascade_Callbacks.md#inspect)
- [limit](Asynchronous.Iterator_Cascade_Callbacks.md#limit)
- [map](Asynchronous.Iterator_Cascade_Callbacks.md#map)
- [next](Asynchronous.Iterator_Cascade_Callbacks.md#next)
- [popCallbackObject](Asynchronous.Iterator_Cascade_Callbacks.md#popcallbackobject)
- [popCallbackWrapper](Asynchronous.Iterator_Cascade_Callbacks.md#popcallbackwrapper)
- [pushCallbackWrapper](Asynchronous.Iterator_Cascade_Callbacks.md#pushcallbackwrapper)
- [skip](Asynchronous.Iterator_Cascade_Callbacks.md#skip)
- [step](Asynchronous.Iterator_Cascade_Callbacks.md#step)
- [take](Asynchronous.Iterator_Cascade_Callbacks.md#take)
- [zip](Asynchronous.Iterator_Cascade_Callbacks.md#zip)

## Constructors

### constructor

• **new Iterator_Cascade_Callbacks**<`Initial_Iterable_Value`\>(`iterable`)

Instantiates new instance of `Iterator_Cascade_Callbacks` from `iterable` input

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Initial_Iterable_Value` | `unknown` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `iterable` | `unknown` | Currently may be an array, object, generator, iterator, or object that implements `Symbol.asyncIterator` type |

**`Throws`**

when passed unsupported iterables

#### Defined in

[src/asynchronous/iterator-cascade-callbacks.ts:84](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/v1.0.0/src/asynchronous/iterator-cascade-callbacks.ts#L84)

## Properties

### #noOpParameters

• `Private` **#noOpParameters**: `never`[] = `[]`

Cheep reusable array reference satisfies TypeScript, and `pushCallbackWrapper`, requirements

#### Defined in

[src/asynchronous/iterator-cascade-callbacks.ts:1025](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/v1.0.0/src/asynchronous/iterator-cascade-callbacks.ts#L1025)

___

### callbacks

• **callbacks**: [`Callback_Object`](Asynchronous.Callback_Object.md)<`Initial_Iterable_Value`, `unknown`, `unknown`[], `unknown`\>[]

Array of objects that hold pointers to `Asynchronous.Callback_Wrapper` and `Asynchronous.Callback_Function`

**`See`**

 - [Callback_Object_Base](internal_.Callback_Object_Base.md)
 - [Callback_Object](Asynchronous.Callback_Object.md)
 - [Asynchronous.Callback_Wrapper](../modules/internal_.md#callback_wrapper)
 - [Asynchronous.Callback_Function](../modules/internal_.md#callback_function)

#### Defined in

[src/asynchronous/iterator-cascade-callbacks.ts:42](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/v1.0.0/src/asynchronous/iterator-cascade-callbacks.ts#L42)

___

### done

• **done**: `boolean`

Report when/if instance of `Asynchronous.Iterator_Cascade_Callbacks` is done producing output via `this.next()`

**`Notes`**

- The `.done` property is used by `for (value of iterable)` loops to trigger termination

#### Defined in

[src/asynchronous/iterator-cascade-callbacks.ts:50](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/v1.0.0/src/asynchronous/iterator-cascade-callbacks.ts#L50)

___

### iterator

• **iterator**: `IterableIterator`<[`Yielded_Data`](../modules/internal_.md#yielded_data)<`Initial_Iterable_Value`, `unknown`\>\> \| `AsyncGenerator`<[`Yielded_Data`](../modules/internal_.md#yielded_data)<`Initial_Iterable_Value`, `unknown`\>, `void`, `unknown`\>

Generator that `this.next()` cascades values through `this.callbacks` list

**`See`**

 - [For how this property is assigned](Asynchronous.Iterator_Cascade_Callbacks.md#constructor)
 - [For how iterator values are passed through `this.callbacks` list](Asynchronous.Iterator_Cascade_Callbacks.md#next)
 - [For when Array runtime type is detected](../modules/Iterator_From.md#array)
 - [For when Generator runtime type is detected](../modules/Iterator_From.md#generator)
 - [For when AsyncGenerator or AsyncIterator runtime type is detected](../modules/Iterator_From.md#asyncgenerator)
 - [for when Object runtime type is detected](../modules/Iterator_From.md#object)

#### Defined in

[src/asynchronous/iterator-cascade-callbacks.ts:62](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/v1.0.0/src/asynchronous/iterator-cascade-callbacks.ts#L62)

___

### state

• **state**: `Object`

Allow for finer-grain states than `this.done`

**`See`**

#### Type declaration

| Name | Type |
| :------ | :------ |
| `paused` | `boolean` |
| `resumed` | `boolean` |

#### Defined in

[src/asynchronous/iterator-cascade-callbacks.ts:70](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/v1.0.0/src/asynchronous/iterator-cascade-callbacks.ts#L70)

___

### yielded\_data

• **yielded\_data**: [`Yielded_Data`](../modules/internal_.md#yielded_data)<`Initial_Iterable_Value`, `unknown`\>

#### Defined in

[src/asynchronous/iterator-cascade-callbacks.ts:75](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/v1.0.0/src/asynchronous/iterator-cascade-callbacks.ts#L75)

## Accessors

### value

• `get` **value**(): `Initial_Iterable_Value`

Get data from `this.yielded_data.content`

#### Returns

`Initial_Iterable_Value`

**`Notes`**

- Implicitly called by `for (value of iterable)` loops

#### Defined in

[src/asynchronous/iterator-cascade-callbacks.ts:246](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/v1.0.0/src/asynchronous/iterator-cascade-callbacks.ts#L246)

## Methods

### #noOpCallback

▸ `Private` **#noOpCallback**(): `void`

Cheep reusable function reference satisfies TypeScript, and `pushCallbackWrapper`, requirements

#### Returns

`void`

#### Defined in

[src/asynchronous/iterator-cascade-callbacks.ts:1020](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/v1.0.0/src/asynchronous/iterator-cascade-callbacks.ts#L1020)

___

### [asyncIterator]

▸ **[asyncIterator]**(): [`Iterator_Cascade_Callbacks`](Asynchronous.Iterator_Cascade_Callbacks.md)<`Initial_Iterable_Value`\>

#### Returns

[`Iterator_Cascade_Callbacks`](Asynchronous.Iterator_Cascade_Callbacks.md)<`Initial_Iterable_Value`\>

**`See`**

 - [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncIterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncIterator)
 - [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_async_iterator_and_async_iterable_protocols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_async_iterator_and_async_iterable_protocols)

#### Defined in

[src/asynchronous/iterator-cascade-callbacks.ts:1031](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/v1.0.0/src/asynchronous/iterator-cascade-callbacks.ts#L1031)

___

### collect

▸ **collect**<`Target`, `Value`, `Callback_Or_Amount`\>(`target`, `callback_or_amount?`, `amount?`): `Promise`<`Target`\>

Collects results from `this` to either an Array or Object

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Target` | extends `unknown` = `unknown` |
| `Value` | `Initial_Iterable_Value` |
| `Callback_Or_Amount` | extends `undefined` \| `number` \| [`Collect_To_Function`](../modules/internal_.md#collect_to_function)<`Target`, `Value`\> = `undefined` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `target` | `Target` | When target is Array values are pushed, when target is Object key value pares are assigned, callback is required for other types |
| `callback_or_amount?` | `Callback_Or_Amount` | Callback function for collecting to custom type, or number to limit collection to |
| `amount?` | `number` | Limit collection to no more than amount |

#### Returns

`Promise`<`Target`\>

**`Throws`**

**`Notes`**

- Order of detection for `callback_or_amount` is; `Function`, `Array`, `Object`

**`See`**

 - [For when `Array` instance is detected](Asynchronous.Iterator_Cascade_Callbacks.md#collecttoarray)
 - [For when `Function` instance is detected](Asynchronous.Iterator_Cascade_Callbacks.md#collecttofunction)
 - [For when `Object` instance is detected](Asynchronous.Iterator_Cascade_Callbacks.md#collecttoobject)

#### Defined in

[src/asynchronous/iterator-cascade-callbacks.ts:270](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/v1.0.0/src/asynchronous/iterator-cascade-callbacks.ts#L270)

___

### collectToArray

▸ **collectToArray**<`Target`\>(`target`, `amount?`): `Promise`<`Target`\>

Collects results from `this.next()` to an Array

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Target` | extends `unknown`[] = `unknown`[] |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `target` | `Target` | Array to push collected values to |
| `amount?` | `number` | Limit collection to no more than amount |

#### Returns

`Promise`<`Target`\>

**`See`**

[For common entry point](Asynchronous.Iterator_Cascade_Callbacks.md#collect)

**`Example`**

```javascript
const icca = new Asynchronous.Iterator_Cascade_Callbacks([5, 6, 7, 8, 9]);

(async () => {
  const collection = await icca
    .filter((value) => {
      return value % 2 === 0;
    })
    .collectToArray([1, 2, 3]);

  console.log(collection);
  //> [ 1, 2, 3, 6, 8 ]
})();
```

#### Defined in

[src/asynchronous/iterator-cascade-callbacks.ts:322](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/v1.0.0/src/asynchronous/iterator-cascade-callbacks.ts#L322)

___

### collectToFunction

▸ **collectToFunction**<`Target`, `Value`, `Callback`\>(`target`, `callback`, `amount?`): `Promise`<`Target`\>

Collects results from `this.next()` to a callback function target

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Target` | `unknown` |
| `Value` | `unknown` |
| `Callback` | extends [`Collect_To_Function`](../modules/internal_.md#collect_to_function)<`any`, `any`\> = [`Collect_To_Function`](../modules/internal_.md#collect_to_function)<`Target`, `Value`\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `target` | `Target` | Any object or primitive, will be passed to `callback` function along with `value` and `index_or_key` |
| `callback` | `Callback` | Custom callback function for collecting iterated values |
| `amount?` | `number` | Limit collection to no more than amount |

#### Returns

`Promise`<`Target`\>

target - The object that callback function has mutated

**`See`**

 - [Asynchronous.Collect_To_Function](../modules/internal_.md#collect_to_function)
 - [For common entry point](Asynchronous.Iterator_Cascade_Callbacks.md#collect)

**`Example`**

```javascript
const icca = new Asynchronous.Iterator_Cascade_Callbacks({ spam: 'flavored', canned: 'ham' });

const map = new Map();

(async () => {
  const collection = await icca.collectToFunction(map, (target, value, index_or_key) => {
    target.set(index_or_key, value);
  });

  console.log(collection);
  //> Map(2) { 'spam' => 'flavored', 'canned' => 'ham' }
})();
```

#### Defined in

[src/asynchronous/iterator-cascade-callbacks.ts:369](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/v1.0.0/src/asynchronous/iterator-cascade-callbacks.ts#L369)

___

### collectToObject

▸ **collectToObject**<`Target`\>(`target`, `amount?`): `Promise`<`Target`\>

Collects results from `this.next()` to an Object

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Target` | extends [`Dictionary`](../modules/internal_.md#dictionary)<`unknown`\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `target` | `Target` | Dictionary like object to assign key value pares to |
| `amount?` | `number` | Limit collection to no more than amount |

#### Returns

`Promise`<`Target`\>

**`See`**

[For common entry point](Asynchronous.Iterator_Cascade_Callbacks.md#collect)

**`Example`**

```javascript
const icca = new Asynchronous.Iterator_Cascade_Callbacks({ spam: 'flavored', canned: 'ham' });

(async () => {
  const collection = await icca.collectToObject({});

  console.log(collection);
  //> { spam: 'flavored', canned: 'ham' }
})();
```

#### Defined in

[src/asynchronous/iterator-cascade-callbacks.ts:418](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/v1.0.0/src/asynchronous/iterator-cascade-callbacks.ts#L418)

___

### copyCallbacksOnto

▸ **copyCallbacksOnto**<`T`\>(`iterable`): [`Iterator_Cascade_Callbacks`](Asynchronous.Iterator_Cascade_Callbacks.md)<`T`\>

Returns new instance of `Iterator_Cascade_Callbacks` with copy of `this.callbacks`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `unknown` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `iterable` | `unknown` | Any compatible iterable object, iterator, or generator |

#### Returns

[`Iterator_Cascade_Callbacks`](Asynchronous.Iterator_Cascade_Callbacks.md)<`T`\>

**`Notes`**

- New instance will share references to callback wrapper functions

**`Example`**

```javascript
const iterable_one = [1, 2, 3, 4, 5];
const iterable_two = [9, 8, 7, 6, 5];

const icca_one = new Asynchronous.Iterator_Cascade_Callbacks(iterable_one);

icca_one.filter((value) => {
  return value % 2 === 0;
}).map((evens) => {
  return evens / 2;
});

const icca_two = icc_one.copyCallbacksOnto(iterable_two);

(async () => {
  console.log('Collection One ->', await icca_one.collect([]));
  //> [ 1, 2 ]
  console.log('Collection Two ->', await icca_two.collect([]));
  //> [ 4, 3 ]
})();
```

#### Defined in

[src/asynchronous/iterator-cascade-callbacks.ts:475](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/v1.0.0/src/asynchronous/iterator-cascade-callbacks.ts#L475)

___

### entries

▸ **entries**<`Value`, `Parameters`, `Key`\>(): [`Iterator_Cascade_Callbacks`](Asynchronous.Iterator_Cascade_Callbacks.md)<`Initial_Iterable_Value`\>

Sets `this.value` to `Yielded_Entry` which contains `[this.yielded_data.index_or_key, this.yielded_data.content]`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Value` | `Initial_Iterable_Value` |
| `Parameters` | extends `unknown`[] = `unknown`[] |
| `Key` | `unknown` |

#### Returns

[`Iterator_Cascade_Callbacks`](Asynchronous.Iterator_Cascade_Callbacks.md)<`Initial_Iterable_Value`\>

**`See`**

[For implementation details](../modules/Asynchronous.Wrappers.md#entries)

**`Example`**

```javascript
const icca = new Asynchronous.Iterator_Cascade_Callbacks([9, 8, 7, 6, 5]);

(async () => {
  const collection = await icca
    .entries()
    .filter(([index, value]) => {
      return (value - index) % 3 === 0;
    })
    .collect([]);

  console.log(collection);
  //> [ [ 0, 9 ], [ 3, 6 ] ]
})();
```

#### Defined in

[src/asynchronous/iterator-cascade-callbacks.ts:520](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/v1.0.0/src/asynchronous/iterator-cascade-callbacks.ts#L520)

___

### filter

▸ **filter**<`Value`, `Parameters`, `Key`\>(`callback`, `...parameters`): [`Iterator_Cascade_Callbacks`](Asynchronous.Iterator_Cascade_Callbacks.md)<`Initial_Iterable_Value`\>

Sets `this.value` if callback function returns _truthy_, else consumes `this.iterator` and recomputes value for callback to test

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Value` | `Initial_Iterable_Value` |
| `Parameters` | extends `unknown`[] = `unknown`[] |
| `Key` | `unknown` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | [`Callback_Function`](../modules/internal_.md#callback_function)<`Value`, `boolean`, `Parameters`, `Key`\> | Function that determines truth of `value` and/or `index_or_key` for each iteration |
| `...parameters` | `Parameters` | List of arguments that are passed to callback on each iteration |

#### Returns

[`Iterator_Cascade_Callbacks`](Asynchronous.Iterator_Cascade_Callbacks.md)<`Initial_Iterable_Value`\>

**`See`**

[For implementation details](../modules/Asynchronous.Wrappers.md#filter)

**`Example`**

```javascript
const icca = new Asynchronous.Iterator_Cascade_Callbacks([9, 8, 7, 6, 5]);

(async () => {
  const collection = icca
    .filter((value) => {
      return value % 2 === 0;
    })
    .collect([]);

  console.log(collection);
  //> [ 8, 6 ]
})();
```

#### Defined in

[src/asynchronous/iterator-cascade-callbacks.ts:564](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/v1.0.0/src/asynchronous/iterator-cascade-callbacks.ts#L564)

___

### forEach

▸ **forEach**<`Value`, `Parameters`, `Key`\>(`callback`, `...parameters`): [`Iterator_Cascade_Callbacks`](Asynchronous.Iterator_Cascade_Callbacks.md)<`Initial_Iterable_Value`\>

Executes callback for each iteration

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Value` | `Initial_Iterable_Value` |
| `Parameters` | extends `unknown`[] = `unknown`[] |
| `Key` | `unknown` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | [`Callback_Function`](../modules/internal_.md#callback_function)<`Value`, `void`, `Parameters`, `Key`\> | Function that generally does not mutate `value` or `index_or_key` for `Iterator_Cascade_Callbacks` instance |
| `...parameters` | `Parameters` | List of arguments that are passed to callback on each iteration |

#### Returns

[`Iterator_Cascade_Callbacks`](Asynchronous.Iterator_Cascade_Callbacks.md)<`Initial_Iterable_Value`\>

**`Notes`**

- If mutation of `value` or `index_or_key` are desired then `map` is a better option
- No protections are in place to prevent mutation of `value` or `index_or_key` Objects

**`See`**

[For implementation details](../modules/Asynchronous.Wrappers.md#foreach)

**`Example`**

```javascript
const icca = new Asynchronous.Iterator_Cascade_Callbacks([9, 8, 7, 6, 5]);

(async () => {
  const collection = await icca
    .forEach((value) => {
      console.log(value);
    })
    .collect([]);

  console.log(collection);
  //> [ 9, 8, 7, 6, 5 ]
})();
```

#### Defined in

[src/asynchronous/iterator-cascade-callbacks.ts:609](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/v1.0.0/src/asynchronous/iterator-cascade-callbacks.ts#L609)

___

### inspect

▸ **inspect**<`Value`, `Parameters`, `Key`\>(`callback`, `...parameters`): [`Iterator_Cascade_Callbacks`](Asynchronous.Iterator_Cascade_Callbacks.md)<`Initial_Iterable_Value`\>

Useful for debugging and inspecting iteration state

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Value` | `unknown` |
| `Parameters` | extends `unknown`[] = `unknown`[] |
| `Key` | `unknown` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | [`Callback_Function`](../modules/internal_.md#callback_function)<`Value`, `void`, `Parameters`, `Key`\> | Function that logs something about each iteration |
| `...parameters` | `Parameters` | List of arguments that are passed to callback on each iteration |

#### Returns

[`Iterator_Cascade_Callbacks`](Asynchronous.Iterator_Cascade_Callbacks.md)<`Initial_Iterable_Value`\>

**`See`**

[For implementation details](../modules/Asynchronous.Wrappers.md#inspect)

**`Example`**

```javascript
function inspector(
  value,
  index_or_key,
  { callback_object, iterator_cascade_callbacks },
  ...parameters
) {
  console.log('value ->', value);
  console.log('index_or_key ->', index_or_key);
  console.log('callback_object ->', callback_object);
  console.log('iterator_cascade_callbacks ->', iterator_cascade_callbacks);
}

const icca = new Asynchronous.Iterator_Cascade_Callbacks([9, 8, 7, 6, 5]);

(async () => {
  const collection = await icca
    .filter((value) => {
      return value % 2 === 0;
    })
    .inspect(inspector)
    .map((even) => {
      return even / 2;
    })
    .inspect(inspector)
    .collect([]);
})();
```

#### Defined in

[src/asynchronous/iterator-cascade-callbacks.ts:667](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/v1.0.0/src/asynchronous/iterator-cascade-callbacks.ts#L667)

___

### limit

▸ **limit**<`Value`, `Parameters`, `Key`\>(`amount`): [`Iterator_Cascade_Callbacks`](Asynchronous.Iterator_Cascade_Callbacks.md)<`Initial_Iterable_Value`\>

Stops iteration when limit is reached

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Value` | `unknown` |
| `Parameters` | extends `unknown`[] = [`number`, ...unknown[]] |
| `Key` | `unknown` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | `number` | Max number of values to compute |

#### Returns

[`Iterator_Cascade_Callbacks`](Asynchronous.Iterator_Cascade_Callbacks.md)<`Initial_Iterable_Value`\>

**`Throws`**

**`Notes`**

- Useful when iterating over data of indeterminate, or infinite, length
- More predictable if ordered at the end of `this.callbacks` list
- Callbacks exist when `amount` is reached will be called prior to throwing `Stop_Iteration`

**`See`**

[For implementation details](../modules/Asynchronous.Wrappers.md#limit)

**`Example`**

```javascript
const icca = new Asynchronous.Iterator_Cascade_Callbacks([1, 2, 3, 4]);

(async () => {
  const collection = await icca.limit(2).collect([]);

  console.log(collection);
  //> [1, 2]
})();
```

#### Defined in

[src/asynchronous/iterator-cascade-callbacks.ts:711](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/v1.0.0/src/asynchronous/iterator-cascade-callbacks.ts#L711)

___

### map

▸ **map**<`Value`, `Result`, `Parameters`, `Key`\>(`callback`, `...parameters`): [`Iterator_Cascade_Callbacks`](Asynchronous.Iterator_Cascade_Callbacks.md)<`Initial_Iterable_Value`\>

Applies `callback` to modify `value` and/or `index_or_key` for each iteration

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Value` | `Initial_Iterable_Value` |
| `Result` | `Initial_Iterable_Value` |
| `Parameters` | extends `unknown`[] = `unknown`[] |
| `Key` | `unknown` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | [`Callback_Function`](../modules/internal_.md#callback_function)<`Value`, `Result`, `Parameters`, `Key`\> | Function may modify `value` and/or `index_or_key` |
| `...parameters` | `Parameters` | List of arguments that are passed to callback on each iteration |

#### Returns

[`Iterator_Cascade_Callbacks`](Asynchronous.Iterator_Cascade_Callbacks.md)<`Initial_Iterable_Value`\>

**`Notes`**

- If callback does **not** return `Yielded_Data` (array), then results from callback are used as `value` and initial `index_or_key` is reused

**`See`**

[For implementation details](../modules/Asynchronous.Wrappers.md#map)

**`Example`**

```javascript
const icca = new Asynchronous.Iterator_Cascade_Callbacks([9, 8, 7, 6, 5]);

(async () => {
  const collection = await icca
    .filter((value) => {
      return value % 2 === 0;
    })
    .map((value) => {
      return value / 2;
    })
    .collect([]);

  console.log(collection);
  //> [4, 3]
})();
```

#### Defined in

[src/asynchronous/iterator-cascade-callbacks.ts:761](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/v1.0.0/src/asynchronous/iterator-cascade-callbacks.ts#L761)

___

### next

▸ **next**(): `Promise`<[`Iterator_Cascade_Callbacks`](Asynchronous.Iterator_Cascade_Callbacks.md)<`Initial_Iterable_Value`\>\>

Updates `this.yielded_data.content` from chaining `this.callbacks` list, and `this.done` from `this.iterator.next()`

#### Returns

`Promise`<[`Iterator_Cascade_Callbacks`](Asynchronous.Iterator_Cascade_Callbacks.md)<`Initial_Iterable_Value`\>\>

**`Example`**

```javascript
const icca = new Asynchronous.Iterator_Cascade_Callbacks([1, 2, 3, 4]);

(async () => {
  for await (let value of icca) {
    console.log('value ->', value);
  }
  //> value -> 1
  //> value -> 2
  //> value -> 3
  //> value -> 4
})();
```

#### Defined in

[src/asynchronous/iterator-cascade-callbacks.ts:801](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/v1.0.0/src/asynchronous/iterator-cascade-callbacks.ts#L801)

___

### popCallbackObject

▸ **popCallbackObject**(): `undefined` \| [`Callback_Object`](Asynchronous.Callback_Object.md)<`unknown`, `unknown`, `unknown`[], `unknown`\>

Returns, and removes, last `Callback_Object` from `this.callbacks` list

#### Returns

`undefined` \| [`Callback_Object`](Asynchronous.Callback_Object.md)<`unknown`, `unknown`, `unknown`[], `unknown`\>

#### Defined in

[src/asynchronous/iterator-cascade-callbacks.ts:847](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/v1.0.0/src/asynchronous/iterator-cascade-callbacks.ts#L847)

___

### popCallbackWrapper

▸ **popCallbackWrapper**(): `undefined` \| [`Callback_Wrapper`](../modules/internal_.md#callback_wrapper)<`unknown`, `unknown`, `unknown`[], `unknown`\>

Removes last `Callback_Object` from `this.callbacks` list and returns `Callback_Wrapper` function

#### Returns

`undefined` \| [`Callback_Wrapper`](../modules/internal_.md#callback_wrapper)<`unknown`, `unknown`, `unknown`[], `unknown`\>

#### Defined in

[src/asynchronous/iterator-cascade-callbacks.ts:858](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/v1.0.0/src/asynchronous/iterator-cascade-callbacks.ts#L858)

___

### pushCallbackWrapper

▸ **pushCallbackWrapper**<`Value`, `Result`, `Parameters`, `Key`\>(`options`): [`Iterator_Cascade_Callbacks`](Asynchronous.Iterator_Cascade_Callbacks.md)<`Initial_Iterable_Value`\>

Instantiates `Callback_Object` with callback_wrapper and pushes to `this.callbacks` via `this.pushCallbackObject`

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
| `options` | `Object` |  |
| `options.callback` | [`Callback_Function`](../modules/internal_.md#callback_function)<`Value`, `Result`, `Parameters`, `Key`\> | - |
| `options.name` | `string` | Callback wrapper name |
| `options.parameters` | `Parameters` | List of arguments that are passed to callback on each iteration |
| `options.wrapper` | [`Callback_Wrapper`](../modules/internal_.md#callback_wrapper)<`Value`, `Result`, `Parameters`, `Key`\> | Wrapper for callback function that parses inputs and outputs |

#### Returns

[`Iterator_Cascade_Callbacks`](Asynchronous.Iterator_Cascade_Callbacks.md)<`Initial_Iterable_Value`\>

#### Defined in

[src/asynchronous/iterator-cascade-callbacks.ts:877](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/v1.0.0/src/asynchronous/iterator-cascade-callbacks.ts#L877)

___

### skip

▸ **skip**<`Value`, `Parameters`, `Key`\>(`amount`): [`Iterator_Cascade_Callbacks`](Asynchronous.Iterator_Cascade_Callbacks.md)<`Initial_Iterable_Value`\>

Skip number of iterations

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Value` | `Initial_Iterable_Value` |
| `Parameters` | extends `unknown`[] = `unknown`[] |
| `Key` | `unknown` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | `number` | Number of iterations to skip past |

#### Returns

[`Iterator_Cascade_Callbacks`](Asynchronous.Iterator_Cascade_Callbacks.md)<`Initial_Iterable_Value`\>

**`See`**

[For implementation details](../modules/Asynchronous.Wrappers.md#skip)

**`Example`**

```javascript
const icca = new Asynchronous.Iterator_Cascade_Callbacks([0, 1, 2, 3, 4, 5]);

(async () => {
  const collection = await icca.skip(2).collect([]);

  console.log(collection);
  //> [ 2, 3, 4, 5 ]
})();
```

#### Defined in

[src/asynchronous/iterator-cascade-callbacks.ts:918](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/v1.0.0/src/asynchronous/iterator-cascade-callbacks.ts#L918)

___

### step

▸ **step**<`Value`, `Parameters`, `Key`\>(`amount`): [`Iterator_Cascade_Callbacks`](Asynchronous.Iterator_Cascade_Callbacks.md)<`Initial_Iterable_Value`\>

Step over every _n_ iterations

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Value` | `unknown` |
| `Parameters` | extends `unknown`[] = `unknown`[] |
| `Key` | `unknown` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | `number` | Number of iterations to step over |

#### Returns

[`Iterator_Cascade_Callbacks`](Asynchronous.Iterator_Cascade_Callbacks.md)<`Initial_Iterable_Value`\>

**`See`**

[For implementation details](../modules/Asynchronous.Wrappers.md#step)

**`Example`**

```javascript
const icca = new Asynchronous.Iterator_Cascade_Callbacks([0, 1, 2, 3, 4, 5]);

(async () => {
  const collection = await icca.step(1).collect([]);

  console.log(collection);
  //> [ 1, 3, 5 ]
})();
```

#### Defined in

[src/asynchronous/iterator-cascade-callbacks.ts:957](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/v1.0.0/src/asynchronous/iterator-cascade-callbacks.ts#L957)

___

### take

▸ **take**<`Value`, `Parameters`, `Key`\>(`amount`): [`Iterator_Cascade_Callbacks`](Asynchronous.Iterator_Cascade_Callbacks.md)<`Initial_Iterable_Value`\>

Pauses/breaks iteration when limit is reached

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Value` | `unknown` |
| `Parameters` | extends `unknown`[] = `unknown`[] |
| `Key` | `unknown` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | `number` | Number of values to compute before pausing |

#### Returns

[`Iterator_Cascade_Callbacks`](Asynchronous.Iterator_Cascade_Callbacks.md)<`Initial_Iterable_Value`\>

**`Throws`**

**`Notes`**

- If immediately collecting to an object, consider using `collect()` method instead

**`See`**

[For implementation details](../modules/Asynchronous.Wrappers.md#take)

**`Example`**

```javascript
const icca = new Asynchronous.Iterator_Cascade_Callbacks([1, 2, 3, 4]);

icca.take(2);

(async () => {
  const collection_one = await icca.collect([]);
  console.log(collection_one);
  //> [ 1, 2 ]

  const collection_two = await icca.collect([]);
  console.log(collection_two);
  //> [ 3, 4 ]
})();
```

#### Defined in

[src/asynchronous/iterator-cascade-callbacks.ts:1004](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/v1.0.0/src/asynchronous/iterator-cascade-callbacks.ts#L1004)

___

### zip

▸ `Static` **zip**(`...iterables`): [`Iterator_Cascade_Callbacks`](Asynchronous.Iterator_Cascade_Callbacks.md)<`unknown`\>

Returns new instance of `Asynchronous.Iterator_Cascade_Callbacks` that yields lists of either `Shared.Yielded_Data` or `undefined` results

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...iterables` | `unknown`[] | List of Generators, Iterators, and/or instances of `Asynchronous.Iterator_Cascade_Callbacks` |

#### Returns

[`Iterator_Cascade_Callbacks`](Asynchronous.Iterator_Cascade_Callbacks.md)<`unknown`\>

**`Notes`**

- Parameters that are not an instance of `Asynchronous.Iterator_Cascade_Callbacks` will be converted
- Iteration will continue until **all** iterables result in `done` value of `true`

**`See`**

[For implementation details](../modules/Asynchronous.Wrappers.md#zip)

**`Example`**

Equal Length Iterables

```javascript
const icca_one = new Asynchronous.Iterator_Cascade_Callbacks([1, 2, 3]);
const icca_two = new Asynchronous.Iterator_Cascade_Callbacks([4, 5, 6]);

const icca_zip = Iterator_Cascade_Callbacks.zip(icca_one, icca_two);

(async () => {
  for await (let values of icca_zip) {
    console.log('values ->', values);
  }
  //> values -> [ 1, 4 ]
  //> values -> [ 2, 5 ]
  //> values -> [ 3, 6 ]
})();
```

**`Example`**

Unequal Length Iterables

```javascript
const icca_three = new Asynchronous.Iterator_Cascade_Callbacks([7, 8, 9]);
const icca_four = new Asynchronous.Iterator_Cascade_Callbacks([10, 11]);

const icca_zip = Iterator_Cascade_Callbacks.zip(icca_three, icca_four);

(async () => {
  for await (let values of icca_zip) {
    console.log('values ->', values);
  }
  //> values -> [ 7, 10 ]
  //> values -> [ 8, 11 ]
  //> values -> [ 9, undefined ]
})();
```

#### Defined in

[src/asynchronous/iterator-cascade-callbacks.ts:236](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/v1.0.0/src/asynchronous/iterator-cascade-callbacks.ts#L236)
