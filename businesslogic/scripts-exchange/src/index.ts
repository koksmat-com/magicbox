
import { register as registerSharedMailbox } from "./sharedmailbox";
import { PowerPacks } from "@nexi-magicbox/powerpacks";
export { SharedMailboxCreate} from "./sharedmailbox"

export function register (path: string,packs:PowerPacks) {
registerSharedMailbox("/" + path + "/sharedmailbox",packs)
}