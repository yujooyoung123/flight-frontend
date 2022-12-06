import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { ApiService } from 'src/app/services/api-service.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

export interface routeData {
  origin: string;
  destination: string;
}

@Component({
  selector: 'app-request-card',
  templateUrl: './request-card.component.html',
  styleUrls: ['./request-card.component.scss']
})

export class RequestCardComponent implements OnInit{

    station: any;
    requestType: any;
    flightData: any;
    dataSource: any;
    showTable: boolean = false;
    autoSuggestData: any;
    autoSuggestOptions: any;

    constructor (private service: ApiService) {}

    ngOnInit() {
          this.getData();
      }
    

    getFlights() {
      this.station = this.station.toUpperCase();

      this.service.flightData(this.station, this.requestType)
      .subscribe((response) => {
        this.flightData = response;
        let jsonData = JSON.parse(this.flightData);

        let dataSource: routeData[] = jsonData;

        this.dataSource = dataSource;

        console.log(this.dataSource);

        return this.enableTable();
      })
    };

    getData() {
      this.service.autosuggestData()
      .subscribe((response) => {
        this.autoSuggestOptions = JSON.parse(response.replace(/\bNaN\b/g, "null"))

      });

    };

    enableTable() {
      this.showTable = true;
    }

    displayInput(input: any) {
      return input ? input.origin : undefined;
    }

 displayedColumns: string[] = ['origin', 'destination']


    // TODO: move to unit testing and add native input
    // // getParameters() {
    // //   let station = this.station
    // //   let requestType = this.requestType

    // //   console.log(station)
    // //   console.log(requestType)
    // }
}
