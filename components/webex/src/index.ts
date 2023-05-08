import { IResult } from "@koksmat/core";

export const version = "1.0.0";

export class WebEx {

  private get(path: string)  : Promise<IResult<any>>{
    return new Promise((resolve, reject) => { 
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer YjYxMzk4NzgtYTc2Zi00ODc0LTlkMjEtYzJkNTdlY2ExNDU5ZDVjZWQ3MGItNDcw_PE93_5b8236b1-3020-41a1-bc44-af60a6abd940"
    );

    var requestOptions: RequestInit = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("https://webexapis.com/v1/" + path, requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(resolve({ hasError: false, data: result} )))
      .catch((error) => console.log(resolve({ hasError: false, errorMessage: error} )))
       })
  }

  devices = async () => {
    return (await this.get("devices"));
  };
  device = async (id:string) => {
    return (await this.get("devices/"+id));
  };
}
