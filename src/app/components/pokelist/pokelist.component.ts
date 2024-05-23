import { Component, OnInit } from '@angular/core';
import { PokecardComponent } from '../pokecard/pokecard.component';
import { CommonModule } from '@angular/common';
import { PokemonService } from 'src/app/service/pokeservice/pokemon.service';
import { IonModal } from '@ionic/angular/standalone';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
  IonInput,
  IonButtons,
  IonCardHeader,
  IonIcon,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-pokelist',
  templateUrl: './pokelist.component.html',
  styleUrls: ['./pokelist.component.scss'],
  standalone: true,
  imports: [
    PokecardComponent,
    CommonModule, 
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonInput,
    IonButtons,
    IonCardContent,
    IonCardSubtitle,
    IonCardTitle,
    IonCardHeader,
    IonModal,
    IonIcon,
    IonCard
  ]
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

  getTypes(item:any) {
    if (item.types.length === 1) {
      return [item.types[0].type.name];
    } else {
      return [item.types[0].type.name, item.types[1].type.name];
    }
  }

  isModalOpen = false;
  
  selectedImage:string;
  selectedName:string;
  selectedOrder:number;
  selectedTypes:string[];
  selectedHeight:number;
  selectedWeight:number;
  selectedHp:number;
  selectedAtk:number;
  selectedDef:number;
  selectedSpAtk:number;
  selectedSpDef:number;
  selectedSpd:number;

  openModal(
    imageUrl: string,
    name: string,
    order:number,
    types:string[],
    height: number,
    weight: number,
    hp: number,
    atk: number,
    def: number,
    spAtk: number,
    spDef: number,
    spd: number) {
      
    this.isModalOpen = true;

    this.selectedImage = imageUrl;
    this.selectedOrder = order;
    const newLocal = this;
    this.selectedTypes = types;
    newLocal.selectedHeight = height;
    this.selectedWeight = weight;
    this.selectedName = name;
    this.selectedHp = hp;
    this.selectedAtk = atk;
    this.selectedDef = def;
    this.selectedSpAtk = spAtk;
    this.selectedSpDef = spDef;
    this.selectedSpd = spd;
  }

  closeModal() {

    this.isModalOpen = false;

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
