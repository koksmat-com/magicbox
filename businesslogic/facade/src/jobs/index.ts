import { Importer } from "@koksmat/io";
export default class IO {
    importCSV(pathName: string) {
        const importer = new Importer();
        return importer.importCSV(pathName);
    }
}