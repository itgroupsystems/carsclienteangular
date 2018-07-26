import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import gql from 'graphql-tag';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { Car, carQuery, Query } from './car.model';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  urlApiRest: string = "http://192.168.1.12/blog/car/demo_resource/";
  // urlApiGraphQl: string = "http://localhost:3000/graphql";
  urlApiGraphQl: string = "http://192.168.1.14/drupal/graphql/";

  constructor(private apollo: Apollo, httpLink: HttpLink, private http: HttpClient) {
    const httpA = httpLink.create({ uri: this.urlApiGraphQl });

    const auth = setContext((_, { headers }) => {
      const token = "SESS29af1facda0a866a687d5055f2fade2c=RkpRG-e-G1_gEDzWYnbgRFzpMZ6vq6ZgCmlFEYcjohU";
      return {
        headers: new HttpHeaders(
          {
          })
      };

    });
    apollo.create({
      link: auth.concat(httpA),
      cache: new InMemoryCache()
    });
  }

  public getAllGraph(): Observable<Car[]> {
    return this.apollo.watchQuery<Query>({
      query: gql`
      {
        carQuery {
           entities {
             ... on Car {
               id
               registrationNumber
               image {
                 alt
                 url
               }
               owner
             }
           }
         }
       }
      `
    })
      .valueChanges
      .pipe(
        map(result => result.data.carQuery.entities)
      );
  }

  public findGraph(id: number): Observable<Car> {
    return this.apollo.watchQuery<Query>({
      query: gql`
      {
        carById(id: "${id}") {
          id
          color
          km
          owner
          image {
            targetId
            alt
            title
            width
            height
            url
          }
        }
      }
      `
    })
      .valueChanges
      .pipe(
        map(result => result.data.carById)
      );
  }

  public getAllRest(): Observable<Car[]> {
    return this.http.get<Car[]>(this.urlApiRest + '');
  }

  public findRest(id: number): Observable<Car> {
    return this.http.get<Car>(this.urlApiRest + '/' + id);
  }

}

