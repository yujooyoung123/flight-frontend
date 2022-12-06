import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
// import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {  

  public autosuggestURL = 'http://localhost:8000/autosuggest';
  public routeRequestURL = 'http://localhost:8000/request'

  constructor(private httpClient: HttpClient) { }

  autosuggestData() {
    
    return this.httpClient.get(this.autosuggestURL)
    .pipe(
      map((response:[]) => response.map(
        item => item['origin']
      ))
    )
  }

  flightData(station: string, requestType: string) {
    let params = new HttpParams;
    params = params.append('request', station);
    params = params.append('request_type', requestType);

    return this.httpClient.get(this.routeRequestURL, {params: params})
  }
}

