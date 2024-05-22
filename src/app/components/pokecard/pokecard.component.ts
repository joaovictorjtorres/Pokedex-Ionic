import { Component, Input, input} from '@angular/core';

@Component({
  selector: 'app-pokecard',
  templateUrl: './pokecard.component.html',
  styleUrls: ['./pokecard.component.scss'],
  standalone: true
})
export class PokecardComponent {

  @Input()
  pokeName?:string;
  @Input()
  pokeId?:number;
  @Input()
  pokeImage?:string;
}
