import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trainer } from 'src/app/models/Trainer/trainer';


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

  deleteTrainer(id: number): void {
    this.http.delete('http://localhost:8080/trainer/' + id).subscribe(() => console.log('trainer ' + id + ' deleted'));
  }

  createTrainer(trainer: Trainer): Observable<Trainer> {
    const body = JSON.stringify(trainer);
    return this.http.post<Trainer>('http://localhost:8080/trainer', body);
  }

  getTeam(trainer: Trainer): Observable<number[]> {
    return this.http.get<number[]>('http://localhost:8080/trainer/' + trainer.id + '/team');
  }
}

// interface TrainerInterface {
//   id: number,
//   name: string,
//   age: number,
//   hobby: string,
//   photo: string
// }
