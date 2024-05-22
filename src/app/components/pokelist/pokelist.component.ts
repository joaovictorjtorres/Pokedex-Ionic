import { Component, OnInit, inject } from '@angular/core';
import { PokecardComponent } from '../pokecard/pokecard.component';
import { CommonModule } from '@angular/common';
import { PokemonService } from 'src/app/service/pokemon.service';

@Component({
  selector: 'app-pokelist',
  templateUrl: './pokelist.component.html',
  styleUrls: ['./pokelist.component.scss'],
  standalone: true,
  imports: [PokecardComponent, CommonModule]
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
          console.log(res)
        },
        error: (err) => {
          console.error(err)
        }});
  }

}
