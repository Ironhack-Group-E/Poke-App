import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(
    private http: HttpClient,
  ) { }

  addPokemon(teamId: number, pokemonId: number): Observable<number> {
    return this.http.patch<number>('http://localhost:8080/team/' + teamId + '/add/' + pokemonId, {});

  }
}
