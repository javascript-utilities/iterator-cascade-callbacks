# Class: Callback\_Object\_Base<Parameters\>

[<internal>](../modules/internal_.md).Callback_Object_Base

Classy object for storing wrapper function state between iterations

**`Author`**

S0AndS0

**`License`**

AGPL-3.0

## Type parameters

| Name | Type |
| :------ | :------ |
| `Parameters` | extends `unknown`[] = `unknown`[] |

## Hierarchy

- **`Callback_Object_Base`**

  ↳ [`Callback_Object`](Asynchronous.Callback_Object.md)

  ↳ [`Callback_Object`](Synchronous.Callback_Object.md)

## Table of contents

### Constructors

- [constructor](internal_.Callback_Object_Base.md#constructor)

### Properties

- [name](internal_.Callback_Object_Base.md#name)
- [parameters](internal_.Callback_Object_Base.md#parameters)
- [storage](internal_.Callback_Object_Base.md#storage)

## Constructors

### constructor

• **new Callback_Object_Base**<`Parameters`\>(`options`)

Builds new instance of `Callback_Object` to append to `Iterator_Cascade_Callbacks.callbacks` list

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Parameters` | extends `unknown`[] = `unknown`[] |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Object` | Labeled parameters |
| `options.name` | `string` | Method name that instantiated callback, eg. `filter` |
| `options.parameters` | `Parameters` | Array of arguments that are passed to callback on each iteration |

#### Defined in

[src/lib/callback-object-base.ts:23](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/v1.0.0/src/lib/callback-object-base.ts#L23)

## Properties

### name

• **name**: `string`

#### Defined in

[src/lib/callback-object-base.ts:13](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/v1.0.0/src/lib/callback-object-base.ts#L13)

___

### parameters

• **parameters**: `Parameters`

#### Defined in

[src/lib/callback-object-base.ts:14](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/v1.0.0/src/lib/callback-object-base.ts#L14)

___

### storage

• **storage**: [`Dictionary`](../modules/internal_.md#dictionary)<`unknown`\>

#### Defined in

[src/lib/callback-object-base.ts:15](https://github.com/javascript-utilities/iterator-cascade-callbacks/blob/v1.0.0/src/lib/callback-object-base.ts#L15)
