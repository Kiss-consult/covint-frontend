import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Case } from 'src/app/models/case/case';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private url: string = environment.backendUrl;
  constructor(private httpClient: HttpClient) { }

  public hello(): Observable<string> {
    return this.httpClient.get(this.url + "/", {responseType: "text"});
  }

  public insertValidated(case_: Case): Observable<string> {
    const url = this.url + "/validated/upload";
    return this.httpClient.post(url, case_, {responseType: "text"});
  }
}
