import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { PlaceType } from '../interface/place-type';
import { catchError, map, Observable, of, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiHelperService {

  url: string = 'https://localhost:7292/api/Places';

  constructor(private http: HttpClient) { }

  getAllPlaces(): Observable<PlaceType[]> {
    return this.http.get<PlaceType[]>(this.url);
  }

  addNewPlace(data: PlaceType): Observable<PlaceType> {
    return this.http.post<PlaceType>(this.url, data);
  }

  getPlaceDetails(id: number): Observable<PlaceType> {
    const tempUrl = this.url + '/' + id;
    return this.http.get<PlaceType>(tempUrl);
  }

  updatePlace(id: number, data: PlaceType): any {
    const tempUrl = this.url + '/' + id;
    return this.http.put(tempUrl, data);
  }

  deletePlace(id: number): any {
    const tempUrl = this.url + '/' + id;
    return this.http.delete(tempUrl).pipe(
      map((res: any) => {
        console.log('console from pipe: ' + res);
      }),
      retry(3), // Retry up to 3 times before failing
      catchError(() => of([]))
    );
  }

}
