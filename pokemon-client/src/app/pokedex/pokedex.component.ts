import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../models/Pokemon/pokemon';
import {NgxPaginationModule} from 'ngx-pagination';
import {FormControl} from '@angular/forms';
import{PokemonApiService} from '../services/pokemon-api.service'
import { Result } from '../models/result';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css']
})
export class PokedexComponent implements OnInit {

  myControl = new FormControl();
  filteredOptions: Observable<string[]>| undefined;
  pokemonList:Result[]=[];
  selectedPokediv: number | undefined;
  hoveredPokediv:number|undefined;
  selectedPokemon:Pokemon| undefined;
  content:string[]=[];
  searchValue:string='';
  p=0;

  constructor(
    private pokemonApiService: PokemonApiService
  ) { }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

    this.pokemonApiService.getAllPokemons().subscribe(dataResult => {
      dataResult.results.forEach(result=>{
        this.pokemonList.push(new Result(result.name, result.url));
        this.content.push(result.name);
      })
      });
    };

   private _filter(value: string): string[] {
      const filterValue = value.toLowerCase();
  
      return this.content.filter(option => option.toLowerCase().includes(filterValue));
    }
  selectDiv(i:number, pokemonUrl:string): void{
    this.selectedPokediv=i;

   this.pokemonApiService.getAPokemon(pokemonUrl).subscribe(dataResult2 =>{
      let newPoke:Pokemon = new Pokemon(
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
      newPoke.types[0]=dataResult2.types[0].type.name;

      if(dataResult2.types.length>1){
        newPoke.types[1]=dataResult2.types[1].type.name;
      }


    this.selectedPokemon=newPoke;
    })
  }
deSelect(){
  this.selectedPokediv=undefined;
  this.selectedPokediv=undefined;
}

hoverEnter(i:number){
  this.hoveredPokediv=i;
}

hoverLeave(){
  this.hoveredPokediv=undefined;
}

selectPokemon(name:string){
  this.pokemonApiService.getPokemonByName(name).subscribe(dataResult =>{
    let newPoke:Pokemon = new Pokemon(
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
    newPoke.types[0]=dataResult.types[0].type.name;

    if(dataResult.types.length>1){
      newPoke.types[1]=dataResult.types[1].type.name;
    }


  this.selectedPokemon=newPoke;
  });
}

};
