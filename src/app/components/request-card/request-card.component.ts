import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/services/api-service.service';

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
    autoSuggestOptions: [];

    constructor (private service: ApiService, private formBuilder: FormBuilder) {}

        ngOnInit() {
          this.getData()
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
        this.autoSuggestData = response
      });
    };

    enableTable() {
      this.showTable = true;
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
