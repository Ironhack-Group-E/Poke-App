import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/Pokemon/pokemon';
import { Team } from 'src/app/models/Team/team';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.css']
})
export class TeamDetailsComponent implements OnInit {

  @Input() team!: Team;

  constructor() { }

  ngOnInit(): void {
  }

}
