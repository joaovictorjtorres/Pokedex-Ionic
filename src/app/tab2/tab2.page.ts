import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { PokefavlistComponent } from '../components/pokefavlist/pokefavlist.component';
import { PokefavService } from '../service/favoriteservice/pokefav.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    ExploreContainerComponent,
    PokefavlistComponent,
  ],
})
export class Tab2Page implements OnInit {
  favoritedPokemon: any = [];

  constructor(
    private pokefavService: PokefavService
  ) {}
  ngOnInit(): void {
    this.pokefavService
      .getFavorites()
      .subscribe((res) => (this.favoritedPokemon = res));
  }
}
