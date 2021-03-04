import { Component, OnInit } from '@angular/core';
import { Trainer } from '../models/Trainer/trainer';
import { TrainerService } from '../services/trainer.service';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.css']
})
export class TrainerComponent implements OnInit {

  //Variables for the trainer's properties
  trainerName: string = "";
  trainerHobby: string = "";
  trainerAge: string = "";
  trainerPhoto: string = "";

  //List of trainers
  trainers: Trainer[] = [];


  //Variables for the colors of the trainer's card
  backgroundColor: string = "#ededed"
  borderColor: string = "black"

  //Selected file from local
  selectedFile: File = new File( [], '');

  constructor(
    private trainerService: TrainerService
  ) { }

  ngOnInit(): void {
    //Charges all trainers from the database
    this.getAllTrainers();
  }

  //Adds a new trainer
  addTrainer(): void {
    //The input of the age is a string so we must check it's a valid number
    const age: number = Number(this.trainerAge);

    //Checks the name of the trainer
    if(this.trainerName === '') {
      alert("You must introduce a name");
      return;
    } else if(this.trainerName.length > 22){
      alert("The name is too large");
      return;
    }

    //Checks the hobby
    if(this.trainerHobby === '') {
      alert("You must introduce a hobby");
      return;
    }

    //Checks if the age is a number
    if(isNaN(age)) {
      alert("The age must be a number");
      return;

    //Checks if the age is a valid age
    } else if(age < 0 || age > 150) {
      alert("Introduce a real age");
      return;
    }

    //Checks if the user has selected a image from local and sets the trainer photo name
    if(this.selectedFile.name !== '') {
      this.trainerPhoto = this.selectedFile.name;
      this.trainerPhoto = this.trainerPhoto.replace(/ /g, '');
      //Uploads the image to the database
      this.uploadImage();
    }

    //If the user hasn't selected an image, we set a default one
    if(this.trainerPhoto === '') {
      this.trainerPhoto = "https://www.seekpng.com/png/full/851-8515846_pokemon-trainer-vince-pokemon-trainer-sprites-transparent.png";
    }

    //Creates a new trainer
    let addedTrainer: Trainer = new Trainer(1, this.trainerName, age, this.trainerHobby, this.trainerPhoto);

    //Adds the new trainer to the database
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

  //Deletes a trainer
  deleteTrainer(id: number, photoName: string): void{
    this.trainerService.deleteTrainer(id).subscribe(dataResult => (
      this.trainers = [],
      this.getAllTrainers(),
      console.log('Trainer ' + id + ' deleted')
    ));
    this.trainerService.deleteImage(photoName).subscribe();
  }

  //Gets all the trainers in the database
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

  //Function to change the selectedFile if a image is selected from local
  onFileChanged(event: any): void {
    this.selectedFile = event.target.files[0];
    this.trainerPhoto = this.selectedFile.name;
    console.log(this.trainerPhoto);
  }

  //Uploads a image to the database
  uploadImage() {
        const uploadImageData = new FormData();
        uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name.replace(/ /g, ''));
        this.trainerService.postImage(uploadImageData).subscribe();
      }

}
