import { Importer } from "@koksmat/io";
import { Facade } from "../Facade";
import {
  EventHandler,
  EventTypes,
  IEndPointHandler,
} from "@koksmat/powerpacks";
import * as path from "path";
import { prototype } from "events";
import debug from "debug";
export default class Jobs {
  async importRooms(pathName: string) {
    const importer = new Importer();

    const items = await importer.importCSV(pathName);

    const facade = Facade.getInstance();
    const endPoint: any = facade.router.matchRoute(
      "post",
      "exchange/room/import"
    );

    if (endPoint) {
      if (endPoint.onPostProcessPowerShellRequest) {
        debug("magicbox.facade")("Calling onPostProcessPowerShellRequest")
        endPoint.onPostProcessPowerShellRequest(items.data);
      }
      // await eventHandler.emit(items);
    }
  }
}
