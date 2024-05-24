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

  getPokemonData(): Observable<any[]> {
    let endpoints: Observable<any>[] = [];
    for (let i = 1; i <= 151; i++) {
      endpoints.push(this.getEndpoint(i));
    }
    return forkJoin(endpoints);
  }
   
}
