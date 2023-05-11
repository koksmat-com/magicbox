import {
  PowerPacks,
  EndPointHandler,
} from "@koksmat/powerpacks";


import Create from "./create";
import Remove from "./remove";

export function register(path: string, registry: PowerPacks) {
  EndPointHandler.register(new Create(),"post", path, registry);
  EndPointHandler.register(new Remove(),"delete", path, registry);
 
}
