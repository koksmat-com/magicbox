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

[Factory.ts:34](https://github.com/koksmat-com/magicbox/blob/238ceea/businesslogic/factory/src/Factory.ts#L34)

## Properties

### \_router

• `Private` **\_router**: `Router`

#### Defined in

[Factory.ts:29](https://github.com/koksmat-com/magicbox/blob/238ceea/businesslogic/factory/src/Factory.ts#L29)

___

### \_instance

▪ `Static` `Private` **\_instance**: [`Factory`](Factory.md)

#### Defined in

[Factory.ts:27](https://github.com/koksmat-com/magicbox/blob/238ceea/businesslogic/factory/src/Factory.ts#L27)

## Accessors

### powerPacks

• `get` **powerPacks**(): `PowerPacks`

#### Returns

`PowerPacks`

#### Defined in

[Factory.ts:62](https://github.com/koksmat-com/magicbox/blob/238ceea/businesslogic/factory/src/Factory.ts#L62)

___

### routeKeys

• `get` **routeKeys**(): `string`[]

#### Returns

`string`[]

#### Defined in

[Factory.ts:53](https://github.com/koksmat-com/magicbox/blob/238ceea/businesslogic/factory/src/Factory.ts#L53)

___

### router

• `get` **router**(): `Router`

#### Returns

`Router`

#### Defined in

[Factory.ts:58](https://github.com/koksmat-com/magicbox/blob/238ceea/businesslogic/factory/src/Factory.ts#L58)

## Methods

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

[Factory.ts:74](https://github.com/koksmat-com/magicbox/blob/238ceea/businesslogic/factory/src/Factory.ts#L74)

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

[Factory.ts:65](https://github.com/koksmat-com/magicbox/blob/238ceea/businesslogic/factory/src/Factory.ts#L65)

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

[Factory.ts:69](https://github.com/koksmat-com/magicbox/blob/238ceea/businesslogic/factory/src/Factory.ts#L69)

___

### getInstance

▸ `Static` **getInstance**(): [`Factory`](Factory.md)

#### Returns

[`Factory`](Factory.md)

#### Defined in

[Factory.ts:45](https://github.com/koksmat-com/magicbox/blob/238ceea/businesslogic/factory/src/Factory.ts#L45)
