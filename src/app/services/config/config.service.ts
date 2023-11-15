import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Config } from 'src/app/models/config/config';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  public config: Config = new Config();

  constructor(private readonly http: HttpClient) { }

  public load(): Observable<void> {
    return this.http
      .get<Config>('assets/config.json')
      .pipe(
        map(config => {
          this.config = config;
        })
      );
  }
}
