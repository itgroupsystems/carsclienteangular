import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import gql from 'graphql-tag';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { environment } from '../../environments/environment';

import { Car, Query } from './car.model';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  constructor(private apollo: Apollo, httpLink: HttpLink, private http: HttpClient) {
    const httpA = httpLink.create({ uri: environment.urlApiGraphQl });
    const auth = setContext((_, { headers }) => {
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
            entityId
            ... on Car {
              id
              registration_number
              image {
                targetId
                alt
                title
                width
                height
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
          registration_number
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
    return this.http.get<Car[]>(environment.urlApiRest + 'car');
  }

  public findRest(id: number): Observable<Car> {
    return this.http.get<Car>(environment.urlApiRest + 'car/' + id);
  }

}

