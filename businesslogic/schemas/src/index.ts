import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';
import fields from './exchange/fields';



extendZodWithOpenApi(z);
export const version = "1.0.0";

export {extractEmails} from "./exchange/address/extractEmails";
export {extractAddressBook} from "./exchange/recipient/extractAddressBook";
//export {sharedMailbox}  from "./exchange/sharedMailbox"
export {distributionList}  from "./exchange/distributionList"
//export {room}  from "./exchange/room"
export {process}  from "./core"

export {default as exchangeFields} from "./exchange/fields";
export {default as exchangeRecords} from "./exchange/records";
export {default as coreFields} from "./core/fields";
export {default as coreRecords} from "./core/records";