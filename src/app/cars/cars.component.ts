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
  errReqData: boolean = false;
  apiReq: string = "";
  checked: boolean = true;

  constructor(private carsService: CarsService) { }

  ngOnInit() {
    this.getAllCarsRest();
    this.apiReq = "REST";
  }

  getAllCarsRest() {
    this.loadData = true;
    this.errReqData = false;
    this.carsService.getAllRest().subscribe(
      result => {
        console.log(result);
        this.loadData = false;
        this.cars = result;
      },
      error => {
        this.loadData = false;
        this.errReqData = true;
      }
    );
  }

  getAllCarsGraph() {
    this.loadData = true;
    this.errReqData = false;
    this.carsService.getAllGraph().subscribe(
      result => {
        console.log(result);
        this.loadData = false;
        this.cars = result;
      },
      error => {
        this.loadData = false;
        this.errReqData = true;
      }
    );
  }

  chooseApi(e: any) {
    if (e.checked == true) {
      this.apiReq = "REST";
      this.getAllCarsRest()
    } else {
      this.apiReq = "Graphql";
      this.getAllCarsGraph();
    }
  }
}
