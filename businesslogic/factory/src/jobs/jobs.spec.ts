import jest from "jest"
import IO from "."
import * as path from "path";
it("Can parse CSV file", async () => {
    const io = new IO()
    const pathName = path.join(__dirname, "rooms.csv");
    const info = await io.importCSV(pathName)
  
 //  await ingest.indexGameOfThrones()
    expect(info.hasError).toBeFalsy()
  });
  

