export interface IRecipient {
  Id: string;
  Guid: string;
  Alias: string;
  RecipientTypeDetails: string;
  EmailAddresses: string[];
  DisplayName: string;
  DistinguishedName: string;
}
