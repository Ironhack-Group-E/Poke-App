import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from '../models/Team/team';

@Injectable({
  providedIn: 'root'
})
export class TeamServiceService {

  constructor(
    private http: HttpClient,
  ) { }

  // addPokemon(teamId: number, pokemonId: number): Observable<ArrayBuffer> {
  //   return this.http.patch<Team>('http://localhost:8080/team/' + teamId + '/add/' + pokemonId);

  // }
}
