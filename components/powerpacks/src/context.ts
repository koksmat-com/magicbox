export const version = 1


export interface IContext  {
    insertMongo : (document:any) => void,
    insertSharePoint : (document:any) => void
    
}