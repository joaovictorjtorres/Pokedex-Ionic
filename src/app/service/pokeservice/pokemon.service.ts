import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private baseUrl: string = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}

  getEndpoint(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}/`);
  }


  getPokemonData(start:number = 1, end:number = 40): Observable<any[]> {
    let endpoints: Observable<any>[] = [];
    for (let i = start; i <= end; i++) {
      endpoints.push(this.getEndpoint(i));
    }
    return forkJoin(endpoints);
  }
   
}
