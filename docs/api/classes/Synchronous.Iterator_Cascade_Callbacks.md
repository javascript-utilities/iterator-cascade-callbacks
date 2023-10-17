# Class: Iterator\_Cascade\_Callbacks<Initial_Iterable_Value\>

[Synchronous](../modules/Synchronous.md).Iterator_Cascade_Callbacks

Iterator that chains callback function execution

**`Author`**

S0AndS0

**`License`**

AGPL-3.0

## Type parameters

| Name | Type |
| :------ | :------ |
| `Initial_Iterable_Value` | `unknown` |

## Table of contents

### Constructors

- [constructor](Synchronous.Iterator_Cascade_Callbacks.md#constructor)

### Properties

- [#noOpParameters](Synchronous.Iterator_Cascade_Callbacks.md##noopparameters)
- [callbacks](Synchronous.Iterator_Cascade_Callbacks.md#callbacks)
- [done](Synchronous.Iterator_Cascade_Callbacks.md#done)
- [iterator](Synchronous.Iterator_Cascade_Callbacks.md#iterator)
- [state](Synchronous.Iterator_Cascade_Callbacks.md#state)
- [yielded\_data](Synchronous.Iterator_Cascade_Callbacks.md#yielded_data)

### Accessors

- [value](Synchronous.Iterator_Cascade_Callbacks.md#value)

### Methods

- [#noOpCallback](Synchronous.Iterator_Cascade_Callbacks.md##noopcallback)
- [[iterator]](Synchronous.Iterator_Cascade_Callbacks.md#[iterator])
- [collect](Synchronous.Iterator_Cascade_Callbacks.md#collect)
- [collectToArray](Synchronous.Iterator_Cascade_Callbacks.md#collecttoarray)
- [collectToFunction](Synchronous.Iterator_Cascade_Callbacks.md#collecttofunction)
- [collectToObject](Synchronous.Iterator_Cascade_Callbacks.md#collecttoobject)
- [copyCallbacksOnto](Synchronous.Iterator_Cascade_Callbacks.md#copycallbacksonto)
- [entries](Synchronous.Iterator_Cascade_Callbacks.md#entries)
- [filter](Synchronous.Iterator_Cascade_Callbacks.md#filter)
- [forEach](Synchronous.Iterator_Cascade_Callbacks.md#foreach)
- [inspect](Synchronous.Iterator_Cascade_Callbacks.md#inspect)
- [limit](Synchronous.Iterator_Cascade_Callbacks.md#limit)
- [map](Synchronous.Iterator_Cascade_Callbacks.md#map)
- [next](Synchronous.Iterator_Cascade_Callbacks.md#next)
- [popCallbackObject](Synchronous.Iterator_Cascade_Callbacks.md#popcallbackobject)
- [popCallbackWrapper](Synchronous.Iterator_Cascade_Callbacks.md#popcallbackwrapper)
- [pushCallbackWrapper](Synchronous.Iterator_Cascade_Callbacks.md#pushcallbackwrapper)
- [skip](Synchronous.Iterator_Cascade_Callbacks.md#skip)
- [step](Synchronous.Iterator_Cascade_Callbacks.md#step)
- [take](Synchronous.Iterator_Cascade_Callbacks.md#take)
- [zip](Synchronous.Iterator_Cascade_Callbacks.md#zip)

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
| `iterable` | `unknown` | Currently may be an array, object, generator, or iterator type |

**`Throws`**

when passed unsupported iterables

#### Defined in

[ts/synchronous/iterator-cascade-callbacks.ts:73](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/main/ts/synchronous/iterator-cascade-callbacks.ts#L73)

## Properties

### #noOpParameters

• `Private` **#noOpParameters**: `never`[] = `[]`

Cheep reusable array reference satisfies TypeScript, and `pushCallbackWrapper`, requirements

#### Defined in

[ts/synchronous/iterator-cascade-callbacks.ts:939](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/main/ts/synchronous/iterator-cascade-callbacks.ts#L939)

___

### callbacks

• **callbacks**: [`Callback_Object`](Synchronous.Callback_Object.md)<`Initial_Iterable_Value`, `unknown`, `unknown`[], `unknown`\>[]

Array of objects that hold pointers to `Asynchronous.Callback_Wrapper` and `Asynchronous.Callback_Function`

**`See`**

 - [Callback_Object_Base](internal_.Callback_Object_Base.md)
 - [Callback_Object](Synchronous.Callback_Object.md)
 - [Synchronous.Callback_Wrapper](../modules/internal_.md#callback_wrapper-1)
 - [Synchronous.Callback_Function](../modules/internal_.md#callback_function-1)

#### Defined in

[ts/synchronous/iterator-cascade-callbacks.ts:33](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/main/ts/synchronous/iterator-cascade-callbacks.ts#L33)

___

### done

• **done**: `boolean`

Report when/if instance of `Asynchronous.Iterator_Cascade_Callbacks` is done producing output via `this.next()`

**`Notes`**

- The `.done` property is used by `for (value of iterable)` loops to trigger termination

#### Defined in

[ts/synchronous/iterator-cascade-callbacks.ts:41](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/main/ts/synchronous/iterator-cascade-callbacks.ts#L41)

___

### iterator

• **iterator**: `IterableIterator`<[`Yielded_Data`](../modules/internal_.md#yielded_data)<`Initial_Iterable_Value`, `unknown`\>\>

Generator that `this.next()` cascades values through `this.callbacks` list

**`See`**

 - [For how this property is assigned](Synchronous.Iterator_Cascade_Callbacks.md#constructor)
 - [For how iterator values are passed through `this.callbacks` list](Synchronous.Iterator_Cascade_Callbacks.md#next)
 - [For when Array runtime type is detected](../modules/Iterator_From.md#array)
 - [For when Generator runtime type is detected](../modules/Iterator_From.md#generator)
 - [for when Object runtime type is detected](../modules/Iterator_From.md#object)

#### Defined in

[ts/synchronous/iterator-cascade-callbacks.ts:52](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/main/ts/synchronous/iterator-cascade-callbacks.ts#L52)

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

[ts/synchronous/iterator-cascade-callbacks.ts:59](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/main/ts/synchronous/iterator-cascade-callbacks.ts#L59)

___

### yielded\_data

• **yielded\_data**: [`Yielded_Data`](../modules/internal_.md#yielded_data)<`Initial_Iterable_Value`, `unknown`\>

#### Defined in

[ts/synchronous/iterator-cascade-callbacks.ts:64](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/main/ts/synchronous/iterator-cascade-callbacks.ts#L64)

## Accessors

### value

• `get` **value**(): `Initial_Iterable_Value`

Get data from `this.yielded_data.content`

#### Returns

`Initial_Iterable_Value`

**`Notes`**

- Implicitly called by `for (value of iterable)` loops

#### Defined in

[ts/synchronous/iterator-cascade-callbacks.ts:197](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/main/ts/synchronous/iterator-cascade-callbacks.ts#L197)

## Methods

### #noOpCallback

▸ `Private` **#noOpCallback**(): `void`

Cheep reusable function reference satisfies TypeScript, and `pushCallbackWrapper`, requirements

#### Returns

`void`

#### Defined in

[ts/synchronous/iterator-cascade-callbacks.ts:934](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/main/ts/synchronous/iterator-cascade-callbacks.ts#L934)

___

### [iterator]

▸ **[iterator]**(): [`Iterator_Cascade_Callbacks`](Synchronous.Iterator_Cascade_Callbacks.md)<`Initial_Iterable_Value`\>

#### Returns

[`Iterator_Cascade_Callbacks`](Synchronous.Iterator_Cascade_Callbacks.md)<`Initial_Iterable_Value`\>

**`See`**

 - [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators)
 - [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator)

#### Defined in

[ts/synchronous/iterator-cascade-callbacks.ts:945](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/main/ts/synchronous/iterator-cascade-callbacks.ts#L945)

___

### collect

▸ **collect**<`Target`, `Value`, `Callback_Or_Amount`\>(`target`, `callback_or_amount?`, `amount?`): `Target`

Collects results from `this` to either an Array or Object

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Target` | extends `unknown` = `unknown` |
| `Value` | `Initial_Iterable_Value` |
| `Callback_Or_Amount` | extends `undefined` \| `number` \| [`Collect_To_Function`](../modules/internal_.md#collect_to_function-1)<`Target`, `Value`\> = `undefined` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `target` | `Target` | When target is Array values are pushed, when target is Object key value pares are assigned, callback is required for other types |
| `callback_or_amount?` | `Callback_Or_Amount` | Callback function for collecting to custom type, or number to limit collection to |
| `amount?` | `number` | Limit collection to no more than amount |

#### Returns

`Target`

**`Throws`**

**`Notes`**

- Order of detection for `callback_or_amount` is; `Function`, `Array`, `Object`

**`See`**

 - [For when `Array` instance is detected](Synchronous.Iterator_Cascade_Callbacks.md#collecttoarray)
 - [For when `Function` instance is detected](Synchronous.Iterator_Cascade_Callbacks.md#collecttofunction)
 - [For when `Object` instance is detected](Synchronous.Iterator_Cascade_Callbacks.md#collecttoobject)

#### Defined in

[ts/synchronous/iterator-cascade-callbacks.ts:221](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/main/ts/synchronous/iterator-cascade-callbacks.ts#L221)

___

### collectToArray

▸ **collectToArray**<`Target`\>(`target`, `amount?`): `Target`

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

`Target`

**`See`**

[For common entry point](Synchronous.Iterator_Cascade_Callbacks.md#collect)

**`Example`**

```javascript
const icc = new Synchronous.Iterator_Cascade_Callbacks([5, 6, 7, 8, 9]);

const collection = icc
  .filter((value) => {
    return value % 2 === 0;
  })
  .collectToArray([1, 2, 3]);

console.log(collection);
//> [ 1, 2, 3, 6, 8 ]
```

#### Defined in

[ts/synchronous/iterator-cascade-callbacks.ts:271](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/main/ts/synchronous/iterator-cascade-callbacks.ts#L271)

___

### collectToFunction

▸ **collectToFunction**<`Target`, `Value`, `Callback`\>(`target`, `callback`, `amount?`): `Target`

Collects results from `this.next()` to a callback function target

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Target` | `unknown` |
| `Value` | `unknown` |
| `Callback` | extends [`Collect_To_Function`](../modules/internal_.md#collect_to_function-1)<`any`, `any`\> = [`Collect_To_Function`](../modules/internal_.md#collect_to_function-1)<`Target`, `Value`\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `target` | `Target` | Any object or primitive, will be passed to `callback` function along with `value` and `index_or_key` |
| `callback` | `Callback` | Custom callback function for collecting iterated values |
| `amount?` | `number` | Limit collection to no more than amount |

#### Returns

`Target`

target - The object that callback function has mutated

**`See`**

[For common entry point](Synchronous.Iterator_Cascade_Callbacks.md#collect)

**`Example`**

```javascript
const icc = new Synchronous.Iterator_Cascade_Callbacks({ spam: 'flavored', canned: 'ham' });

const map = new Map();

const collection = icc.collectToFunction(map, (target, value, index_or_key) => {
  target.set(index_or_key, value);
});

console.log(collection);
//> Map(2) { 'spam' => 'flavored', 'canned' => 'ham' }
```

#### Defined in

[ts/synchronous/iterator-cascade-callbacks.ts:311](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/main/ts/synchronous/iterator-cascade-callbacks.ts#L311)

___

### collectToObject

▸ **collectToObject**<`Target`\>(`target`, `amount?`): `Target`

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

`Target`

**`See`**

[For common entry point](Synchronous.Iterator_Cascade_Callbacks.md#collect)

**`Example`**

```javascript
const icc = new Synchronous.Iterator_Cascade_Callbacks({ spam: 'flavored', canned: 'ham' });

const collection = icc.collectToObject({});

console.log(collection);
//> { spam: 'flavored', canned: 'ham' }
```

#### Defined in

[ts/synchronous/iterator-cascade-callbacks.ts:358](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/main/ts/synchronous/iterator-cascade-callbacks.ts#L358)

___

### copyCallbacksOnto

▸ **copyCallbacksOnto**<`T`\>(`iterable`): [`Iterator_Cascade_Callbacks`](Synchronous.Iterator_Cascade_Callbacks.md)<`T`\>

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

[`Iterator_Cascade_Callbacks`](Synchronous.Iterator_Cascade_Callbacks.md)<`T`\>

**`Notes`**

- New instance will share references to callback wrapper functions

**`Example`**

```javascript
const iterable_one = [1, 2, 3, 4, 5];
const iterable_two = [9, 8, 7, 6, 5];

const icc_one = new Synchronous.Iterator_Cascade_Callbacks(iterable_one)
  .filter((value) => {
    return value % 2 === 0;
  })
  .map((evens) => {
    return evens / 2;
  });

const icc_two = icc_one.copyCallbacksOnto(iterable_two);

console.log('Collection One ->', icc_one.collect([]));
//> [ 1, 2 ]
console.log('Collection Two ->', icc_two.collect([]));
//> [ 4, 3 ]
```

#### Defined in

[ts/synchronous/iterator-cascade-callbacks.ts:410](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/main/ts/synchronous/iterator-cascade-callbacks.ts#L410)

___

### entries

▸ **entries**<`Value`, `Parameters`, `Key`\>(): [`Iterator_Cascade_Callbacks`](Synchronous.Iterator_Cascade_Callbacks.md)<`Initial_Iterable_Value`\>

Sets `this.value` to `Yielded_Entry` which contains `[this.yielded_data.index_or_key, this.yielded_data.content]`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Value` | `Initial_Iterable_Value` |
| `Parameters` | extends `unknown`[] = `unknown`[] |
| `Key` | `unknown` |

#### Returns

[`Iterator_Cascade_Callbacks`](Synchronous.Iterator_Cascade_Callbacks.md)<`Initial_Iterable_Value`\>

**`See`**

[For implementation details](../modules/Synchronous.Wrappers.md#entries)

**`Example`**

```javascript
const icc = new Synchronous.Iterator_Cascade_Callbacks([9, 8, 7, 6, 5]);

const collection = icc
  .entries()
  .filter(([index, value]) => {
    return (value - index) % 3 === 0;
  })
  .collect([]);

console.log(collection);
//> [ [ 0, 9 ], [ 3, 6 ] ]
```

#### Defined in

[ts/synchronous/iterator-cascade-callbacks.ts:453](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/main/ts/synchronous/iterator-cascade-callbacks.ts#L453)

___

### filter

▸ **filter**<`Value`, `Parameters`, `Key`\>(`callback`, `...parameters`): [`Iterator_Cascade_Callbacks`](Synchronous.Iterator_Cascade_Callbacks.md)<`Initial_Iterable_Value`\>

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
| `callback` | [`Callback_Function`](../modules/internal_.md#callback_function-1)<`Value`, `boolean`, `Parameters`, `Key`\> | Function that determines truth of `value` and/or `index_or_key` for each iteration |
| `...parameters` | `Parameters` | List of arguments that are passed to callback on each iteration |

#### Returns

[`Iterator_Cascade_Callbacks`](Synchronous.Iterator_Cascade_Callbacks.md)<`Initial_Iterable_Value`\>

**`See`**

[For implementation details](../modules/Synchronous.Wrappers.md#filter)

**`Example`**

Collect even numbers from an array of numbers

```javascript
const iterable = [9, 8, 7, 6, 5];

const icc = new Synchronous.Iterator_Cascade_Callbacks(iterable);

const collection = icc
  .filter((value) => {
    return value % 2 === 0;
  })
  .collect([]);

console.log(collection);
//> [ 8, 6 ]
```

#### Defined in

[ts/synchronous/iterator-cascade-callbacks.ts:497](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/main/ts/synchronous/iterator-cascade-callbacks.ts#L497)

___

### forEach

▸ **forEach**<`Value`, `Parameters`, `Key`\>(`callback`, `...parameters`): [`Iterator_Cascade_Callbacks`](Synchronous.Iterator_Cascade_Callbacks.md)<`Initial_Iterable_Value`\>

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
| `callback` | [`Callback_Function`](../modules/internal_.md#callback_function-1)<`Value`, `void`, `Parameters`, `Key`\> | Function that generally does not mutate `value` or `index_or_key` for `Iterator_Cascade_Callbacks` instance |
| `...parameters` | `Parameters` | List of arguments that are passed to callback on each iteration |

#### Returns

[`Iterator_Cascade_Callbacks`](Synchronous.Iterator_Cascade_Callbacks.md)<`Initial_Iterable_Value`\>

**`Notes`**

- If mutation of `value` or `index_or_key` are desired then `map` is a better option
- No protections are in place to prevent mutation of `value` or `index_or_key` Objects

**`See`**

[For implementation details](../modules/Synchronous.Wrappers.md#foreach)

**`Example`**

```javascript
const icc = new Synchronous.Iterator_Cascade_Callbacks([9, 8, 7, 6, 5]);

const collection = icc
  .forEach((value) => {
    console.log(value);
  })
  .collect([]);

console.log(collection);
//> [ 9, 8, 7, 6, 5 ]
```

#### Defined in

[ts/synchronous/iterator-cascade-callbacks.ts:540](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/main/ts/synchronous/iterator-cascade-callbacks.ts#L540)

___

### inspect

▸ **inspect**<`Value`, `Parameters`, `Key`\>(`callback`, `...parameters`): [`Iterator_Cascade_Callbacks`](Synchronous.Iterator_Cascade_Callbacks.md)<`Initial_Iterable_Value`\>

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
| `callback` | [`Callback_Function`](../modules/internal_.md#callback_function-1)<`Value`, `void`, `Parameters`, `Key`\> | Function that logs something about each iteration |
| `...parameters` | `Parameters` | List of arguments that are passed to callback on each iteration |

#### Returns

[`Iterator_Cascade_Callbacks`](Synchronous.Iterator_Cascade_Callbacks.md)<`Initial_Iterable_Value`\>

**`See`**

[For implementation details](../modules/Synchronous.Wrappers.md#inspect)

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

const icc = new Synchronous.Iterator_Cascade_Callbacks([9, 8, 7, 6, 5]);

const collection = icc
  .filter((value) => {
    return value % 2 === 0;
  })
  .inspect(inspector)
  .map((even) => {
    return even / 2;
  })
  .inspect(inspector)
  .collect([]);
```

#### Defined in

[ts/synchronous/iterator-cascade-callbacks.ts:596](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/main/ts/synchronous/iterator-cascade-callbacks.ts#L596)

___

### limit

▸ **limit**<`Value`, `Parameters`, `Key`\>(`amount`): [`Iterator_Cascade_Callbacks`](Synchronous.Iterator_Cascade_Callbacks.md)<`Initial_Iterable_Value`\>

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

[`Iterator_Cascade_Callbacks`](Synchronous.Iterator_Cascade_Callbacks.md)<`Initial_Iterable_Value`\>

**`Throws`**

**`Notes`**

- Useful when iterating over data of indeterminate, or infinite, length
- More predictable if ordered at the end of `this.callbacks` list
- Callbacks exist when `amount` is reached will be called prior to throwing `Stop_Iteration`

**`See`**

[For implementation details](../modules/Synchronous.Wrappers.md#limit)

**`Example`**

```javascript
const icc = new Synchronous.Iterator_Cascade_Callbacks([1, 2, 3, 4]);

const collection = icc.limit(2).collect([]);

console.log(collection);
//> [1, 2]
```

#### Defined in

[ts/synchronous/iterator-cascade-callbacks.ts:638](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/main/ts/synchronous/iterator-cascade-callbacks.ts#L638)

___

### map

▸ **map**<`Value`, `Result`, `Parameters`, `Key`\>(`callback`, `...parameters`): [`Iterator_Cascade_Callbacks`](Synchronous.Iterator_Cascade_Callbacks.md)<`Initial_Iterable_Value`\>

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
| `callback` | [`Callback_Function`](../modules/internal_.md#callback_function-1)<`Value`, `Result`, `Parameters`, `Key`\> | Function may modify `value` and/or `index_or_key` |
| `...parameters` | `Parameters` | List of arguments that are passed to callback on each iteration |

#### Returns

[`Iterator_Cascade_Callbacks`](Synchronous.Iterator_Cascade_Callbacks.md)<`Initial_Iterable_Value`\>

**`Notes`**

- If callback does **not** return `Yielded_Tuple` (array), then results from callback are used as `value` and initial `index_or_key` is reused

**`See`**

[For implementation details](../modules/Synchronous.Wrappers.md#map)

**`Example`**

```javascript
const icc = new Synchronous.Iterator_Cascade_Callbacks([9, 8, 7, 6, 5]);

const collection = icc
  .filter((value) => {
    return value % 2 === 0;
  })
  .map((value) => {
    return value / 2;
  })
  .collect([]);

console.log(collection);
//> [ 4, 3 ]
```

#### Defined in

[ts/synchronous/iterator-cascade-callbacks.ts:686](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/main/ts/synchronous/iterator-cascade-callbacks.ts#L686)

___

### next

▸ **next**(): [`Iterator_Cascade_Callbacks`](Synchronous.Iterator_Cascade_Callbacks.md)<`Initial_Iterable_Value`\>

Updates `this.yielded_data.content` from chaining `this.callbacks` list, and `this.done` from `this.iterator.next()`

#### Returns

[`Iterator_Cascade_Callbacks`](Synchronous.Iterator_Cascade_Callbacks.md)<`Initial_Iterable_Value`\>

**`Example`**

```javascript
const icc = new Synchronous.Iterator_Cascade_Callbacks([1, 2, 3, 4]);

for (let value of icc) {
  console.log('value ->', value);
}
//> value -> 1
//> value -> 2
//> value -> 3
//> value -> 4
```

#### Defined in

[ts/synchronous/iterator-cascade-callbacks.ts:724](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/main/ts/synchronous/iterator-cascade-callbacks.ts#L724)

___

### popCallbackObject

▸ **popCallbackObject**(): `undefined` \| [`Callback_Object`](Synchronous.Callback_Object.md)<`unknown`, `unknown`, `unknown`[], `unknown`\>

Returns, and removes, last `Callback_Object` from `this.callbacks` list

#### Returns

`undefined` \| [`Callback_Object`](Synchronous.Callback_Object.md)<`unknown`, `unknown`, `unknown`[], `unknown`\>

#### Defined in

[ts/synchronous/iterator-cascade-callbacks.ts:767](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/main/ts/synchronous/iterator-cascade-callbacks.ts#L767)

___

### popCallbackWrapper

▸ **popCallbackWrapper**(): `undefined` \| [`Callback_Wrapper`](../modules/internal_.md#callback_wrapper-1)<`unknown`, `unknown`, `unknown`[], `unknown`\>

Removes last `Callback_Object` from `this.callbacks` list and returns `Callback_Wrapper` function

#### Returns

`undefined` \| [`Callback_Wrapper`](../modules/internal_.md#callback_wrapper-1)<`unknown`, `unknown`, `unknown`[], `unknown`\>

#### Defined in

[ts/synchronous/iterator-cascade-callbacks.ts:778](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/main/ts/synchronous/iterator-cascade-callbacks.ts#L778)

___

### pushCallbackWrapper

▸ **pushCallbackWrapper**<`Value`, `Result`, `Parameters`, `Key`\>(`options`): [`Iterator_Cascade_Callbacks`](Synchronous.Iterator_Cascade_Callbacks.md)<`Initial_Iterable_Value`\>

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
| `options` | `Object` | Labeled parameters |
| `options.callback` | [`Callback_Function`](../modules/internal_.md#callback_function-1)<`Value`, `Result`, `Parameters`, `Key`\> | - |
| `options.name` | `string` | Callback wrapper name |
| `options.parameters` | `Parameters` | List of arguments that are passed to callback on each iteration |
| `options.wrapper` | [`Callback_Wrapper`](../modules/internal_.md#callback_wrapper-1)<`Value`, `Result`, `Parameters`, `Key`\> | Wrapper for callback function that parses inputs and outputs |

#### Returns

[`Iterator_Cascade_Callbacks`](Synchronous.Iterator_Cascade_Callbacks.md)<`Initial_Iterable_Value`\>

#### Defined in

[ts/synchronous/iterator-cascade-callbacks.ts:797](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/main/ts/synchronous/iterator-cascade-callbacks.ts#L797)

___

### skip

▸ **skip**<`Value`, `Parameters`, `Key`\>(`amount`): [`Iterator_Cascade_Callbacks`](Synchronous.Iterator_Cascade_Callbacks.md)<`Initial_Iterable_Value`\>

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

[`Iterator_Cascade_Callbacks`](Synchronous.Iterator_Cascade_Callbacks.md)<`Initial_Iterable_Value`\>

**`See`**

[For implementation details](../modules/Synchronous.Wrappers.md#skip)

**`Example`**

```javascript
const icc = new Synchronous.Iterator_Cascade_Callbacks([0, 1, 2, 3, 4, 5]);

const collection = icc.skip(2).collect([]);

console.log(collection);
//> [ 2, 3, 4, 5 ]
```

#### Defined in

[ts/synchronous/iterator-cascade-callbacks.ts:836](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/main/ts/synchronous/iterator-cascade-callbacks.ts#L836)

___

### step

▸ **step**<`Value`, `Parameters`, `Key`\>(`amount`): [`Iterator_Cascade_Callbacks`](Synchronous.Iterator_Cascade_Callbacks.md)<`Initial_Iterable_Value`\>

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

[`Iterator_Cascade_Callbacks`](Synchronous.Iterator_Cascade_Callbacks.md)<`Initial_Iterable_Value`\>

**`See`**

[For implementation details](../modules/Synchronous.Wrappers.md#step)

**`Example`**

```javascript
const icc = new Synchronous.Iterator_Cascade_Callbacks([0, 1, 2, 3, 4, 5]);

const collection = icc.step(1).collect([]);

console.log(collection);
//> [ 1, 3, 5 ]
```

#### Defined in

[ts/synchronous/iterator-cascade-callbacks.ts:873](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/main/ts/synchronous/iterator-cascade-callbacks.ts#L873)

___

### take

▸ **take**<`Value`, `Parameters`, `Key`\>(`amount`): [`Iterator_Cascade_Callbacks`](Synchronous.Iterator_Cascade_Callbacks.md)<`Initial_Iterable_Value`\>

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

[`Iterator_Cascade_Callbacks`](Synchronous.Iterator_Cascade_Callbacks.md)<`Initial_Iterable_Value`\>

**`Throws`**

**`Notes`**

- If immediately collecting to an object, consider using `collect()` method instead

**`See`**

[For implementation details](../modules/Synchronous.Wrappers.md#take)

**`Example`**

```javascript
const icc = new Synchronous.Iterator_Cascade_Callbacks([1, 2, 3, 4]);

icc.take(2);

const collection_one = icc.collect([]);
console.log(collection_one);
//> [ 1, 2 ]

const collection_two = icc.collect([]);
console.log(collection_two);
//> [ 3, 4 ]
```

#### Defined in

[ts/synchronous/iterator-cascade-callbacks.ts:918](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/main/ts/synchronous/iterator-cascade-callbacks.ts#L918)

___

### zip

▸ `Static` **zip**(`...iterables`): [`Iterator_Cascade_Callbacks`](Synchronous.Iterator_Cascade_Callbacks.md)<`unknown`\>

Returns new instance of `Iterator_Cascade_Callbacks` that yields lists of values from each iteration

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...iterables` | `unknown`[] | List of Generators, Iterators, and/or instances of `Iterator_Cascade_Callbacks` |

#### Returns

[`Iterator_Cascade_Callbacks`](Synchronous.Iterator_Cascade_Callbacks.md)<`unknown`\>

**`Notes`**

- Parameters that are not an instance of `Iterator_Cascade_Callbacks` will be converted
- Iteration will continue until **all** iterables result in `done` value of `true`

**`See`**

[For implementation details](../modules/Synchronous.Wrappers.md#zip)

**`Example`**

Equal Length Iterables

```javascript
const icc_one = new Synchronous.Iterator_Cascade_Callbacks([1, 2, 3]);
const icc_two = new Synchronous.Iterator_Cascade_Callbacks([4, 5, 6]);

const icc_zip = Iterator_Cascade_Callbacks.zip(icc_one, icc_two);

for (let values of icc_zip) {
  console.log('values ->', values);
}
//> values -> [ 1, 4 ]
//> values -> [ 2, 5 ]
//> values -> [ 3, 6 ]
```

**`Example`**

Unequal Length Iterables

```javascript
const icc_three = new Synchronous.Iterator_Cascade_Callbacks([7, 8, 9]);
const icc_four = new Synchronous.Iterator_Cascade_Callbacks([10, 11]);

const icc_zip = Iterator_Cascade_Callbacks.zip(icc_three, icc_four);

for (let values of icc_zip) {
  console.log('values ->', values);
}
//> values -> [ 7, 10 ]
//> values -> [ 8, 11 ]
//> values -> [ 9, undefined ]
```

#### Defined in

[ts/synchronous/iterator-cascade-callbacks.ts:187](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/main/ts/synchronous/iterator-cascade-callbacks.ts#L187)
