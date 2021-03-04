import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trainer } from 'src/app/models/Trainer/trainer';
import { Team } from 'src/app/models/Team/team';


@Injectable({
  providedIn: 'root'
})
export class TrainerService {

  constructor(
    private http: HttpClient
  ) { }

  getTrainers(): Observable<Trainer[]> {
    return this.http.get<Trainer[]>('http://localhost:8080/trainers');
  }

  getTrainer(id: number): Observable<Trainer> {
    return this.http.get<Trainer>('http://localhost:8080/trainer/' + id);
  }

  deleteTrainer(id: number): Observable<{}> {
    return this.http.delete('http://localhost:8080/trainer/' + id);
  }

  createTrainer(trainer: Trainer): Observable<Trainer> {
    let body = JSON.stringify(trainer);
    body = body.replace(/"_/g, '"');
    return this.http.post<Trainer>('http://localhost:8080/trainer', body);
  }

  getTeam(trainer: Trainer): Observable<TeamInterface> {
    return this.http.get<TeamInterface>('http://localhost:8080/trainer/' + trainer.id + '/team');
  }

  postImage(imageData: FormData): Observable<{}> {
    return this.http.post('http://localhost:8080/image/upload', imageData);
  }

  getImage(name: string): Observable<FormData> {
    return this.http.get<FormData>('http://localhost:8080/image/get/' + name);
  }

  deleteImage(name: string): Observable<{}> {
    return this.http.delete('http://localhost:8080/image/delete/' + name);
  }
}

// interface TrainerInterface {
//   id: number,
//   name: string,
//   age: number,
//   hobby: string,
//   photo: string
// }

interface TeamInterface {
  id: number,
  trainer: Trainer, 
  pokemonIds: number[]
}