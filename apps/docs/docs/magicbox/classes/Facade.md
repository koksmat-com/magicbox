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

[businesslogic/facade/src/Facade.ts:42](https://github.com/koksmat-com/magicbox/blob/5d37625/businesslogic/facade/src/Facade.ts#L42)

## Properties

### \_router

• `Private` **\_router**: `Router`

#### Defined in

[businesslogic/facade/src/Facade.ts:37](https://github.com/koksmat-com/magicbox/blob/5d37625/businesslogic/facade/src/Facade.ts#L37)

___

### \_instance

▪ `Static` `Private` **\_instance**: [`Facade`](Facade.md)

#### Defined in

[businesslogic/facade/src/Facade.ts:35](https://github.com/koksmat-com/magicbox/blob/5d37625/businesslogic/facade/src/Facade.ts#L35)

## Accessors

### powerPacks

• `get` **powerPacks**(): `PowerPacks`

#### Returns

`PowerPacks`

#### Defined in

[businesslogic/facade/src/Facade.ts:65](https://github.com/koksmat-com/magicbox/blob/5d37625/businesslogic/facade/src/Facade.ts#L65)

___

### routeKeys

• `get` **routeKeys**(): `string`[]

#### Returns

`string`[]

#### Defined in

[businesslogic/facade/src/Facade.ts:57](https://github.com/koksmat-com/magicbox/blob/5d37625/businesslogic/facade/src/Facade.ts#L57)

___

### router

• `get` **router**(): `Router`

#### Returns

`Router`

#### Defined in

[businesslogic/facade/src/Facade.ts:61](https://github.com/koksmat-com/magicbox/blob/5d37625/businesslogic/facade/src/Facade.ts#L61)

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

[businesslogic/facade/src/Facade.ts:104](https://github.com/koksmat-com/magicbox/blob/5d37625/businesslogic/facade/src/Facade.ts#L104)

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

[businesslogic/facade/src/Facade.ts:75](https://github.com/koksmat-com/magicbox/blob/5d37625/businesslogic/facade/src/Facade.ts#L75)

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

[businesslogic/facade/src/Facade.ts:68](https://github.com/koksmat-com/magicbox/blob/5d37625/businesslogic/facade/src/Facade.ts#L68)

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

[businesslogic/facade/src/Facade.ts:71](https://github.com/koksmat-com/magicbox/blob/5d37625/businesslogic/facade/src/Facade.ts#L71)

___

### getInstance

▸ `Static` **getInstance**(): [`Facade`](Facade.md)

#### Returns

[`Facade`](Facade.md)

#### Defined in

[businesslogic/facade/src/Facade.ts:50](https://github.com/koksmat-com/magicbox/blob/5d37625/businesslogic/facade/src/Facade.ts#L50)
