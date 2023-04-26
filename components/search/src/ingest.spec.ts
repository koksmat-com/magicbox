import jest from "jest"
import Ingest from "./Ingest"

it("Can connect", async () => {
    const ingest = new Ingest()
   console.log( await ingest.info())
 //  await ingest.indexGameOfThrones()
    expect(1).toBe(1)
  });
  


