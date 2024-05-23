import { Component, Input, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemodalComponent } from '../pokemodal/pokemodal.component';

@Component({
  selector: 'app-pokecard',
  templateUrl: './pokecard.component.html',
  styleUrls: ['./pokecard.component.scss'],
  standalone: true,
  imports: [PokemodalComponent, CommonModule]
})
export class PokecardComponent {

  @Input()
  pokeName?:string;
  @Input()
  pokeId:number;
  @Input()
  pokeImage:string;
  @Input()
  pokeTypes:string[];
}
