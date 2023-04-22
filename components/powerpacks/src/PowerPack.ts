import z from "zod"
export interface IPowerPackDefinition {
    input: z.ZodSchema<any>;
    output: z.ZodSchema<any>;

 }

export interface IDefinitions {
         displayName: string;
     packName: string;
     version: string;
     description: string;
    create?: IPowerPackDefinition;
    read?: IPowerPackDefinition;
    update?: IPowerPackDefinition;
    delete?: IPowerPackDefinition;
    list?: IPowerPackDefinition;
  }

export abstract class PowerPack {
    abstract definition: IPowerPackDefinition;
    validateInput(input: any) {
        return this.definition.input.parse(input);
    }
    validateOutput(output: any) {
        return this.definition.output.parse(output);

    }
}

