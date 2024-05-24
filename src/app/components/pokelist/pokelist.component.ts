import { Component, OnInit } from '@angular/core';
import { PokecardComponent } from '../pokecard/pokecard.component';
import { CommonModule } from '@angular/common';
import { PokemonService } from 'src/app/service/pokeservice/pokemon.service';
import { PokemodalComponent } from '../pokemodal/pokemodal.component';

@Component({
  selector: 'app-pokelist',
  templateUrl: './pokelist.component.html',
  styleUrls: ['./pokelist.component.scss'],
  standalone: true,
  imports: [ PokecardComponent, CommonModule, PokemodalComponent ]
})
export class PokelistComponent implements OnInit {

  pokemonList: any = [];

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.getPokemonList();
  }

  getPokemonList() {
    this.pokemonService.getPokemonData()
      .subscribe({
        next: (res) => {
          this.pokemonList = res
        },
        error: (err) => {
          console.error(err)
        }});
  }

  getTypes(item:any) {
    if (item.types.length === 1) {
      return [item.types[0].type.name];
    } else {
      return [item.types[0].type.name, item.types[1].type.name];
    }
  }

  isModalOpen = false;

  selectedPoke: object = {};

  openModal(selectedPokeInfo:any) {
      
    this.isModalOpen = true;

    this.selectedPoke = {
          image: selectedPokeInfo.sprites.other['official-artwork'].front_default,
          name: selectedPokeInfo.name.charAt(0).toUpperCase() + selectedPokeInfo.name.slice(1).toLowerCase(),
          order: selectedPokeInfo.id.toString().padStart(4, '0'),
          types: this.getTypes(selectedPokeInfo),
          height: selectedPokeInfo.height / 10,
          weight: selectedPokeInfo.weight / 10,
          hp: selectedPokeInfo.stats[0].base_stat,
          atk: selectedPokeInfo.stats[1].base_stat,
          def: selectedPokeInfo.stats[2].base_stat,
          spatk: selectedPokeInfo.stats[3].base_stat,
          spdef: selectedPokeInfo.stats[4].base_stat,
          spd: selectedPokeInfo.stats[5].base_stat
        }
  }

}
