import { hash } from "../hash";
const version = "0.2.Blob"
import * as Excel from 'exceljs'
import { PipelineDefinition } from ".";
export function parseOrganisationalData(sheet:Excel.Worksheet, companyName: string ) {

    function isManager(row: { getCell: (arg0: string) => any }) {
        var I = row.getCell("I")
        var M = row.getCell("M")

        if (M.value) {

            return true
        }
        if (I.value === "Employee") {
            return false
        }
        return true

    }
    function mapToKeyValues(map: Map<any, any>,tag = "",suffix = " [Nets]") {
        var result = []
        for (const keyValue of map.keys()) {

            
            var key = keyValue + suffix
            var keyHash = tag + "-"+  hash(keyValue)
            result.push({ key, keyHash, values: map.get(keyValue) })

        }

        return result.sort((a, b) => {

            if (a.key < b.key) {
                return -1;
            }
            if (a.key > b.key) {
                return 1;
            }
            return 0;

        })
    }
    function uniqueColumns(column: string, managersOnly: boolean, prefix: string,tag: string | undefined,suffix: string | undefined) {
        var map = new Map()
        var values = []
        var map = new Map()

        sheet.eachRow(function (row: Excel.Row, rowNumber: number) {
            if (rowNumber < 2) return
            if (managersOnly && !isManager(row)) return
            var value = row.getCell(column).value
            if (!value) return
            // if (value.indexOf("object")>-1){
            //     debugger

            // }

            value = prefix + value
            if (map.has(value)) {

                map.get(value).push(row.getCell("C").value)
            } else {
                map.set(value, [row.getCell("C").value])
            }
            values.push(value)
        });
        return mapToKeyValues(map,tag,suffix)

    }

    function L2L3(managersOnly: boolean, prefix: string,tag: string | undefined,suffix: string | undefined) {
        var values = []
        var map = new Map()

        sheet.eachRow(function (row: Excel.Row, rowNumber: number) {
            if (rowNumber < 2) return
            if (managersOnly && !isManager(row)) return
            var L = row.getCell("L")
            var J = row.getCell("J")

            var l3 = (row.getCell("L")?.value as any)?.result? (row.getCell("L").value as any).result  : row.getCell("L").value
            var l2 :any= row.getCell("J").value//ToString()
            if (l3 === "X") return
            if (l3?.error) return
            if (l2?.error) return
            if (l3 === "[object Object]") {
                debugger
            }
            var value = prefix + l3 + " (" + l2 + ")"
            if (value.indexOf("object") > -1) {
                debugger
                return
            }

            if (map.has(value)) {
                map.get(value).push(row.getCell("C").value)
            } else {
                map.set(value, [row.getCell("C").value])
            }
            values.push(value)
        });
        return mapToKeyValues(map,tag,suffix)
        //var uniqueValues = new Set(values)
        //return [...uniqueValues]

    }
    function ManagerCountry(prefix: string,tag: string | undefined,suffix: string | undefined) {
        var values = []
        var map = new Map()


        sheet.eachRow(function (row: Excel.Row, rowNumber: number) {
            if (rowNumber < 2) return



            var manager = row.getCell("H").value
            var country = row.getCell("E").value//ToString()

            var value = prefix + " " + manager + " in " + country


            if (map.has(value)) {
                map.get(value).push(row.getCell("C").value)
            } else {
                map.set(value, [row.getCell("C").value])
            }
            values.push(value)
        });
        return mapToKeyValues(map,tag,suffix)
        //var uniqueValues = new Set(values)
        //return [...uniqueValues]

    }
    function L3Country(prefix: string,tag: string | undefined,suffix: string | undefined) {
        var values = []
        var map = new Map()

       
        sheet.eachRow(function (row: Excel.Row, rowNumber: number) {
            if (rowNumber < 2) return



            
            var l3 = (row.getCell("L")?.value as any)?.result? (row.getCell("L").value as any).result  : row.getCell("L").value
            var l2 :any = row.getCell("J").value//ToString()
            if (l2?.error) return
            if (l3 === "X") return
            if (l3?.error) return
            
            if (l3 === "[object Object]") {
                debugger
            }
            var country = row.getCell("E").value//ToString()

            var value = prefix + " " + l3 + " (" + l2 + ") in " + country


            if (map.has(value)) {
                map.get(value).push(row.getCell("C").value)
            } else {
                map.set(value, [row.getCell("C").value])
            }
            values.push(value)
        });
        return mapToKeyValues(map,tag,suffix)
        //var uniqueValues = new Set(values)
        //return [...uniqueValues]

    }

    function locations(managersOnly: boolean, prefix: string,tag: string | undefined,suffix: string | undefined) {
        var values = []
        var map = new Map()
        sheet.eachRow(function (row: Excel.Row, rowNumber: number) {
            if (rowNumber < 2) return
            if (managersOnly && !isManager(row)) return
            var K = row.getCell("K")

            var value = prefix + K.value

            if (map.has(value)) {
                map.get(value).push(row.getCell("C").value)
            } else {
                map.set(value, [row.getCell("C").value])
            }
            values.push(value)
        });

        return mapToKeyValues(map,tag,suffix)
        //var uniqueValues = new Set(values)
        //return [...uniqueValues]

    }
    function OrgUnits(prefix: string,tag: string | undefined,suffix: string | undefined) {
        var values = []
        var map = new Map()
        sheet.eachRow(function (row: Excel.Row, rowNumber: number) {
            if (rowNumber < 2) return
            var F = row.getCell("F")
            var G = row.getCell("G")
            var value = prefix + G.value + " (" + F.value + ")"
            if (value.indexOf("object") > -1) {
                debugger
            }
            if (map.has(value)) {
                map.get(value).push(row.getCell("C").value)
            } else {
                map.set(value, [row.getCell("C").value])
            }
            values.push(value)
        });

        return mapToKeyValues(map,tag,suffix)
        //var uniqueValues = new Set(values)
        //return [...uniqueValues]

    }



    var columns: any[] = []

    sheet.getRow(1).eachCell((cell: { value: any }) => columns.push(cell.value))

    var segments = []

    segments.push({
        name: "Companies",
        values: uniqueColumns("D", false, "All employees ","company"," [" + companyName+"]")
    })

    segments.push({
        name: "Organisational Units",
        
        values: OrgUnits("OU ","ou"," [Nets]")
    })

    segments.push({
        name: "Countries",
        
        values: uniqueColumns("E", false, "All employees ","country"," [" + companyName+"]")
    })
    segments.push({
        name: "Managers only pr Country",
        
        values: uniqueColumns("E", true, "All managers ","country-managers"," [" + companyName+"]")
    })
    segments.push({
        name: "BU/GU",
        
        values: uniqueColumns("J", false, "All employees ","bu"," [" + companyName+"]")
    })
    segments.push({
        name: "Managers only pr BU/GU",
        
        values: uniqueColumns("J", true, "All managers ","bu-managers"," [" + companyName+"]")
    })
    segments.push({
        name: "Locations",
        
        values: locations(false, "All employees at ","locations"," [" + companyName+"]")
    })
    segments.push({
        name: "Managers only pr Location ",
        
        values: locations(true, "All managers at ","location-managers"," [" + companyName+"]")
    })
    segments.push({
        name: "Level 3 Units",
        
        values: L2L3(false, "Level 3 All employees ","l3"," [" + companyName+"]")
    })
    segments.push({
        name: "Level 3 pr Country",
        
        values: L3Country("Level 3 All employees","l3-country"," [" + companyName+"]")
    })
    segments.push({
        name: "Level 3 Managers",
        
        values: L2L3(true, "Level 3 All managers","l3-managers"," [" + companyName+"]")
    })

    segments.push({
        name: "Direct Reports to pr Country",
        
        values: ManagerCountry("Reporting to","reportto-country"," [" + companyName+"]")
    })




    return { version, columns, segments };

}