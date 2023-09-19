
import { Marker } from "../marker/marker"; 

export class Export {
    Validity: string = "";
    Sex: string = "";
    Age: number = 0;
    Markers: Marker[] = [];
    Hospitalized: number = 0;
    Dead: number = 0;
    Count: number = 0;



    constructor(validity: string, sex: string, age: number, markers: Marker[], hosp: number, dead: number, count: number) {
        this.Validity = validity;
        this.Sex = sex; 
        this.Age = age;
        this.Markers = markers;
        this.Hospitalized = hosp;
        this.Dead = dead;
        this.Count = count;
    }
}