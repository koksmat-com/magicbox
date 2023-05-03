import jest from "jest"
import {Importer} from "./importer"
import * as path from "path";
it("Can parse CSV file", async () => {
    const importer = new Importer()
    const pathName = path.join(__dirname, "rooms.csv");
    const info = await importer.importCSV(pathName)
  
 //  await ingest.indexGameOfThrones()
    expect(info.hasError).toBeFalsy()
  });
  

  it("Can import CSV file", async () => {
   const importer = new Importer()
   const pathName = path.join(__dirname, "rooms.csv");
   const readRoomsResult = await importer.importCSV(pathName)


 
//  await ingest.indexGameOfThrones()
   expect(readRoomsResult.hasError).toBeFalsy()
 });


