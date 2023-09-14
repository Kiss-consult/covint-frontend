import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, catchError, map, of } from 'rxjs';
import { Case } from 'src/app/models/case/case';
import { Err, Result, fromJSON } from 'src/app/models/utils/result';
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
    return this.httpClient.get(this.url + "/", {responseType: "text"});
  }

  // This function filters the exports with the given filter.
  public filterExports(filter: Filter): Observable<Result<Export[]>> {
    const url = this.url + "/exports/filter";
    return this.httpClient.post<Result<Export[]>>(url, filter).pipe(
      map(result => fromJSON<Export[]>(JSON.stringify(result))),
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
    const url = this.url + "/validated/upload";
    return this.httpClient.post<Result<{}>>(url, case_).pipe(
      map(result => fromJSON<{}>(JSON.stringify(result))),
      catchError(error => of(new Err<{}>(error)))
    );
  }
  
}
