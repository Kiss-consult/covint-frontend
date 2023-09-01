import { Marker } from "../marker/marker";

export class Case {
    Sex: string = "";
    Age: number = 0;
    Hospitalized: boolean = false;
    Dead: boolean = false;
    Markers: Marker[] = [];
    Source: string = "";
    Date: string = "";

    constructor() {}
}