import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { PokecardComponent } from '../pokecard/pokecard.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PokemodalComponent } from '../pokemodal/pokemodal.component';
import { PokefavService } from 'src/app/service/favoriteservice/pokefav.service';

@Component({
  selector: 'app-pokefavlist',
  templateUrl: './pokefavlist.component.html',
  styleUrls: ['./pokefavlist.component.scss'],
  standalone: true,
  imports: [PokecardComponent, MatPaginatorModule, PokemodalComponent],
})
export class PokefavlistComponent implements OnChanges {
  @Input() favoritedPokemon: any[] = [];

  displayedPokemon: any[];
  pageSize = 8;
  currentPage = 0;
  isModalOpen = false;

  constructor(private favoriteService: PokefavService) {}

  openModal() {
    this.isModalOpen = true;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['favoritedPokemon'] &&
      changes['favoritedPokemon'].currentValue
    ) {
      this.updateDisplayedPokemon();
    }
  }

  delete(pokemon: any) {
    this.favoriteService.removeFavorite(pokemon);
  }

  updateDisplayedPokemon() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedPokemon = this.favoritedPokemon.slice(startIndex, endIndex);
  }

  onPageChange(event: any) {
    this.currentPage = event.pageIndex;
    this.updateDisplayedPokemon();
  }
}
