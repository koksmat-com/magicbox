import * as path from 'path';
import * as fs from 'fs';
import { Files } from "@koksmat/core";
import { Db } from "mongodb";
import { Logger } from "@koksmat/core";



export interface ISyncCollectionProviders {
    download: (filePath: string) => Promise<any[]>
    mapNewItem: () => Promise<any>
}

export interface ISyncCollectionOptions {
    collectionName : string
    primaryKey : string
    foreignKey : string
    masterDataProvider: ISyncCollectionProviders

}

export class SyncCollection {


    constructor(
        private readonly db: Db,
        private readonly options: ISyncCollectionOptions) {

    }
    
    public get masterdataCollectionName() : string {
        return this.options.collectionName + " masterdata"
    }

    public get replicaCollectionName() : string {
        return this.options.collectionName 
    }
    
/**
 * Exeucute pipeline which inserts new items from masterdata to replica collection
 * @returns number of items inserted
 */
    async insertNewItems(): Promise<number> {
        const fieldMapping = await this.options.masterDataProvider.mapNewItem()
        const mongo = [
            {
                $lookup:
                {
                    from: this.replicaCollectionName,
                    localField:  this.options.primaryKey,
                    foreignField: this.options.foreignKey,
                    as: "result",
                },
            },
            {
                $match:
                {
                    result: [],
                    _id: { "$ne": null }
                },
            },
            {
                $replaceRoot:

                {
                    newRoot: fieldMapping
                    ,
                },
            },
        ];
        
        //(new Logger).log(JSON.stringify(mongo),this.masterdataCollectionName)

        const newItems = await this.db.collection(this.masterdataCollectionName).aggregate(mongo).toArray()
        if (newItems.length === 0) {
            return 0
        }
        return await (await this.db.collection(this.replicaCollectionName).insertMany(newItems)).insertedCount

    }
    /**
 * Exeucute pipeline which removes old from replica collection which are not in masterdata
 * @returns number of items removed
 */
    async removeOldItems(): Promise<number> {
        const mongo = [
            {
                $lookup: {
                    from: this.masterdataCollectionName,
                    localField: "_id",
                    foreignField: this.options.primaryKey,
                    as: "result",
                },
            },
            {
                $match: {
                    result: [],
                },
            },
        ]
        const oldItems = await this.db.collection(this.replicaCollectionName).aggregate(mongo).toArray()
        if (oldItems.length === 0) {
            return 0
        }
        const ids = oldItems.map(room => room._id)

        for (let id = 0; id < ids.length; id++) {

            await this.db.collection(this.replicaCollectionName).deleteOne({ _id: ids[id] })
        }



        return oldItems.length

    }

    async execute() {
        const dataPath: string = Files.createTempDir()
        const filePath: string = path.join(dataPath, `${this.replicaCollectionName}.json`)
        new Logger(this.constructor.name).log(`Downloading ${this.replicaCollectionName} `)

        await this.options.masterDataProvider.download(filePath)
        const data = fs.readFileSync(filePath).toString()
        if (!data){
            return { counts: { added:0, removed:0, kept:0 } }
        }
        let items = JSON.parse(data)
        if (!Array.isArray(items)){
            items = [items]
        }
        new Logger(this.constructor.name).log(`Saved ${this.replicaCollectionName} to ${filePath}`)
        // Check if collection exists
        if ((await this.db.listCollections({ name: this.masterdataCollectionName }).toArray()).length === 1) {
            await this.db.collection(this.masterdataCollectionName).drop()
        }

        await this.db.collection(this.masterdataCollectionName).insertMany(items)

        const added = await this.insertNewItems()
        const removed = await this.removeOldItems()
        const kept = items.length

        return { counts: { added, removed, kept } }


    }
}