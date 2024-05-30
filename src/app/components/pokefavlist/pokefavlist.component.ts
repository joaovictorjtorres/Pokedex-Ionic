import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PokecardComponent } from '../pokecard/pokecard.component';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-pokefavlist',
  templateUrl: './pokefavlist.component.html',
  styleUrls: ['./pokefavlist.component.scss'],
  standalone: true,
  imports: [CommonModule, PokecardComponent, MatPaginatorModule]
})
export class PokefavlistComponent implements OnChanges {

  @Input() favoritedPokemon: any[] = [];

  displayedPokemon: any[];
  pageSize = 9;
  currentPage = 0; 

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['favoritedPokemon'] && changes['favoritedPokemon'].currentValue) {
      this.updateDisplayedPokemon();
    }
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
