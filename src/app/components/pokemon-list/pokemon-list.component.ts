import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonDetailComponent } from '../pokemon-detail/pokemon-detail.component';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})

export class PokemonListComponent implements OnInit {
  pokemons: any[] = [];
  selectedPokemon!: any;
  displayedColumns: string[] = ['name', 'types', 'actions'];

  constructor(private pokemonService: PokemonService, private dialog: MatDialog,  private router: Router) {}

  // Obtencion de data
  ngOnInit(): void {
    this.pokemonService.getPokemons().subscribe((response: any) => {
      this.pokemons = response.results.map((pokemon: any) => {
        this.pokemonService.getPokemonDetails(pokemon.name).subscribe((details: any) => {
          pokemon.types = details.types;
        });
        return pokemon;
      });
    });
  }

  // Modal
  openModal(pokemon: any): void {
    const currentUrl = window.location.href;

    this.pokemonService.getPokemonDetails(pokemon.name).subscribe((details) => {
      this.selectedPokemon = details;

      window.history.pushState({}, '', `/pokemon/${pokemon.name}`);

      const dialogRef = this.dialog.open(PokemonDetailComponent, {
        data: this.selectedPokemon,
        width: '500px',
        height: '600px',
        panelClass: 'custom-modal'
      });

      dialogRef.afterClosed().subscribe(() => {
        window.history.pushState({}, '', currentUrl);
      });
    });
  }




}
