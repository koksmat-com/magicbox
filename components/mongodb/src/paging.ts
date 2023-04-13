
import { Db } from "mongodb";



export interface IPage<T>{
    pageSize : number
    pageNumber : number
    totalItems: number
    values : T[]
   
}


    


/**
 * Run the find method on a collection and return a page of results
 * 
 * @param db 
 * @param collectionName 
 * @param pageSize 
 * @param page 
 * @returns 
 */
export async function getPagedCollection<T> (db:Db,collectionName :string,pageNumber : string,pageSize : string, mapItem : (item:any)=>any) : Promise<IPage<T>> {
    const options = {skip:parseInt(pageNumber)*parseInt(pageSize) ,limit:parseInt(pageSize)}
    const values : T[] = (await db.collection(collectionName).find({},options).toArray()).map(mapItem)
    
    return {
        pageSize:parseInt(pageSize),
        pageNumber:parseInt(pageNumber),
        totalItems:await db.collection(collectionName).countDocuments(),
        values
    }    
}