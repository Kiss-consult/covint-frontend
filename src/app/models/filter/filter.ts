import { Marker } from "../marker/marker";

export class Filter {
    Validity: string = "";
    Sex: string = "";
    AgeFrom: number = 0;
    AgeTo: number = 0;
    Markers: Marker[] = [];
}