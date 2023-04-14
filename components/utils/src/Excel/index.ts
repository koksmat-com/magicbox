import * as Excel from 'exceljs'
import { IResult, webRequest } from '@koksmat/core'
import { parseOrganisationalData } from './parseExcel'
import * as fs from 'fs'
export interface PipelineDefinition {
    id: string
    title: string
  
    prefix: string
    slug: string
    


}
export  class ExcelUtility {


     private async processExcel(workbook: Excel.Workbook,companyName:string): Promise<IResult<any>> {
        return new Promise(async (resolve, reject) => {
      
          var sheets : any[] = [];
          workbook.worksheets.forEach(ws => sheets.push(ws.name));
      
          if (sheets.length !== 1) {
      
            resolve({ hasError: true, errorMessage: "Only one Sheet supported pr file" });
      
            return;
          }
      
          var ws: Excel.Worksheet = workbook.worksheets[0];
          var row: Excel.Row = ws.getRow(1);
          var columns : any[] = [];
      
          
      
          var onSheetLoaded = await parseOrganisationalData(ws, companyName);
          row.eachCell(cell => columns.push(cell.value));
          resolve({ hasError: false, data: { sheets, columns, results: { onSheetLoaded } } });
      
        });
      
      }
    async extractOrganisationalData (workbook: Excel.Workbook, companyName:string) : Promise<string>{
      
        var d = await this.processExcel(workbook,companyName)

       return JSON.stringify(d.data, null, 2)
    }
}