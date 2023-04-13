export const version = 1
import {cpSync} from "fs"

cpSync("src", "dist", { recursive: true ,filter: (src, dest) => {
    if (src.endsWith(".ts")) {
        return false
    }
    return true
}})
