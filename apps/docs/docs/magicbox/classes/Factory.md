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

[Factory.ts:31](https://github.com/koksmat-com/magicbox/blob/917124f/businesslogic/factory/src/Factory.ts#L31)

## Properties

### \_router

• `Private` **\_router**: `Router`

#### Defined in

[Factory.ts:26](https://github.com/koksmat-com/magicbox/blob/917124f/businesslogic/factory/src/Factory.ts#L26)

___

### \_instance

▪ `Static` `Private` **\_instance**: [`Factory`](Factory.md)

#### Defined in

[Factory.ts:24](https://github.com/koksmat-com/magicbox/blob/917124f/businesslogic/factory/src/Factory.ts#L24)

## Accessors

### powerPacks

• `get` **powerPacks**(): `PowerPacks`

#### Returns

`PowerPacks`

#### Defined in

[Factory.ts:59](https://github.com/koksmat-com/magicbox/blob/917124f/businesslogic/factory/src/Factory.ts#L59)

___

### routeKeys

• `get` **routeKeys**(): `string`[]

#### Returns

`string`[]

#### Defined in

[Factory.ts:50](https://github.com/koksmat-com/magicbox/blob/917124f/businesslogic/factory/src/Factory.ts#L50)

___

### router

• `get` **router**(): `Router`

#### Returns

`Router`

#### Defined in

[Factory.ts:55](https://github.com/koksmat-com/magicbox/blob/917124f/businesslogic/factory/src/Factory.ts#L55)

## Methods

### getInstance

▸ `Static` **getInstance**(): [`Factory`](Factory.md)

#### Returns

[`Factory`](Factory.md)

#### Defined in

[Factory.ts:42](https://github.com/koksmat-com/magicbox/blob/917124f/businesslogic/factory/src/Factory.ts#L42)
