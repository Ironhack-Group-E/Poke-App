import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../models/Pokemon/pokemon';
import {NgxPaginationModule} from 'ngx-pagination';
import{PokemonApiService} from '../services/pokemon-api.service'
import { Result } from '../models/result';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css']
})
export class PokedexComponent implements OnInit {

  pokemonList:Result[]=[];
  pokemonAppearing:Result[]=[];
  selectedPokediv: number | undefined;
  hoveredPokediv:number|undefined;
  selectedPokemon:Pokemon| undefined;
  p=0;

  constructor(
    private pokemonApiService: PokemonApiService
  ) { }

  ngOnInit(): void {
    this.pokemonApiService.getAllPokemons().subscribe(dataResult => {
      dataResult.results.forEach(result=>{
        this.pokemonList.push(new Result(result.name, result.url));
      })
      });
    };


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

};
