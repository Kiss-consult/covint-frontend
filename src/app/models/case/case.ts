

export class Case {
    Sex: string = "";
    Age: number = 0;
    Hospitalized: boolean = false;
    Dead: boolean = false;
    Illnesses: string[] = [];
    BnoCodes: string[] = [];
    Source: string = "";
    Date: string = "";
    Validated: boolean = false;
    
    constructor() {
        const obj = {
            Age: null,
            Dead: null,
            Hospitalized: null
        }
        Object.assign(this, obj);
    }
}