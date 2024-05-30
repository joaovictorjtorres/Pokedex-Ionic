import { Component, OnInit } from '@angular/core';
import { PokecardComponent } from '../pokecard/pokecard.component';

import { PokemonService } from 'src/app/service/pokeservice/pokemon.service';
import { PokemodalComponent } from '../pokemodal/pokemodal.component';
import {
  IonSearchbar,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from '@ionic/angular/standalone';
import { PokefavService } from 'src/app/service/favoriteservice/pokefav.service';

@Component({
  selector: 'app-pokelist',
  templateUrl: './pokelist.component.html',
  styleUrls: ['./pokelist.component.scss'],
  standalone: true,
  imports: [
    PokecardComponent,
    PokemodalComponent,
    IonSearchbar,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
  ],
})
export class PokelistComponent implements OnInit {
  constructor(
    private pokemonService: PokemonService,
    private favoriteService: PokefavService
  ) {}

  ngOnInit() {
    this.getPokemonList();
    this.getAllPokemonNames();
  }

  pokemonList: any[] = [];
  filteredPokemon: any[] = [];
  allPokemonNames: any[] = [];
  start: number = 1;
  end: number = 40;
  allPokemonLoaded: boolean = false;
  filterTimer: any;
  scrollEnabled: boolean = true;

  getPokemonList() {
    this.pokemonService.getPokemonData(this.start, this.end).subscribe({
      next: (res) => {
        this.pokemonList = [...this.pokemonList, ...res];
        this.filteredPokemon = [...this.filteredPokemon, ...res];
        this.checkIfAllLoaded(res.length);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  favorite(item: any) {
    this.favoriteService.addFavorite(item);
  }

  getTypes(item: any) {
    if (item.types.length === 1) {
      return [item.types[0].type.name];
    } else {
      return [item.types[0].type.name, item.types[1].type.name];
    }
  }

  getPokemonInfo(item: any) {
    return {
      image: item.sprites.other['official-artwork'].front_default,
      name:
        item.name.charAt(0).toUpperCase() + item.name.slice(1).toLowerCase(),
      order: item.id.toString().padStart(4, '0'),
      types: this.getTypes(item),
      height: item.height / 10,
      weight: item.weight / 10,
      hp: item.stats[0].base_stat,
      atk: item.stats[1].base_stat,
      def: item.stats[2].base_stat,
      spatk: item.stats[3].base_stat,
      spdef: item.stats[4].base_stat,
      spd: item.stats[5].base_stat,
    };
  }

  getAllPokemonNames() {
    this.pokemonService.getAllPokemonNames().subscribe({
      next: (res) => {
        this.allPokemonNames = res;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  checkIfAllLoaded(length: number) {
    if (length < this.end - this.start + 1) {
      this.allPokemonLoaded = true;
    }
  }

  filterItems(event: any) {
    clearTimeout(this.filterTimer);
    this.scrollEnabled = false;
    const searchTerm: string = event.target.value.toLowerCase();

    this.filterTimer = setTimeout(() => {
      if (!searchTerm) {
        this.filteredPokemon = this.pokemonList;
        this.scrollEnabled = true;
        return;
      }

      const filteredNames = this.allPokemonNames.filter((pokemon: any) => {
        return pokemon.name.toLowerCase().includes(searchTerm);
      });

      this.filteredPokemon = [];
      const filteredIds = filteredNames.map((pokemon: any) =>
        this.getIdFromUrl(pokemon.url)
      );

      filteredIds.forEach((id) => {
        if (!this.pokemonList.find((p) => p.id === id)) {
          this.pokemonService.getEndpoint(id).subscribe({
            next: (res) => {
              this.filteredPokemon.push(res);
            },
            error: (err) => {
              console.error(err);
            },
          });
        } else {
          const existingPokemon = this.pokemonList.find((p) => p.id === id);
          this.filteredPokemon.push(existingPokemon);
        }
      });
    }, 500);
  }

  getIdFromUrl(url: string): number {
    const parts = url.split('/');
    return +parts[parts.length - 2];
  }

  loadMore(event: any) {
    this.start = this.end + 1;
    this.end = this.end + 40;

    this.getPokemonList();

    setTimeout(() => {
      event.target.complete();
      if (this.allPokemonLoaded) {
        event.target.disabled = true;
      }
    }, 500);
  }
}
