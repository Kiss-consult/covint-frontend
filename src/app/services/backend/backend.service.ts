import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, catchError, map, of } from 'rxjs';
import { Case } from 'src/app/models/case/case';
import { Err, Ok, Result, fromJSON } from 'src/app/models/utils/result';
import { Illness } from 'src/app/models/illness/illness';
import { Filter } from 'src/app/models/filter/filter';
import { Export } from 'src/app/models/export/export';


@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private url: string = environment.backendUrl;
  constructor(private httpClient: HttpClient) { }

  public hello(): Observable<string> {
    return this.httpClient.get(this.url + "/", { responseType: "text" });
  }

  public downloadExport(filter: Filter): Observable<Result<[any[], string]>> {
    return this.httpClient.post(this.url + "/exports/download", filter, { responseType: "blob" }).pipe(
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


    return this.httpClient.post<Result<Export[]>>(url, filter).pipe(
      map(result => fromJSON<Export[]>(JSON.stringify(result))),

     // map(result => new Ok([new Export("valid", "Nő", 20, [marker1, marker2], 1, 1, 1)])),
      catchError(error => of(new Err<Export[]>(error)))
    );

  }

  // This function returns all the illnesses stored in the database.
  public getAllIllnesses(): Observable<Result<Illness[]>> {
    const url = this.url + "/illnesses/all";
    return this.httpClient.get<Result<Illness[]>>(url).pipe(
      map(result => fromJSON<Illness[]>(JSON.stringify(result))),
      catchError(error => of(new Err<Illness[]>(error)))
    );
  }

  // This function inserts the given validated case into the database.
  public insertValidated(case_: Case): Observable<Result<{}>> {
    const url = this.url + "/cases/validated/upload";
    return this.httpClient.post<Result<{}>>(url, case_).pipe(
      map(result => fromJSON<{}>(JSON.stringify(result))),
      catchError(error => of(new Err<{}>(error)))
    );
  }

}
