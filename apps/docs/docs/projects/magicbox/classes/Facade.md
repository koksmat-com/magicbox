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

[Facade.ts:31](https://github.com/koksmat-com/magicbox/blob/cc5f06b/businesslogic/facade/src/Facade.ts#L31)

## Properties

### \_router

• `Private` **\_router**: `Router`

#### Defined in

[Facade.ts:26](https://github.com/koksmat-com/magicbox/blob/cc5f06b/businesslogic/facade/src/Facade.ts#L26)

___

### \_instance

▪ `Static` `Private` **\_instance**: [`Facade`](Facade.md)

#### Defined in

[Facade.ts:24](https://github.com/koksmat-com/magicbox/blob/cc5f06b/businesslogic/facade/src/Facade.ts#L24)

## Accessors

### powerPacks

• `get` **powerPacks**(): `PowerPacks`

#### Returns

`PowerPacks`

#### Defined in

[Facade.ts:59](https://github.com/koksmat-com/magicbox/blob/cc5f06b/businesslogic/facade/src/Facade.ts#L59)

___

### routeKeys

• `get` **routeKeys**(): `string`[]

#### Returns

`string`[]

#### Defined in

[Facade.ts:50](https://github.com/koksmat-com/magicbox/blob/cc5f06b/businesslogic/facade/src/Facade.ts#L50)

___

### router

• `get` **router**(): `Router`

#### Returns

`Router`

#### Defined in

[Facade.ts:55](https://github.com/koksmat-com/magicbox/blob/cc5f06b/businesslogic/facade/src/Facade.ts#L55)

## Methods

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

[Facade.ts:62](https://github.com/koksmat-com/magicbox/blob/cc5f06b/businesslogic/facade/src/Facade.ts#L62)

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

[Facade.ts:66](https://github.com/koksmat-com/magicbox/blob/cc5f06b/businesslogic/facade/src/Facade.ts#L66)

___

### getInstance

▸ `Static` **getInstance**(): [`Facade`](Facade.md)

#### Returns

[`Facade`](Facade.md)

#### Defined in

[Facade.ts:42](https://github.com/koksmat-com/magicbox/blob/cc5f06b/businesslogic/facade/src/Facade.ts#L42)
