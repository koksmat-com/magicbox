import { hash } from "../hash";
export default function mapToKeyValues(map: Map<any, any>,tag = "",suffix?:string) {
    var result = []
    for (const keyValue of map.keys()) {

        
        var key = keyValue + suffix ? String(suffix) : ""
        var keyHash = (tag ? (tag + "-") : "") +  hash(keyValue)
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