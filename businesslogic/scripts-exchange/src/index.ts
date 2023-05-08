
import { register as sharedMailbox } from "./sharedmailbox";
import { register as distributionList } from "./distributionlist";
import { register as room } from "./room";
import { PowerPacks } from "@koksmat/powerpacks";


export function register (path: string,packs:PowerPacks) {
sharedMailbox("/" + path + "/sharedmailbox",packs)
room("/" + path + "/room",packs)
distributionList("/" + path + "/distributionlist",packs)
}