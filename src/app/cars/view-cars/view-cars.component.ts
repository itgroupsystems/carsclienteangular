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
  checked: boolean = false;
  errReqData: boolean = false;

  constructor(private route: ActivatedRoute,
    private carsService: CarsService) {
    this.id = this.route.snapshot.params['id'];
    this.apiReq = this.route.snapshot.params['api'];
  }

  ngOnInit() {
    this.calltoApi(this.apiReq);
  }

  findRest(id: number) {
    this.loadData = true;
    this.errReqData = false;
    this.carsService.findRest(id).subscribe(
      data => {
        console.log(data)
        this.loadData = false;
        this.car = data;
      },
      error => {
        this.errReqData = true;
        this.loadData = false;
      }

    )
  }

  findGraph(id: number) {
    this.loadData = true;
    this.errReqData = false;
    this.carsService.findGraph(id).subscribe(
      data => {
        this.loadData = false;
        this.car = data;
        console.log(data);
      },
      error => {
        this.errReqData = true;
        this.loadData = false;
      }
    );
  }
  calltoApi(api: string) {
    if (api == 'REST') {
      this.findRest(this.id);
      this.checked = true;
    } else {
      this.findGraph(this.id);
      this.checked = false;
    }
  }

  chooseApi(e: any) {
    if (e.checked == true) {
      this.apiReq = "REST";
      this.findRest(this.id);
    } else {
      this.apiReq = "Graphql";
      this.findGraph(this.id);
    }
  }

}
