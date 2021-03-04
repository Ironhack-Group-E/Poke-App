import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Trainer } from 'src/app/models/Trainer/trainer';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-trainer-card',
  templateUrl: './trainer-card.component.html',
  styleUrls: ['./trainer-card.component.css']
})
export class TrainerCardComponent implements OnInit {

  @Input() trainer!: Trainer;

  @Output() deleteTrainerEvent = new EventEmitter();

  //Variables for the colors of the trainer's card
  backgroundColor: string = "#ededed"
  borderColor: string = "black"

  //Variables to show the image if it's in the database
  image: any;
  base64Data: any;
  retrieveResonse: any;

  constructor(
    private trainerService: TrainerService,
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    //Charges the images from the database when the pages loads
    this.getImage();
  }

  //Deletes a trainer
  deleteTrainer(id: number, photoName: string): void {
    //The parent controller needs the id of the trainer and the photoName to know if it's a photo from the database to delete it too
    const result = {
      id: id,
      photoName: photoName
    }
    this.deleteTrainerEvent.emit(result);
    this.getImage();
  }

  //Function to changes the color when the mouse is over the card
  onMouseOver(): void {
    this.backgroundColor = "#9ac1d8";
    this.borderColor = "#1a5d83"
  }

  //Function to recover the original color
  onMouseOut(): void {
    this.backgroundColor = "#ededed";
    this.borderColor = "black"
  }

  //Gets a image from the database
  getImage() {
    //Only if the photo is from the database and it isn't from Internet
    if(!this.trainer.photo.startsWith('http')) {
      this.trainerService.getImage(this.trainer.photo)
      .subscribe(
        res => {
          //Necessary to process the image
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.image = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
    }
  }
}
