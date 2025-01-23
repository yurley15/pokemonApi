import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  lastType(type: any): boolean {
    return this.data.types.indexOf(type) === this.data.types.length - 1;
  }

  lastAbility(ability: any): boolean {
    return this.data.abilities.indexOf(ability) === this.data.abilities.length - 1;
  }

}
