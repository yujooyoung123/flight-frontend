import { Component } from '@angular/core';
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

export class RequestCardComponent {

    station: any;
    requestType: any;
    data: any;
    dataSource: any;
    showTable: boolean = false;

    constructor (private service: ApiService) {}

    getFlights() {
      this.station = this.station.toUpperCase();

      this.service.flightData(this.station, this.requestType)
      .subscribe((response) => {
        this.data = response;
        let jsonData = JSON.parse(this.data);

        let dataSource: routeData[] = jsonData;

        this.dataSource = dataSource;

        console.log(this.dataSource);

        return this.enableTable();
      })
    };

    getData() {
      this.service.autosuggestData()
      .subscribe((response) => {
        this.data = response;
        console.log(this.data)
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
