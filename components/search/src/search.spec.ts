import jest from "jest";
import { Search } from "./Search";

it("Can connect", async () => {
  const search = new Search();
  console.log(await search.info());
  // await ingest.indexGameOfThrones()
  expect(1).toBe(1);
});

it("Validate lookup", async () => {
  const search = new Search();
  const result = await search.resolveEmailAddress("kmrak");
  // await ingest.indexGameOfThrones()
  expect(result).toBe("ab88c572-b8fe-4797-be24-819b66f5a9f7");
});
