import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';



extendZodWithOpenApi(z);
export const version = "1.0.0";

export {extractEmails} from "./exchange/address/extractEmails";
export {extractAddressBook} from "./exchange/recipient/extractAddressBook";
export {sharedMailbox}  from "./exchange/sharedMailbox"
export {distributionList}  from "./exchange/distributionList"
export {room}  from "./exchange/room"
export {process}  from "./core"