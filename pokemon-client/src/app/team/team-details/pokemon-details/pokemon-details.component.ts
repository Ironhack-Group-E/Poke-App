import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/Pokemon/pokemon';
import { Team } from 'src/app/models/Team/team';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})
export class PokemonDetailsComponent implements OnInit {

  //Takes the pokemon, the team, and the card index from the parent component
  @Input() pokemon!: Pokemon;
  @Input() team!: Team;
  @Input() index!: number;

  //Boolean to show stats
  displayStats: boolean = false;
  //Button text
  buttonText: string = "View stats"

  //Variables to change the colors when hover
  color: string = "#000000";
  backgroundColor: string = "rgb(255, 246, 116)";

  constructor(
    private teamService: TeamService
  ) { }

  ngOnInit(): void {
  }

  //Function to change the text of the button and the boolean
  toggleDisplayStats(): void {
    this.displayStats = !this.displayStats;
    if (this.displayStats) {
      this.buttonText = "Hide stats";
    }
    else {
      this.buttonText = "View stats";
    }
  }

  //Changes the colors when the mouse is over the card
  onMouseOver(): void {
    this.color = "#000000";
    this.backgroundColor = "rgb(189, 186, 7)";
  }

  //Changes the colors when the mouse is goes out the card
  onMouseOut(): void {
    this.color = "#000000";
    this.backgroundColor = "rgb(255, 246, 116)";
  }

  //Function to delete a Pokemon from a team
  deletePokemon(): void {

    this.teamService.deletePokemon(this.team.id, this.index + 1).subscribe((dataResult) => {
      this.team.pokemonList.splice(this.index, 1);
      console.log("Pokemon " + this.index + 1 + "deleted from team " + this.team.id)
    });
  }

}
