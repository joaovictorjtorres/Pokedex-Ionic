import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private baseUrl: string = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}

  getEndpoint(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}/`);
  }

  getPokemonData(start: number, end: number): Observable<any[]> {
    let endpoints: Observable<any>[] = [];
    for (let i = start; i <= end; i++) {
      endpoints.push(this.getEndpoint(i));
    }
    return forkJoin(endpoints);
  }

  getAllPokemonNames(): Observable<any> {
    return this.http
      .get(`${this.baseUrl}?limit=1015`)
      .pipe(map((res: any) => res.results));
  }
}
