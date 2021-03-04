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

  backgroundColor: string = "#ededed"
  borderColor: string = "black"

  selectedFile: File = new File( [], '');

  constructor(
    private trainerService: TrainerService
  ) { }

  ngOnInit(): void {
    this.getAllTrainers();
  }

  addTrainer(): void {
    const age: number = Number(this.trainerAge);

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

    if(isNaN(age)) {
      alert("The age must be a number");
      return;
    } else if(age < 0 || age > 150) {
      alert("Introduce a real age");
      return;
    }

    this.trainerPhoto = this.selectedFile.name;
    this.trainerPhoto = this.trainerPhoto.replace(/ /g, '');

    if(this.trainerPhoto === '') {
      this.trainerPhoto = "https://www.seekpng.com/png/full/851-8515846_pokemon-trainer-vince-pokemon-trainer-sprites-transparent.png";
    }

    this.uploadImage();

    let addedTrainer: Trainer = new Trainer(1, this.trainerName, age, this.trainerHobby, this.trainerPhoto);

    this.trainerService.createTrainer(addedTrainer).subscribe(dataResult =>
      {
        console.log('Trainer ' + addedTrainer.name + ' created!');
        addedTrainer.id = dataResult.id;
        this.trainers.push(addedTrainer);
    });


    this.trainerName = "";
    this.trainerHobby = "";
    this.trainerAge = "";
    this.trainerPhoto = "";
    this.selectedFile  = new File( [], '');
  }

  deleteTrainer(id: number, photoName: string): void{
    this.trainerService.deleteTrainer(id).subscribe(dataResult => (
      this.trainers = [],
      this.getAllTrainers(),
      console.log('Trainer ' + id + ' deleted')
    ));
    this.trainerService.deleteImage(photoName).subscribe();
  }

  getAllTrainers(): void{
    this.trainerService.getTrainers().subscribe(dataResult => {
      dataResult.forEach(tr => this.trainers.push(new Trainer(tr.id, tr.name, tr.age, tr.hobby, tr.photo)));
    });
  }

  onMouseOver(): void {
    this.backgroundColor = "#9ac1d8";
    this.borderColor = "#1a5d83"
  }

  onMouseOut(): void {
    this.backgroundColor = "#ededed";
    this.borderColor = "black"
  }

  onFileChanged(event: any): void {
    this.selectedFile = event.target.files[0];
    this.trainerPhoto = this.selectedFile.name;
    console.log(this.trainerPhoto);
  }

  uploadImage() {
        const uploadImageData = new FormData();
        uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name.replace(/ /g, ''));
        this.trainerService.postImage(uploadImageData).subscribe();
      }

}
