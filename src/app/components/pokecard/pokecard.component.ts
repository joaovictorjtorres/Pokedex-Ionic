import { Component, Input } from '@angular/core';

import { PokemodalComponent } from '../pokemodal/pokemodal.component';
import { PokefavlistComponent } from '../pokefavlist/pokefavlist.component';

@Component({
  selector: 'app-pokecard',
  templateUrl: './pokecard.component.html',
  styleUrls: ['./pokecard.component.scss'],
  standalone: true,
  imports: [PokemodalComponent, PokefavlistComponent],
})
export class PokecardComponent {
  @Input()
  pokemonInfo: any;

  @Input()
  selectedPoke: any;

  isModalOpen = false;

  openModal() {
    this.isModalOpen = true;
  }
}
