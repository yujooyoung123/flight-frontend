import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api-service.service';

interface tableData {
  'origin': Array<any>;
  'destination': Array<any>;
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

        let jsonData = JSON.parse(this.data)

        let tableData: tableData = {
          'origin': jsonData['origin'],
          'destination': jsonData['destination']
        }

        this.dataSource = tableData
        console.log(this.dataSource[origin])
        this.showTable = true
      })
    };

    getData() {
      this.service.autosuggestData()
      .subscribe((response) => {
        this.data = response;
        console.log(this.data)
      });
    }

    displayedColumns: string[] = ['origin', 'destination']


    // TODO: move to unit testing
    // // getParameters() {
    // //   let station = this.station
    // //   let requestType = this.requestType

    // //   console.log(station)
    // //   console.log(requestType)
    // }
}
