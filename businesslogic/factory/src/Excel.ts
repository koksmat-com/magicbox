import {ExcelUtility} from "@koksmat/utils"

export const parseOrganisationalData = async (xls: string, jsonPath: string, companyName:string,options: any) => {
    const excelUtility = new ExcelUtility();
    const result = await excelUtility.extractOrganisationalData(xls, jsonPath, companyName,options);
}