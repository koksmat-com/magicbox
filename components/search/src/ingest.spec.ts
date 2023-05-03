import jest from "jest"
import Ingest from "./Ingest"

it("Can connect", async () => {
    const ingest = new Ingest()
    const info = await ingest.info()
   console.log( info)
 //  await ingest.indexGameOfThrones()
    expect(info.name).toBe("quickstart-es-default-0")
  });
  


