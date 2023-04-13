import envPaths from "env-paths-ts"
import * as path from "path"
import * as fs from "fs"

const paths = envPaths("365admin")
export class Files {
    public static createPath(p:string): string {
        if (!fs.existsSync(p)) {
            fs.mkdirSync(p,{recursive:true})
        }
        return p
    }
    public static dataPath(): string {
        return Files.createPath(paths.data)
    }
    public static cachePath(): string {
        if (!fs.existsSync(paths.cache)) {
            fs.mkdirSync(paths.cache)
        }
        return Files.createPath(paths.cache)
    }
    public static tempPath(): string {
        if (!fs.existsSync(paths.temp)) {
            fs.mkdirSync(paths.temp)
        }
        return Files.createPath(paths.temp)
    }
    public static configPath(): string {
        if (!fs.existsSync(paths.config)) {
            fs.mkdirSync(paths.config)
        }
        return Files.createPath(paths.config)
    }

    public static createTempDir(): string {
        const tempDir: string = path.join(Files.tempPath(), Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15))
        return Files.createPath(tempDir)
        
    }

}