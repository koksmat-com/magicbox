---
id: "SharedMailboxCreate"
title: "Class: SharedMailboxCreate"
sidebar_label: "SharedMailboxCreate"
sidebar_position: 0
custom_edit_url: null
---

## Implements

- `IEndPointHandler`

## Constructors

### constructor

• **new SharedMailboxCreate**()

#### Defined in

[sharedmailbox/index.ts:26](https://github.com/nexi-intra/magicbox/blob/9647899/businesslogic/scripts-exchange/src/sharedmailbox/index.ts#L26)

## Properties

### input

• **input**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `identity` | `string` |
| `schema` | `ZodType`<`any`, `ZodTypeDef`, `any`\> |

#### Implementation of

IEndPointHandler.input

#### Defined in

[sharedmailbox/index.ts:23](https://github.com/nexi-intra/magicbox/blob/9647899/businesslogic/scripts-exchange/src/sharedmailbox/index.ts#L23)

___

### method

• **method**: `Method` = `"post"`

#### Implementation of

IEndPointHandler.method

#### Defined in

[sharedmailbox/index.ts:16](https://github.com/nexi-intra/magicbox/blob/9647899/businesslogic/scripts-exchange/src/sharedmailbox/index.ts#L16)

___

### operationDescription

• **operationDescription**: `string` = `"Creates a shared mailbox"`

#### Implementation of

IEndPointHandler.operationDescription

#### Defined in

[sharedmailbox/index.ts:19](https://github.com/nexi-intra/magicbox/blob/9647899/businesslogic/scripts-exchange/src/sharedmailbox/index.ts#L19)

___

### output

• **output**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `identity` | `string` |
| `schema` | `ZodType`<`any`, `ZodTypeDef`, `any`\> |

#### Implementation of

IEndPointHandler.output

#### Defined in

[sharedmailbox/index.ts:24](https://github.com/nexi-intra/magicbox/blob/9647899/businesslogic/scripts-exchange/src/sharedmailbox/index.ts#L24)

___

### path

• **path**: `string` = `path`

#### Defined in

[sharedmailbox/index.ts:17](https://github.com/nexi-intra/magicbox/blob/9647899/businesslogic/scripts-exchange/src/sharedmailbox/index.ts#L17)

___

### resultDescription

• **resultDescription**: `string` = `"Response"`

#### Implementation of

IEndPointHandler.resultDescription

#### Defined in

[sharedmailbox/index.ts:20](https://github.com/nexi-intra/magicbox/blob/9647899/businesslogic/scripts-exchange/src/sharedmailbox/index.ts#L20)

___

### script

• **script**: `any`

#### Implementation of

IEndPointHandler.script

#### Defined in

[sharedmailbox/index.ts:22](https://github.com/nexi-intra/magicbox/blob/9647899/businesslogic/scripts-exchange/src/sharedmailbox/index.ts#L22)

___

### summary

• **summary**: `string` = `"Creates a shared mailbox"`

#### Implementation of

IEndPointHandler.summary

#### Defined in

[sharedmailbox/index.ts:18](https://github.com/nexi-intra/magicbox/blob/9647899/businesslogic/scripts-exchange/src/sharedmailbox/index.ts#L18)

## Methods

### process

▸ **process**(`input`): `Promise`<`IResult`<`any`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `Request` |

#### Returns

`Promise`<`IResult`<`any`\>\>

#### Implementation of

IEndPointHandler.process

#### Defined in

[sharedmailbox/index.ts:64](https://github.com/nexi-intra/magicbox/blob/9647899/businesslogic/scripts-exchange/src/sharedmailbox/index.ts#L64)
