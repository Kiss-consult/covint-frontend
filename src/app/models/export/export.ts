


export class Export {
    Validated: string = "";
    Sex: string = "";
    Age: number = 0;
    Illnesses: string[] = [];
    Hospitalized: number = 0;
    Dead: number = 0;
    Count: number = 0;
    Source: string = "";
    DateFrom: string = "";
    DateTo: string = "";


    constructor(validated: string, sex: string, age: number, illnesses: string[], hosp: number, dead: number, count: number, datefrom : string, dateto: string) {
        this.Validated = validated;
        this.Sex = sex; 
        this.Age = age;
        this.Illnesses = illnesses;
        this.Hospitalized = hosp;
        this.Dead = dead;
        this.Count = count;
        this.DateFrom = datefrom;
        this.DateTo = dateto;
    }
}