# Class: Callback\_Object<Value, Result, Parameters, Key\>

[Synchronous](../modules/Synchronous.md).Callback_Object

Classy object for storing wrapper function state between iterations

**`Author`**

S0AndS0

**`License`**

AGPL-3.0

## Type parameters

| Name | Type |
| :------ | :------ |
| `Value` | `unknown` |
| `Result` | `unknown` |
| `Parameters` | extends `unknown`[] = `unknown`[] |
| `Key` | [`Index_Or_Key`](../modules/internal_.md#index_or_key) |

## Hierarchy

- [`Callback_Object_Base`](internal_.Callback_Object_Base.md)<`Parameters`\>

  ↳ **`Callback_Object`**

## Table of contents

### Constructors

- [constructor](Synchronous.Callback_Object.md#constructor)

### Properties

- [callback](Synchronous.Callback_Object.md#callback)
- [name](Synchronous.Callback_Object.md#name)
- [parameters](Synchronous.Callback_Object.md#parameters)
- [storage](Synchronous.Callback_Object.md#storage)
- [wrapper](Synchronous.Callback_Object.md#wrapper)

### Methods

- [call](Synchronous.Callback_Object.md#call)

## Constructors

### constructor

• **new Callback_Object**<`Value`, `Result`, `Parameters`, `Key`\>(`options`)

Builds new instance of `Callback_Object` to append to `Iterator_Cascade_Callbacks.callbacks` list

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
| `options.callback` | [`Callback_Function`](../modules/internal_.md#callback_function-1)<`Value`, `Result`, `Parameters`, `Key`\> | Function that executes for each iteration of `Synchronous.Iterator_Cascade_Callbacks` |
| `options.name` | `string` | Method name that instantiated callback, eg. `"filter"` or `"map"` |
| `options.parameters` | `Parameters` | Array of arguments that are passed to callback on each iteration |
| `options.wrapper` | [`Callback_Wrapper`](../modules/internal_.md#callback_wrapper-1)<`Value`, `Result`, `Parameters`, `Key`\> | Function wrapper that handles input/output between `Synchronous.Callback_Function` and `Synchronous.Iterator_Cascade_Callbacks` |

**`See`**

Callback_Object_Base#constructor for `name` and `parameters`

#### Overrides

[Callback_Object_Base](internal_.Callback_Object_Base.md).[constructor](internal_.Callback_Object_Base.md#constructor)

#### Defined in

[ts/synchronous/callback-object.ts:34](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/63bd328/ts/synchronous/callback-object.ts#L34)

## Properties

### callback

• **callback**: [`Callback_Function`](../modules/internal_.md#callback_function-1)<`Value`, `Result`, `Parameters`, `Key`\>

#### Defined in

[ts/synchronous/callback-object.ts:23](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/63bd328/ts/synchronous/callback-object.ts#L23)

___

### name

• **name**: `string`

#### Inherited from

[Callback_Object_Base](internal_.Callback_Object_Base.md).[name](internal_.Callback_Object_Base.md#name)

#### Defined in

[ts/lib/callback-object-base.ts:13](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/63bd328/ts/lib/callback-object-base.ts#L13)

___

### parameters

• **parameters**: `Parameters`

#### Inherited from

[Callback_Object_Base](internal_.Callback_Object_Base.md).[parameters](internal_.Callback_Object_Base.md#parameters)

#### Defined in

[ts/lib/callback-object-base.ts:14](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/63bd328/ts/lib/callback-object-base.ts#L14)

___

### storage

• **storage**: [`Dictionary`](../modules/internal_.md#dictionary)<`unknown`\>

#### Inherited from

[Callback_Object_Base](internal_.Callback_Object_Base.md).[storage](internal_.Callback_Object_Base.md#storage)

#### Defined in

[ts/lib/callback-object-base.ts:15](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/63bd328/ts/lib/callback-object-base.ts#L15)

___

### wrapper

• **wrapper**: [`Callback_Wrapper`](../modules/internal_.md#callback_wrapper-1)<`Value`, `Result`, `Parameters`, `Key`\>

#### Defined in

[ts/synchronous/callback-object.ts:22](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/63bd328/ts/synchronous/callback-object.ts#L22)

## Methods

### call

▸ **call**(`iterator_cascade_callbacks`): `void`

Calls `this.wrapper` function with reference to this `Callback_Object` and `Iterator_Cascade_Callbacks`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `iterator_cascade_callbacks` | [`Iterator_Cascade_Callbacks`](Synchronous.Iterator_Cascade_Callbacks.md)<`unknown`\> | Reference to `Iterator_Cascade_Callbacks` instance |

#### Returns

`void`

#### Defined in

[ts/synchronous/callback-object.ts:50](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/63bd328/ts/synchronous/callback-object.ts#L50)
