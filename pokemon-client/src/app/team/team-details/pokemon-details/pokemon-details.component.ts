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

  @Input() pokemon!: Pokemon;
  @Input() team!:Team;
  @Input() index!:number;

  displayStats: boolean = false;
  buttonText: string = "View stats"

  color: string = "#000000";
  backgroundColor: string = "rgb(255, 246, 116)";

  constructor(
    private teamService: TeamService
  ) { }

  ngOnInit(): void {
  }

  toggleDisplayStats(): void {
    this.displayStats = !this.displayStats;
    if(this.displayStats) {
      this.buttonText = "Hide stats";
    }
    else { 
      this.buttonText = "View stats";
    }
  }

  onMouseOver(): void {
    this.color = "#000000";
    this.backgroundColor = "rgb(189, 186, 7)";
  }

  onMouseOut(): void {
    this.color = "#000000";
    this.backgroundColor = "rgb(255, 246, 116)";
  }

  deletePokemon():void{
    
    this.teamService.deletePokemon(this.team.id, this.index + 1).subscribe((dataResult)=>{
    this.team.pokemonList.splice(this.index,1);
     console.log("Pokemon " + this.index + 1 + "deleted from team " + this.team.id) });
  }
  
}
