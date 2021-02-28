import { Component, OnInit } from '@angular/core';
import { Trainer } from '../models/Trainer/trainer';
import { TrainerService } from '../services/TrainerService/trainer.service';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.css']
})
export class TrainerComponent implements OnInit {

  trainer: Trainer = new Trainer(0, '', 0, '', '');

  trainers: Trainer[] = [];

  constructor(
    private trainerService: TrainerService
  ) { }

  ngOnInit(): void {
  }

  addTrainer(id: number, name: string, age: number, hobby: string, photo: string): void {
    const addedTrainer: Trainer = new Trainer(id, name, age, hobby, photo);
    this.trainerService.createTrainer(addedTrainer).subscribe(dataResult => console.log('Trainer ' + name + ' created!'));
    this.trainers.push(addedTrainer);
  }

  deleteTrainer(id: number): void{
    this.trainerService.deleteTrainer(id);
    this.trainers.splice(id-1, 1);
  }

  getAllTrainers(): void{
    this.trainerService.getTrainers().subscribe(dataResult => {
      dataResult.forEach(tr => this.trainers.push(new Trainer(tr.id, tr.name, tr.age, tr.hobby, tr.photo)));
    });
  }

  getTrainer(id: number): void{
    this.trainerService.getTrainer(id).subscribe(dataResult => {
      this.trainer = new Trainer(dataResult.id, dataResult.name, dataResult.age, dataResult.hobby, dataResult.photo);
    });
  }


}
