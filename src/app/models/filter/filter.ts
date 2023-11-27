

export class Filter {
    Validated: string = "";
    Sex: string = "";
    AgeFrom: number  ;
    AgeTo: number  ;
    Illnesses: string[] = [];
    Source: string = "";
    DateFrom: string = "";
    DateTo: string = "";
    RelativeDate: string = "";

}

/*Yesterday   RelativeDate = "yesterday"
	Last7Days   RelativeDate = "last_7_days"
	Last30Days  RelativeDate = "last_30_days"
	Last3Months RelativeDate = "last_3_months"


    Yesterday   RelativeDate = "yesterday"
	ThisWeek    RelativeDate = "this_week"
	LastWeek    RelativeDate = "last_week"
	LastMonth   RelativeDate = "last_month"
	Last3Months RelativeDate = "last_3_months"
    */