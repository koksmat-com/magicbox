import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';
import { mailbox } from './exchange/mailbox';


extendZodWithOpenApi(z);
export const version = "1.0.0";

export {extractEmails} from "./exchange/address/extractEmails";
export {extractAddressBook} from "./exchange/recipient/extractAddressBook";
export {mailbox}  from "./exchange/mailbox"
export {resource}  from "./exchange/resource"