export class Marker {
    BnoCode: string = "";
    Names: string[] = [];

    constructor(bnoCode: string, names: string[] = []) {
        this.BnoCode = bnoCode;
        this.Names = names;
    }
}