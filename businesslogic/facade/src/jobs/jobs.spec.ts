import jest from "jest"
import Jobs from "."
import * as path from "path";
import debug from "debug"
it("Can run import", async () => {
    const log =  debug("magicbox.facade")
    const jobs = new Jobs()
   log("importing rooms")
    const pathName = path.join(__dirname, "rooms.csv");
    await jobs.importRooms(pathName)

 //   expect(items.hasError).toBeFalsy()
  });
  

