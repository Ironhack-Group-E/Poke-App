import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Trainer } from 'src/app/models/Trainer/trainer';

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

  constructor() { }

  ngOnInit(): void {
  }

  deleteTrainer(id: number): void{
    this.deleteTrainerEvent.emit(id);
  }

  onMouseOver(): void {
    this.backgroundColor = "#9ac1d8";
    this.borderColor = "#1a5d83"
  }

  onMouseOut(): void {
    this.backgroundColor = "#ededed";
    this.borderColor = "black"
  }

}
