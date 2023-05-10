import {
  Method,
  IEndPointHandler, LifecycleEvents,
  getExampleFromOpenAPIDefinition
} from "@koksmat/powerpacks";
import { room } from "@koksmat/schemas";
import PowerShell from "./powershell";



export default class RoomCreate implements IEndPointHandler {
  events: LifecycleEvents = {};
  method: Method = "post";

  summary = "Creates a room";
  operationDescription = "Creates a room";
  resultDescription = "Response";

  script = new PowerShell();
  input = room.createRequest;
  output = room.createRequestResult;
  testCases = [getExampleFromOpenAPIDefinition(this.input)];


}
