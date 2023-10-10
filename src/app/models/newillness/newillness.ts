import { Default } from "../default/default";

export class NewIllness {
    Group: number = 0;
    GroupName: string = "";
    AlternativeNames: string[] = [];
    IsMarker: number = 0;
    Defaults: Default[] = [];


    constructor() { }
}