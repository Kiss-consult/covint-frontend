import { Default } from "../default/default";

export class NewIllness {
    Group: number = 0;
    GroupName: string = "";
    AlternativeNames: string[] = [];
    IsMarker: number = 0;
    Defaults: Default[] = [];

    constructor(group: number, groupname: string, alternativenames: string[], ismarker: number, defaults: Default[]) {
        this.Group = group;
        this.GroupName = groupname;
        this.AlternativeNames = alternativenames;
        this.IsMarker = ismarker;
        this.Defaults = defaults;

    }



    

}