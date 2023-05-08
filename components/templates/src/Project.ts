import * as fs from "fs";
import * as path from "path";
export class Project {
  private _folder: string;
  constructor(folder: string) {
    this._folder = folder;
  }

  public get info(): any {
    return JSON.parse(
      fs.readFileSync(path.join(this._folder, "package.json"), "utf8")
    );
  }

  public get classes(): string[] {
    return fs
      .readdirSync(path.join(this._folder, "src"), { withFileTypes: true })
      .filter((file) => file.isDirectory() && !file.name.startsWith("."))
      .map((file) => {
        return file.name;
      });
  }

  public addClass(className: string) {
    const classFolder = path.join(this._folder, "src", className.toLowerCase().trim());
    fs.mkdirSync(classFolder);
    fs.writeFileSync(
      path.join(classFolder, `${className}.ts`),
      `export defalt class ${className} {
    constructor() {
        console.log("${className}")
    }
  }`)
}
}
