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

  backgroundColor: string = "#ededed"
  borderColor: string = "black"

  image: any;
  base64Data: any;
  retrieveResonse: any;

  constructor(
    private trainerService: TrainerService,
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.getImage();
  }

  deleteTrainer(id: number, photoName: string): void {
    const result = {
      id: id,
      photoName: photoName
    }
    this.deleteTrainerEvent.emit(result);
    this.getImage();
  }

  onMouseOver(): void {
    this.backgroundColor = "#9ac1d8";
    this.borderColor = "#1a5d83"
  }

  onMouseOut(): void {
    this.backgroundColor = "#ededed";
    this.borderColor = "black"
  }

  getImage() {
    if(!this.trainer.photo.startsWith('http')) {
      this.trainerService.getImage(this.trainer.photo)
      .subscribe(
        res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.image = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
    }
  }
}
