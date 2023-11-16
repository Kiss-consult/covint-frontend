import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Case } from 'src/app/models/case/case';
import { Err, Ok, Result, fromJSON } from 'src/app/models/utils/result';
import { Illness } from 'src/app/models/illness/illness';
import { Filter } from 'src/app/models/filter/filter';
import { Export } from 'src/app/models/export/export';
import { ConfigService } from '../config/config.service';
import { NewIllness } from 'src/app/models/newillness/newillness';
import { LoginService } from '../login/login.service';
import { SavedFilter } from 'src/app/models/savedfilter/savedfilter';
import { Override } from 'src/app/models/override/override';
import { Default } from 'src/app/models/default/default';
import { Auditlog } from 'src/app/models/auditlog/auditlog';


@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private url: string = "";
  markers: string[] = [];
  username: string = "";


  constructor(private httpClient: HttpClient, private config: ConfigService,
    private loginService: LoginService) {
    this.url = this.config.config.BackendUrl;
  }

  public hello(): Observable<string> {
    return this.httpClient.get(this.url + "/", { responseType: "text" });
  }


  private getParams(): HttpParams {
    return new HttpParams().set('pagenumber', '0',).set('size', "5");  
    
      ;
  }
  // This function inserts the new user into the Auth.
  public getAuditlogs(): Observable<Result<Auditlog[]>> {
    let options = {
      headers: this.getHeaders(),
      params: this.getParams()     
    };
    const url = this.url + "/auditlog";
    return this.httpClient.get<Result<Auditlog[]>>(url, options).pipe(
      map(result => fromJSON<Auditlog[]>(JSON.stringify(result))),
      catchError(error => of(new Err<Auditlog[]>(error)))
    );

  }
  public downloadExport(filter: Filter): Observable<Result<[any[], string]>> {
    let options = {
      headers: this.getHeaders(),
      responseType: "blob" as "json"
    };
    return this.httpClient.post<Blob>(this.url + "/exports/download", filter, options).pipe(
      map(response => {
        let dataType = response.type;
        let binaryData = [];
        binaryData.push(response);
        let result: [any[], string] = [binaryData, dataType]
        return new Ok(result);
      }),
      catchError(error => of(new Err<[any[], string]>(error)))
    );
  }

  public downloadRates(): Observable<Result<[any[], string]>> {
    let options = {
      headers: this.getHeaders(),
      responseType: "blob" as "json"
    };
    return this.httpClient.get<Blob>(this.url + "/exports/rate", options).pipe(
      map(response => {
        let dataType = response.type;
        let binaryData = [];
        binaryData.push(response);
        let result: [any[], string] = [binaryData, dataType]
        return new Ok(result);
      }),
      catchError(error => of(new Err<[any[], string]>(error)))
    );
  }

  // This function filters the exports with the given filter.
  public filterExports(filter: Filter): Observable<Result<Export[]>> {
    const url = this.url + "/exports/filter";

    // just for test
    //let marker1 = new Marker("BNO1", ["betegseg1", "betegseg2"]);
    //let marker2 = new Marker("BNO2", ["betegseg3", "betegseg4"]);


    return this.httpClient.post<Result<Export[]>>(url, filter, { headers: this.getHeaders() }).pipe(
      map(result => fromJSON<Export[]>(JSON.stringify(result))),

      // map(result => new Ok([new Export("valid", "Nő", 20, [marker1, marker2], 1, 1, 1)])),
      catchError(error => of(new Err<Export[]>(error)))
    );

  }
  // This function save  the  given filter.
  public filterSave(filtername: string, filter: Filter): Observable<Result<{}>> {
    const url = this.url + "/filters/save";
    let savedfilter = { filtername, filter }
    return this.httpClient.post<Result<{}>>(url, savedfilter,{ headers: this.getHeaders() }).pipe(
      map(result => fromJSON<{}>(JSON.stringify(result))),
      catchError(error => of(new Err<{}>(error)))
    );
  }

 // This function save  the  given filter.
 public changeIllness(name: string, ismarker: boolean): Observable<Result<{}>> {
  const url = this.url + "/illnesses/change";
  let changed = { name, ismarker }
  return this.httpClient.post<Result<{}>>(url,changed,{ headers: this.getHeaders() }).pipe(
    map(result => fromJSON<{}>(JSON.stringify(result))),
    catchError(error => of(new Err<{}>(error)))
  );
}
public overrideCombination(illnesses: string[], defaults: Default[]): Observable<Result<{}>> {
  const url = this.url + "/illnesses/change";
  let combination = { illnesses, defaults }
  return this.httpClient.post<Result<{}>>(url,combination,{ headers: this.getHeaders() }).pipe(
    map(result => fromJSON<{}>(JSON.stringify(result))),
    catchError(error => of(new Err<{}>(error)))
  );
}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      "Content-Type": "application/json"
    });
  }

  // This function returns all the illnesses stored in the database.
  public getAllIllnesses(): Observable<Result<Illness[]>> {
    const url = this.url + "/illnesses/all";
    return this.httpClient.get<Result<Illness[]>>(url, { headers: this.getHeaders() }).pipe(
      map(result => fromJSON<Illness[]>(JSON.stringify(result))),
      catchError(error => of(new Err<Illness[]>(error)))
    );
  }
  // This function returns all the markers stored in the database.
  public getMarkers(): Observable<Result<string[]>> {
    const url = this.url + "/illnesses/markers";
    return this.httpClient.get<Result<string[]>>(url, {headers: this.getHeaders()}).pipe(
      map(result => fromJSON<string[]>(JSON.stringify(result))),
      catchError(error => of(new Err<string[]>(error)))
    );
  }

    // This function returns all the illnesses stored in the database.
  public getFilterList(): Observable<Result<SavedFilter[]>> {
    const url = this.url + "/filters/list";
    return this.httpClient.get<Result<SavedFilter[]>>(url, { headers: this.getHeaders() }).pipe(
      map(result => fromJSON<SavedFilter[]>(JSON.stringify(result))),
      catchError(error => of(new Err<SavedFilter[]>(error)))
    );
  }

  // This function inserts the given validated case into the database.
  public insertValidated(case_: Case): Observable<Result<{}>> {
    const url = this.url + "/cases/validated/upload";
    return this.httpClient.post<Result<{}>>(url, case_, { headers: this.getHeaders() }).pipe(
      map(result => fromJSON<{}>(JSON.stringify(result))),
      catchError(error => of(new Err<{}>(error)))
    );
  }
  // This function inserts the new illness into the database.
  public insertIllness(newillness_: NewIllness): Observable<Result<{}>> {
    const url = this.url + "/illnesses/add";
    return this.httpClient.post<Result<{}>>(url, newillness_, { headers: this.getHeaders() }).pipe(
      map(result => fromJSON<{}>(JSON.stringify(result))),
      catchError(error => of(new Err<{}>(error)))
    );
  }

// This function inserts the new illness into the database.
public insertOverride(override: Override): Observable<Result<{}>> {
  const url = this.url + "/rates/override";
  return this.httpClient.post<Result<{}>>(url, override, { headers: this.getHeaders() }).pipe(
    map(result => fromJSON<{}>(JSON.stringify(result))),
    catchError(error => of(new Err<{}>(error)))
  );
}

}
