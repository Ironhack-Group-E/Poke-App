import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../models/Pokemon/pokemon';
import { PokemonApiService } from '../services/pokemon-api.service';
import { FormControl } from '@angular/forms';
import { TrainerService } from '../services/trainer.service';
import { Trainer } from '../models/Trainer/trainer';
import { Team } from '../models/Team/team';
import { TeamService } from '../services/team.service';
import { Observable } from 'rxjs';
import { Result } from '../models/result';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  //Trainer selected on the 'select' of the form
  private _selectedTrainer!: Trainer;
  //Array with the trainers which have been created
  private _trainers: Trainer[];
  //Team of the selected trainer
  private _team: Team;

  //The string for the Pokemon searched
  private _pokemonName: string;
  //A string array with the Pokemon name filtered according the text input
  filteredOptions: Observable<string[]> | undefined;
  //A string array with the Pokemon names
  content: string[] = [];

  //Form control necessary to the autocompletation
  myControl = new FormControl();

  constructor(
    private trainerService: TrainerService,
    private pokemonApiService: PokemonApiService,
    private teamService: TeamService
  ) {
    this._trainers = [];
    this._team = new Team();
    this._pokemonName = '';
  }

  ngOnInit(): void {
    //When the page loads, we get the trainers from the database
    this.trainerService.getTrainers().subscribe(dataResult => {
      this._trainers = dataResult;
    });

    //Gets the Pokemon names
    this.pokemonApiService.getAllPokemons().subscribe(dataResult => {
      dataResult.results.forEach(result => {
        this.content.push(result.name);
      })
    });

    //We rebuild the Pokemon list filteres according the value of the search changes
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  //An utility function for the autocompletation
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.content.filter(option => option.toLowerCase().includes(filterValue));
  }

  //A function to change the trainer selected and the Pokemon from his/her team
  trainerChange(trainer: Trainer) {
    this.trainerService.getTeam(trainer).subscribe(team => {
      this._team.clear();
      this._team.id = team.id;
      //Get the info of the Pokemon of the trainer's team
      team.pokemonIds.forEach(pokemonId => {
        this.pokemonApiService.getPokemonById(pokemonId).subscribe(pokemonData => {
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
          pokemon.types[0] = pokemonData.types[0].type.name;
          if (pokemonData.types.length > 1) {
            pokemon.types[1] = pokemonData.types[1].type.name;
          }
          this._team.addPokemon(pokemon);
        })
      })
    })
  }

  //Adds a Pokemon to the team
  addPokemonByName(name: string): void {
    //Checks if the team is filled
    if (this._team.pokemonList.length === 7) {
      alert("You can't add more than 7 Pokemon to your team!");
      return;
    }
    //Checks if is a Pokemon name
    if (!isNaN(Number(name))) {
      alert("You must enter a Pokemon name, not the ID");
      return;
    }

    //Get the Pokemon by name
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
        pokemon.types[0] = pokemonData.types[0].type.name;
        if (pokemonData.types.length > 1) {
          pokemon.types[1] = pokemonData.types[1].type.name;
        }
        this._team.addPokemon(pokemon);
        this.teamService.addPokemon(this.team.id, pokemon.id).subscribe();
        this.pokemonName = '';
      },
      error => alert(`Pokemon '${name}' not found`));
  }

  //Function when press enter to add a Pokemon
  keydownHandler(event: KeyboardEvent): void {
    if (event.key === 'Enter' && this.pokemonName.length > 0)
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
