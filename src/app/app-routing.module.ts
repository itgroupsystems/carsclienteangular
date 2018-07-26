import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarsComponent } from './cars/cars.component';
import { ViewCarsComponent } from './cars/view-cars/view-cars.component';

const routes: Routes = [

  { path: 'cars', component: CarsComponent },
  {
    path: '', redirectTo: '/cars',
    pathMatch: 'full'
  },
  { path: 'cars/:id/:api', component: ViewCarsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
