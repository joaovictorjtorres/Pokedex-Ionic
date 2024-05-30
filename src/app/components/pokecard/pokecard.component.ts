import { Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemodalComponent } from '../pokemodal/pokemodal.component';
import { PokefavlistComponent } from '../pokefavlist/pokefavlist.component';

@Component({
  selector: 'app-pokecard',
  templateUrl: './pokecard.component.html',
  styleUrls: ['./pokecard.component.scss'],
  standalone: true,
  imports: [PokemodalComponent, CommonModule, PokefavlistComponent]
})
export class PokecardComponent {

  @Input()
  pokemonInfo: any;

  favoriteColor: string = 'red';
  isModalOpen = false;
  selectedPoke: any = {
    
  };

  favorite() {
    this.favoriteColor = this.favoriteColor === 'red' ? 'yellow' : 'red';
  }

  openModal() {
    this.isModalOpen = true;
  }
  
}
