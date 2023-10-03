


export class Export {
    Validated: string = "";
    Sex: string = "";
    Age: number = 0;
    Illnesses: string[] = [];
    Hospitalized: number = 0;
    Dead: number = 0;
    Count: number = 0;
    Source: string = "";


    constructor(validated: string, sex: string, age: number, illnesses: string[], hosp: number, dead: number, count: number) {
        this.Validated = validated;
        this.Sex = sex; 
        this.Age = age;
        this.Illnesses = illnesses;
        this.Hospitalized = hosp;
        this.Dead = dead;
        this.Count = count;
    }
}