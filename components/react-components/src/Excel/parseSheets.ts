import { hash } from "../hash";
const version = "0.2.Blob";
import * as Excel from "exceljs";
import { PipelineDefinition } from ".";
import mapToKeyValues from "./mapToKeyValues";
export default function parseSheets(sheets: Excel.Workbook) {
  function Addresses(sheet: Excel.Worksheet, tag: string | undefined) {
    var values = [];
    var map = new Map();

    sheet.eachRow(function (row: Excel.Row, rowNumber: number) {
      //    if (rowNumber < 2) return
      var addresss = row.getCell("A").value;
      var value = sheet.name;
      if (map.has(value)) {
        map.get(value).push(addresss);
      } else {
        map.set(value, [addresss]);
      }
      values.push(value);
    });
    return mapToKeyValues(map, tag,sheet.name);
  }

  var segments = [];
  const s = sheets.worksheets.map((sheet) => {
    return Addresses(sheet,"xls")[0]
  })
  segments.push({
    name: "Sheets",

    values: [...s],
  });

  return { version, columns:[], segments };
}
