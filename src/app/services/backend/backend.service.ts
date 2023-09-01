import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, catchError, map, of } from 'rxjs';
import { Case } from 'src/app/models/case/case';
import { Err, Result, fromJSON } from 'src/app/models/utils/result';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private url: string = environment.backendUrl;
  constructor(private httpClient: HttpClient) { }

  public hello(): Observable<string> {
    return this.httpClient.get(this.url + "/", {responseType: "text"});
  }

  public insertValidated(case_: Case): Observable<Result<{}>> {
    const url = this.url + "/validated/upload";
    return this.httpClient.post<Result<{}>>(url, case_).pipe(
      map(result => fromJSON<{}>(JSON.stringify(result))),
      catchError(error => of(new Err<{}>(error)))
    );
  }
}
