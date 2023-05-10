import {
  PowerPacks,
  EndPointHandler,
  ITestCase} from "@koksmat/powerpacks";
import * as path from "path";

import Create  from "./create";
import Remove  from "./remove";
import Import from "./import";





export function register(rootPath: string, registry: PowerPacks) {
  EndPointHandler.register(new Remove(), "delete",rootPath, registry);
  EndPointHandler.register(new Create(), "post",rootPath, registry);
  EndPointHandler.register(new Import(), "post",path.join(rootPath, "import"), registry);
}
