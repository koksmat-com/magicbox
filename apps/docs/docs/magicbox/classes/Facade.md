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

Facade.ts:34

## Properties

### \_router

• `Private` **\_router**: `Router`

#### Defined in

Facade.ts:29

___

### \_instance

▪ `Static` `Private` **\_instance**: [`Facade`](Facade.md)

#### Defined in

Facade.ts:27

## Accessors

### powerPacks

• `get` **powerPacks**(): `PowerPacks`

#### Returns

`PowerPacks`

#### Defined in

Facade.ts:62

___

### routeKeys

• `get` **routeKeys**(): `string`[]

#### Returns

`string`[]

#### Defined in

Facade.ts:53

___

### router

• `get` **router**(): `Router`

#### Returns

`Router`

#### Defined in

Facade.ts:58

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

Facade.ts:102

___

### processMessage

▸ **processMessage**(`method`, `route`, `message`): `Promise`<`IResult`<`any`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `method` | `string` |
| `route` | `string` |
| `message` | `IMessage` |

#### Returns

`Promise`<`IResult`<`any`\>\>

#### Defined in

Facade.ts:74

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

Facade.ts:65

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

Facade.ts:69

___

### getInstance

▸ `Static` **getInstance**(): [`Facade`](Facade.md)

#### Returns

[`Facade`](Facade.md)

#### Defined in

Facade.ts:45
