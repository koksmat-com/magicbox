
import { register as registerSharedMailbox } from "./sharedmailbox";
import { register as registerDistributionList } from "./distributionlist";
import { register as registerRoom } from "./room";
import { PowerPacks } from "@koksmat/powerpacks";


export function register (path: string,packs:PowerPacks) {
registerSharedMailbox("/" + path + "/sharedmailbox",packs)
registerRoom("/" + path + "/room",packs)
registerDistributionList("/" + path + "/distributionlist",packs)
}