
import { register as registerSharedMailbox } from "./sharedmailbox";
import { PowerPacks } from "@koksmat/powerpacks";
export { SharedMailboxCreate} from "./sharedmailbox"

export function register (path: string,packs:PowerPacks) {
registerSharedMailbox("/" + path + "/sharedmailbox",packs)
}