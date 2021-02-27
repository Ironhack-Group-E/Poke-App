import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../models/Pokemon/pokemon';
import { PokemonApiService } from '../services/pokemon-api.service';
import { TrainerService } from '../services/TrainerService/trainer.service';
import { Trainer } from '../models/Trainer/trainer';
import { Team } from '../models/Team/team';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  private _selectedTrainer: Trainer;
  private _trainers: Trainer[];
  private _team: Team;

  private _pokemonName: string;

  constructor(
    private trainerService: TrainerService,
    private pokemonApiService: PokemonApiService
  ) {
    this._trainers = [];
    this._team = new Team();
    this._selectedTrainer = this._team.trainer;
    this._pokemonName = '';
   }

  ngOnInit(): void {
    this.trainerService.getTrainers().subscribe(dataResult => {
      this._trainers = dataResult;
      console.log(this._trainers);
    });
  }

  trainerChange(trainer: Trainer) {
    this.trainerService.getTeam(trainer).subscribe(team => {
      this._team.clear();
      team.pokemonIds.forEach(pokemonId => {
        this.pokemonApiService.getPokemonById(pokemonId).subscribe(pokemonData => {
          let pokemon :Pokemon = new Pokemon(
            pokemonData.id, 
            pokemonData.name, 
            pokemonData.sprites.front_default,
            pokemonData.stats[0].base_stat,
            pokemonData.stats[1].base_stat,
            pokemonData.stats[2].base_stat,
            pokemonData.stats[3].base_stat,
            pokemonData.stats[4].base_stat,
            pokemonData.stats[5].base_stat,
            []
          )
          pokemon.types[0]=pokemonData.types[0].type.name;
          if(pokemonData.types.length>1){
            pokemon.types[1]=pokemonData.types[1].type.name;
          }
          this._team.addPokemon(pokemon);
        })
      })
    })
  }

  addPokemonByName(name: string): void {
    this.pokemonApiService.getPokemonByName(name.toLowerCase()).subscribe(
      pokemonData => {
        let pokemon: Pokemon = new Pokemon(
          pokemonData.id, 
          pokemonData.name, 
          pokemonData.sprites.front_default,
          pokemonData.stats[0].base_stat,
          pokemonData.stats[1].base_stat,
          pokemonData.stats[2].base_stat,
          pokemonData.stats[3].base_stat,
          pokemonData.stats[4].base_stat,
          pokemonData.stats[5].base_stat,
          []
        )
        pokemon.types[0]=pokemonData.types[0].type.name;
        if(pokemonData.types.length>1){
          pokemon.types[1]=pokemonData.types[1].type.name;
        }
        this._team.addPokemon(pokemon);
    }, 
    error => alert(`Pokemon '${name}' not found`));
  }

  keydownHandler(event: KeyboardEvent): void {
    if (event.key === 'Enter')
      this.addPokemonByName(this.pokemonName);
  }

  get trainers(): Trainer[] {
    return this._trainers;
  }

  get selectedTrainer(): Trainer {
    return this._selectedTrainer;
  }

  set selectedTrainer(trainer: Trainer) {
    this._selectedTrainer = trainer;
  }

  get team(): Team {
    return this._team;
  }

  get pokemonName(): string {
    return this._pokemonName;
  }

  set pokemonName(name: string) {
    this._pokemonName = name;
  }

}
