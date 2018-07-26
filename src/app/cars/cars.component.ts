import { Component, OnInit } from '@angular/core';
import { CarsService } from './cars.service';
import { Car } from './car.model';
@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {
  color: string = 'primary';
  mode: string = 'indeterminate';
  diameter: number = 50;
  cars: Car[];
  loadData: boolean = true;
  apiReq: string = "";
  checked: boolean = false;

  constructor(private carsService: CarsService) { }

  ngOnInit() {
    this.getAllCarsGraph();
    this.apiReq = "Graphql";
    // this.getAllCarsGraph();
  }

  getAllCarsRest() {
    this.loadData = true;
    console.log("con rest");
    this.carsService.getAllRest().subscribe(result => {
      console.log(result);
      setTimeout(() => {
        this.loadData = false;
        this.cars = result;
      }, 1000);
    });
  }

  getAllCarsGraph() {
    this.loadData = true;
    console.log("con graphql");
    this.carsService.getAllGraph().subscribe(result => {
      console.log(result);
      setTimeout(() => {
        this.loadData = false;
        this.cars = result;
      }, 1000);
    });
  }

  chooseApi(e: any) {
    if (e.checked == true) {
      console.log("Rest "+ e.checked);
      this.apiReq = "REST";
      this.getAllCarsRest()
    } else {
      console.log("Graphql"+ e.checked);
      this.apiReq = "Graphql";
      this.getAllCarsGraph();
    }
  }
}
