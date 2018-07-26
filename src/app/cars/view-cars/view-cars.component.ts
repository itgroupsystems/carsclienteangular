import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarsService } from '../cars.service';
import { Car } from '../car.model';

@Component({
  selector: 'app-view-cars',
  templateUrl: './view-cars.component.html',
  styleUrls: ['./view-cars.component.css']
})
export class ViewCarsComponent implements OnInit {
  id: number;
  car: Car;
  color: string = 'primary';
  mode: string = 'indeterminate';
  diameter: number = 50;
  loadData: boolean = true;
  apiReq: string = "";
  checked: boolean = true;

  constructor(private route: ActivatedRoute,
    private carsService: CarsService) {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    console.log(this.id);
    this.findGraph(this.id);
    this.apiReq = "Graphql";
  }

  findRest(id: number) {
    console.log("con rest");
    this.loadData = true;
    this.carsService.findRest(id).subscribe(
      data => {
        console.log(data)
        setTimeout(() => {
          this.loadData = false;
          this.car = data[0];
        }, 1000);
      }

    )
  }

  findGraph(id: number) {
    console.log("con Graph");
    this.loadData = true;
    this.carsService.findGraph(id).subscribe(
      data => {
        setTimeout(() => {
          this.loadData = false;
          this.car = data;
          console.log(data)
        }, 1000);
      }
    );
  }

  chooseApi(e: any) {
    if (e.checked == true) {
      // console.log("Rest "+ e.checked);
      this.apiReq = "REST";
      this.findRest(this.id);
    } else {
      // console.log("Graphql"+ e.checked);
      this.apiReq = "Graphql";
      this.findGraph(this.id);
    }
  }

}
