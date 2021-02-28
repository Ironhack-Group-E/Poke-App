import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/Pokemon/pokemon';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})
export class PokemonDetailsComponent implements OnInit {

  @Input() pokemon!: Pokemon;

  displayStats: boolean = false;
  buttonText: string = "View stats"

  color: string = "#000000";
  backgroundColor: string = "#FFFFFF";

  constructor() { }

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
    this.backgroundColor = "#FFC300";
  }

  onMouseOut(): void {
    this.color = "#000000";
    this.backgroundColor = "#FFFFFF";
  }
}
