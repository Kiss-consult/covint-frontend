import { Site } from "./site";

export class User {
    Email: string = "";
    Password: string = "";
    Title: string = "";
    FirstName: string = "";
    LastName: string = "";
    SealNumber: string = "";
    IsCompany: boolean = false;
    CompanyName: string = "";
    InstitutionName: string = "";
    InstitutionDepartment: string = "";
    Site: Site = new Site;
    Phone: string = "";
}