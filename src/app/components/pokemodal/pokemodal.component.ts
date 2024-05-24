import { Component, EventEmitter, Input, Output } from '@angular/core';
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
export class PokemodalComponent {

  @Input()
  isModalOpen = false;
  @Input()
  selectedPoke:any;
  @Output()
  isModalOpenChange = new EventEmitter<boolean>();

  favoriteColor:string = 'red';

  favorite(){
    this.favoriteColor = this.favoriteColor === 'red' ? 'yellow' : 'red';
  }

  closeModal(){

    this.isModalOpenChange.emit(false);
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
