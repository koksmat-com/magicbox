
export interface IScript {

    code: string;
    commands: string[];
    outputFiles?: string[];
    
    mapPowerShellInput(input:any) : string;
    //parameters: object;
}
