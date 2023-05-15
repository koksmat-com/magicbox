import * as Excel from 'exceljs'
import { IResult, webRequest } from '@koksmat/core'
import parseOrganisationalData  from './parseOrganisationalData'
import parseSheets from './parseSheets'
import * as fs from 'fs'
export interface PipelineDefinition {
    id: string
    title: string
  
    prefix: string
    slug: string
    


}
export  class ExcelUtility {


     private async processOrganisationalData(workbook: Excel.Workbook,companyName:string): Promise<IResult<any>> {
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

      private async processSheets(workbook: Excel.Workbook): Promise<IResult<any>> {
        return new Promise(async (resolve, reject) => {
      
   
      
          var onSheetLoaded = await parseSheets(workbook);
        
          resolve({ hasError: false, data: { sheets:[], columns:[], results: { onSheetLoaded } } });
      
        });
      
      }
    async extractOrganisationalData (workbook: Excel.Workbook, companyName:string) : Promise<string>{
      
        var d = await this.processOrganisationalData(workbook,companyName)

       return JSON.stringify(d.data, null, 2)
    }


    async extractSheets(workbook: Excel.Workbook) : Promise<string> {
        var d = await this.processSheets(workbook)
        return JSON.stringify(d.data, null, 2)
    }
}