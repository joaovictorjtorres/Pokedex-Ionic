import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokefavService {
  private _favoriteList = new BehaviorSubject<any>([])

  favoriteList$ = this._favoriteList.asObservable()

  addFavorite(pokemon: any) {
    const currentFavorites = this._favoriteList.getValue();
  
    const exists = currentFavorites.some((fav: any) => fav.name === pokemon.name);
    
    if (!exists) {
      const updatedFavorites = [...currentFavorites, pokemon];
      this._favoriteList.next(updatedFavorites);
    }
  }

  getFavorites(){
    return this.favoriteList$;
  }

  removeFavorite(pokemon: { name: string }) {
    let currentFavorites = this._favoriteList.getValue();
    currentFavorites = currentFavorites.filter((poke: { name: string }) => poke.name !== pokemon.name);
  
    this._favoriteList.next(currentFavorites);
  }

  isFavorite(pokemon: any): boolean {
    let currentFavorites = this._favoriteList.getValue();
    return currentFavorites.some((fav: any) => fav.name === pokemon.name);
  }
}
