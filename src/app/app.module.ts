import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//apolo
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { CarsComponent } from './cars/cars.component';
import { ViewCarsComponent } from './cars/view-cars/view-cars.component';
import { CarsService } from './cars/cars.service';
import { NguiInViewComponent } from './ngui-in-view/ngui-in-view.component'

@NgModule({
  declarations: [
    AppComponent,
    CarsComponent,
    ViewCarsComponent,
    NguiInViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule
  ],
  providers: [CarsService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
