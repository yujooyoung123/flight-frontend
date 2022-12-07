import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {  

  public autosuggestURL = 'http://localhost:8000/autosuggest';
  public routeRequestURL = 'http://localhost:8000/request'

  constructor(private httpClient: HttpClient) { }

  options = []

  autosuggestData() {
    
    return this.options.length
    ? of(this.options)
    : this.httpClient
    .get<any>(this.autosuggestURL)
    .pipe(tap(data => (this.options = data)));
  }

  flightData(station: string, requestType: string) {
    let params = new HttpParams;
    params = params.append('request', station);
    params = params.append('request_type', requestType);

    return this.httpClient.get(this.routeRequestURL, {params: params})
  }
}

