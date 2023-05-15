import { PowerShellStreams } from "@koksmat/core";
import { z } from "zod";
export type LifecycleEvents = {
    onProcessed?:(input: PowerShellStreams) => Promise<any>;
    onProcess?: (input: any) => Promise<any>;
    
};
