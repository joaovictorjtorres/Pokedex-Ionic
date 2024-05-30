import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonInput,
  IonButtons,
  IonCardContent,
  IonCardTitle,
  IonCardHeader,
  IonModal,
  IonCard
} from '@ionic/angular/standalone';
import { PokefavService } from 'src/app/service/favoriteservice/pokefav.service';

@Component({
  selector: 'app-pokemodal',
  templateUrl: './pokemodal.component.html',
  styleUrls: ['./pokemodal.component.scss'],
  standalone: true,
  imports: [ 
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonInput,
    IonButtons,
    IonCardContent,
    IonCardTitle,
    IonCardHeader,
    IonModal,
    IonCard
  ]
})
export class PokemodalComponent implements OnInit {

  @Input()
  isModalOpen = false;
  @Input()
  selectedPoke: any;
  @Output()
  isModalOpenChange = new EventEmitter<boolean>();
  @Output()
  favoriteChange = new EventEmitter<any[]>();

  favoriteColor: string = '';
  // favoritePokemonList: any = {};

  constructor(private favoriteService: PokefavService ) {}
  ngOnInit(): void {
    this.favoriteService.isFavorite(this.selectedPoke) ? this.favoriteColor = 'yellow' : this.favoriteColor = 'gray';
    
  }

  favorite() {
    if(this.favoriteColor === 'gray'){
      this.favoriteService.addFavorite(this.selectedPoke);
      this.favoriteColor = 'yellow'
      console.log(this.favoriteColor)
      
    } else {
      this.closeModal()
      this.favoriteColor = 'gray'
      this.favoriteService.removeFavorite(this.selectedPoke);
      console.log(this.favoriteColor)
    }
  }

  get(){
    this.favoriteService.getFavorites()
  }


  closeModal() {
    this.isModalOpenChange.emit(false);

  }

  getProgressWidth(value: number) {
    return (value / 150) * 100 + '%';
  }

  getProgressBarClass(stat: number): string {
    if (stat >= 0 && stat <= 49) {
      return 'one-bar';
    } else if (stat >= 50 && stat <= 79) {
      return 'two-bar';
    } else if (stat >= 80 && stat <= 99) {
      return 'three-bar';
    } else if (stat >= 100 && stat <= 119) {
      return 'four-bar';
    } else if (stat >= 120) {
      return 'five-bar';
    }
    return '';
  }
}
