import { Importer } from "@koksmat/io";
import { Facade } from "../Facade";
import {
  EventHandler,
  EventTypes,
  IEndPointHandler,
} from "@koksmat/powerpacks";
import * as path from "path";
export default class Jobs {
  async importRooms(pathName: string) {
    const importer = new Importer();

    const items = await importer.importCSV(pathName);

    const facade = Facade.getInstance();
    const endPoint = facade.router.matchRoute("post", "room/import");
    const eventHandler = endPoint?.eventsHandlers?.get("POSTPOWERSHELL");

    if (eventHandler) {
      await eventHandler.emit(items);
    }
  }
}
