import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
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
    options: any;
    autoSuggestOptions: any;

    formControl = new FormControl();
    filteredOptions: Observable<string[]>;

    constructor (private service: ApiService) {}

    ngOnInit() {
          this.getData();
          this.filteredOptions = this.formControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value))
          );
      }
    

    getFlights() {
      if (this.station.length == 3) {
      this.station = this.station.toUpperCase();
      };

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
        this.autoSuggestOptions = JSON.parse(response.replace(/\bNaN\b/g, "null"));

      });

    };

    enableTable() {
      this.showTable = true;
    }

    private _filter(value: string): string[] {
      let filterValue = value.toLowerCase();
      if(!this.autoSuggestOptions) return this.autoSuggestOptions;
      return this.autoSuggestOptions.filter((option:any) =>
        option.toLowerCase().includes(filterValue));
    }

 displayedColumns: string[] = ['origin', 'destination'];


    // TODO: move to unit testing and add native input
    // // getParameters() {
    // //   let station = this.station
    // //   let requestType = this.requestType

    // //   console.log(station)
    // //   console.log(requestType)
    // }
}
