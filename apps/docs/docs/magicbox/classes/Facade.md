---
id: "Facade"
title: "Class: Facade"
sidebar_label: "Facade"
sidebar_position: 0
custom_edit_url: null
---

Facade class

Is the core in MagicBox architecture.

From here you can access to all the other modules.

## How to use it
The facadey is implemented using a singleton, so you can access it from anywhere in your code.
```typescript
import { Facade } from "@koksmat/facade";

const facade = Facade.getInstance();

```

## Constructors

### constructor

• **new Facade**()

Constructor is setting up the PowerPacks and the router

#### Defined in

[businesslogic/facade/src/Facade.ts:44](https://github.com/koksmat-com/magicbox/blob/6c094b5/businesslogic/facade/src/Facade.ts#L44)

## Properties

### \_mongoDB

• `Private` **\_mongoDB**: `MongoDB`

#### Defined in

[businesslogic/facade/src/Facade.ts:39](https://github.com/koksmat-com/magicbox/blob/6c094b5/businesslogic/facade/src/Facade.ts#L39)

___

### \_router

• `Private` **\_router**: `Router`

#### Defined in

[businesslogic/facade/src/Facade.ts:38](https://github.com/koksmat-com/magicbox/blob/6c094b5/businesslogic/facade/src/Facade.ts#L38)

___

### \_instance

▪ `Static` `Private` **\_instance**: [`Facade`](Facade.md)

#### Defined in

[businesslogic/facade/src/Facade.ts:36](https://github.com/koksmat-com/magicbox/blob/6c094b5/businesslogic/facade/src/Facade.ts#L36)

## Accessors

### mongoDB

• `get` **mongoDB**(): `MongoDB`

#### Returns

`MongoDB`

#### Defined in

[businesslogic/facade/src/Facade.ts:70](https://github.com/koksmat-com/magicbox/blob/6c094b5/businesslogic/facade/src/Facade.ts#L70)

___

### powerPacks

• `get` **powerPacks**(): `PowerPacks`

#### Returns

`PowerPacks`

#### Defined in

[businesslogic/facade/src/Facade.ts:74](https://github.com/koksmat-com/magicbox/blob/6c094b5/businesslogic/facade/src/Facade.ts#L74)

___

### routeKeys

• `get` **routeKeys**(): `string`[]

#### Returns

`string`[]

#### Defined in

[businesslogic/facade/src/Facade.ts:62](https://github.com/koksmat-com/magicbox/blob/6c094b5/businesslogic/facade/src/Facade.ts#L62)

___

### router

• `get` **router**(): `Router`

#### Returns

`Router`

#### Defined in

[businesslogic/facade/src/Facade.ts:66](https://github.com/koksmat-com/magicbox/blob/6c094b5/businesslogic/facade/src/Facade.ts#L66)

## Methods

### postMessage

▸ **postMessage**(`method`, `route`, `payload`): `Promise`<`IResult`<`any`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `method` | `string` |
| `route` | `string` |
| `payload` | `object` |

#### Returns

`Promise`<`IResult`<`any`\>\>

#### Defined in

[businesslogic/facade/src/Facade.ts:113](https://github.com/koksmat-com/magicbox/blob/6c094b5/businesslogic/facade/src/Facade.ts#L113)

___

### processMessage

▸ **processMessage**(`method`, `route`, `payload`, `viewScript?`): `Promise`<`IResult`<`any`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `method` | `Method` |
| `route` | `string` |
| `payload` | `object` |
| `viewScript?` | `boolean` |

#### Returns

`Promise`<`IResult`<`any`\>\>

#### Defined in

[businesslogic/facade/src/Facade.ts:84](https://github.com/koksmat-com/magicbox/blob/6c094b5/businesslogic/facade/src/Facade.ts#L84)

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

[businesslogic/facade/src/Facade.ts:77](https://github.com/koksmat-com/magicbox/blob/6c094b5/businesslogic/facade/src/Facade.ts#L77)

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

[businesslogic/facade/src/Facade.ts:80](https://github.com/koksmat-com/magicbox/blob/6c094b5/businesslogic/facade/src/Facade.ts#L80)

___

### getInstance

▸ `Static` **getInstance**(): [`Facade`](Facade.md)

#### Returns

[`Facade`](Facade.md)

#### Defined in

[businesslogic/facade/src/Facade.ts:55](https://github.com/koksmat-com/magicbox/blob/6c094b5/businesslogic/facade/src/Facade.ts#L55)
