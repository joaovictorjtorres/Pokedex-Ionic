import { Component, OnInit } from '@angular/core';
import { PokecardComponent } from '../pokecard/pokecard.component';
import { CommonModule } from '@angular/common';
import { PokemonService } from 'src/app/service/pokeservice/pokemon.service';
import { PokemodalComponent } from '../pokemodal/pokemodal.component';
import { IonSearchbar, IonInfiniteScroll, IonInfiniteScrollContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-pokelist',
  templateUrl: './pokelist.component.html',
  styleUrls: ['./pokelist.component.scss'],
  standalone: true,
  imports: [ PokecardComponent, CommonModule, PokemodalComponent, IonSearchbar, IonInfiniteScroll, IonInfiniteScrollContent ]
})
export class PokelistComponent implements OnInit {


  constructor(private pokemonService: PokemonService) {}

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
    this.pokemonService.getPokemonData(this.start, this.end)
      .subscribe({
        next: (res) => {
          this.pokemonList = [...this.pokemonList, ...res];
          this.filteredPokemon = [...this.filteredPokemon, ...res];
          this.checkIfAllLoaded(res.length);
        },
        error: (err) => {
          console.error(err);
        }
      });
  }

  getTypes(item: any) {
    if (item.types.length === 1) {
      return [item.types[0].type.name];
    } else {
      return [item.types[0].type.name, item.types[1].type.name];
    }
  }

  getAllPokemonNames() {
    this.pokemonService.getAllPokemonNames().subscribe({
      next: (res) => {
        this.allPokemonNames = res;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  checkIfAllLoaded(length: number) {
    if (length < (this.end - this.start + 1)) {
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
      const filteredIds = filteredNames.map((pokemon: any) => this.getIdFromUrl(pokemon.url));
  
      filteredIds.forEach(id => {
        if (!this.pokemonList.find(p => p.id === id)) {
          this.pokemonService.getEndpoint(id).subscribe({
            next: (res) => {
              this.filteredPokemon.push(res);
            },
            error: (err) => {
              console.error(err);
            }
          });
        } else {
          const existingPokemon = this.pokemonList.find(p => p.id === id);
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
