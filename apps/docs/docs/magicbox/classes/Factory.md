---
id: "Factory"
title: "Class: Factory"
sidebar_label: "Factory"
sidebar_position: 0
custom_edit_url: null
---

Factory class

Is the core in MagicBox architecture.

From here you can access to all the other modules. 

## How to use it
The factoryy is implemented using a singleton, so you can access it from anywhere in your code.
```typescript
import { Factory } from "@koksmat/factory";

const factory = Factory.getInstance();

```

## Constructors

### constructor

• **new Factory**()

Constructor is setting up the PowerPacks and the router

#### Defined in

Factory.ts:34

## Properties

### \_router

• `Private` **\_router**: `Router`

#### Defined in

Factory.ts:29

___

### \_instance

▪ `Static` `Private` **\_instance**: [`Factory`](Factory.md)

#### Defined in

Factory.ts:27

## Accessors

### powerPacks

• `get` **powerPacks**(): `PowerPacks`

#### Returns

`PowerPacks`

#### Defined in

Factory.ts:62

___

### routeKeys

• `get` **routeKeys**(): `string`[]

#### Returns

`string`[]

#### Defined in

Factory.ts:53

___

### router

• `get` **router**(): `Router`

#### Returns

`Router`

#### Defined in

Factory.ts:58

## Methods

### postMessage

▸ **postMessage**(`method`, `path`, `payload`): `Promise`<`IResult`<`any`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `method` | `string` |
| `path` | `string` |
| `payload` | `object` |

#### Returns

`Promise`<`IResult`<`any`\>\>

#### Defined in

Factory.ts:102

___

### processMessage

▸ **processMessage**(`method`, `path`, `payload`): `Promise`<`IResult`<`any`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `method` | `string` |
| `path` | `string` |
| `payload` | `object` |

#### Returns

`Promise`<`IResult`<`any`\>\>

#### Defined in

Factory.ts:74

___

### validateInput

▸ **validateInput**(`endPoint`, `input`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `endPoint` | `IEndPointHandler` |
| `input` | `any` |

#### Returns

`any`

#### Defined in

Factory.ts:65

___

### validateOutput

▸ **validateOutput**(`endPoint`, `output`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `endPoint` | `IEndPointHandler` |
| `output` | `any` |

#### Returns

`any`

#### Defined in

Factory.ts:69

___

### getInstance

▸ `Static` **getInstance**(): [`Factory`](Factory.md)

#### Returns

[`Factory`](Factory.md)

#### Defined in

Factory.ts:45
