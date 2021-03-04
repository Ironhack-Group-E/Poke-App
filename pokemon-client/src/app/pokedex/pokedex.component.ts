import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../models/Pokemon/pokemon';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormControl } from '@angular/forms';
import { PokemonApiService } from '../services/pokemon-api.service'
import { Result } from '../models/result';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css']
})
export class PokedexComponent implements OnInit {

  //Form control necessary to the autocompletation
  myControl = new FormControl();
  //A string array with the Pokemon name filtered according the text input
  filteredOptions: Observable<string[]> | undefined;
  //The Pokemon List with the name and the url
  pokemonList: Result[] = [];
  //The id of the Pokémon selected
  selectedPokediv: number | undefined;
  //The id of the Pokémon hovered
  hoveredPokediv: number | undefined;
  //The Pokémon selected
  selectedPokemon: Pokemon | undefined;
  //A string array with the Pokemon names
  content: string[] = [];
  //The string of the search bar
  searchValue: string = '';
  p = 0;

  constructor(
    private pokemonApiService: PokemonApiService
  ) { }

  ngOnInit(): void {
    //We rebuild the Pokemon list filteres according the value of the search changes
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

    //Get all the Pokemon names when the page charges
    this.pokemonApiService.getAllPokemons().subscribe(dataResult => {
      dataResult.results.forEach(result => {
        this.pokemonList.push(new Result(result.name, result.url));
        this.content.push(result.name);
      })
    });
  };

  //An utility function for the autocompletation
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.content.filter(option => option.toLowerCase().includes(filterValue));
  }

  //This function takes the id of the selected Pokemon to show its details on the Details View
  selectDiv(i: number, pokemonUrl: string): void {
    this.selectedPokediv = i;

    this.pokemonApiService.getAPokemon(pokemonUrl).subscribe(dataResult2 => {
      let newPoke: Pokemon = new Pokemon(
        dataResult2.id,
        dataResult2.name,
        dataResult2.sprites.front_default,
        dataResult2.stats[0].base_stat,
        dataResult2.stats[1].base_stat,
        dataResult2.stats[2].base_stat,
        dataResult2.stats[3].base_stat,
        dataResult2.stats[4].base_stat,
        dataResult2.stats[5].base_stat,
        []
      )
      newPoke.types[0] = dataResult2.types[0].type.name;

      if (dataResult2.types.length > 1) {
        newPoke.types[1] = dataResult2.types[1].type.name;
      }


      this.selectedPokemon = newPoke;
    })
  }

  //Cleans the selected Pokemon
  deSelect() {
    this.selectedPokediv = undefined;
    this.selectedPokediv = undefined;
  }

  //Function for the hovered Pokemon style
  hoverEnter(i: number) {
    this.hoveredPokediv = i;
  }

  //Function for the hovered Pokemon style when leaves
  hoverLeave() {
    this.hoveredPokediv = undefined;
  }

  //This function takes the name of the search bar to show the Pokemon details on the Details View
  selectPokemon(name: string) {
    this.pokemonApiService.getPokemonByName(name).subscribe(dataResult => {
      let newPoke: Pokemon = new Pokemon(
        dataResult.id,
        dataResult.name,
        dataResult.sprites.front_default,
        dataResult.stats[0].base_stat,
        dataResult.stats[1].base_stat,
        dataResult.stats[2].base_stat,
        dataResult.stats[3].base_stat,
        dataResult.stats[4].base_stat,
        dataResult.stats[5].base_stat,
        []
      )
      newPoke.types[0] = dataResult.types[0].type.name;

      if (dataResult.types.length > 1) {
        newPoke.types[1] = dataResult.types[1].type.name;
      }


      this.selectedPokemon = newPoke;
    });
  }

};
