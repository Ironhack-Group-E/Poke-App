import { Component, OnInit } from '@angular/core';
import { Trainer } from '../models/Trainer/trainer';
import { TrainerService } from '../services/trainer.service';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.css']
})
export class TrainerComponent implements OnInit {

  trainerName: string = "";
  trainerHobby: string = "";
  trainerAge: string = "";
  trainerPhoto: string = "";

  trainers: Trainer[] = [];

  constructor(
    private trainerService: TrainerService
  ) { }

  ngOnInit(): void {
    this.getAllTrainers();
  }

  addTrainer(): void {
    const age: number = +this.trainerAge;

    if(this.trainerName === '') {
      alert("You must introduce a name");
      return;
    } else if(this.trainerName.length > 22){
      alert("The name is too large");
      return;
    }

    if(this.trainerHobby === '') {
      alert("You must introduce a hobby");
      return;
    }

    if(age === NaN) {
      alert("The age must be a number");
      return;
    } else if(age < 0) {
      alert("The age must be positive");
      return;
    } else if(age > 150) {
      alert("Introduce a real age");
      return;
    }

    if(this.trainerPhoto === '') {
      this.trainerPhoto = "https://www.seekpng.com/png/full/851-8515846_pokemon-trainer-vince-pokemon-trainer-sprites-transparent.png";
    }
    
    const addedTrainer: Trainer = new Trainer(1, this.trainerName, age, this.trainerHobby, this.trainerPhoto);
    this.trainerService.createTrainer(addedTrainer).subscribe(dataResult => console.log('Trainer ' + addedTrainer.name + ' created!'));
    this.trainers.push(addedTrainer);

    this.trainerName = "";
    this.trainerHobby = "";
    this.trainerAge = "";
    this.trainerPhoto = "";
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

  //¿Puede que esta función sea innecesaria?
  /*getTrainer(id: number): void{
    this.trainerService.getTrainer(id).subscribe(dataResult => {
      this.trainer = new Trainer(dataResult.id, dataResult.name, dataResult.age, dataResult.hobby, dataResult.photo);
    });
  }*/


}
