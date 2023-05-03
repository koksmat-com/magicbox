import { IBase } from "../../IBase";
import records from "../records";

export default interface IRecipient extends IBase{
    alias: string;
    recipientTypeDetails: string;
    emailAddresses: string[];
    displayName: string;
    distinguishedName: string;
}


