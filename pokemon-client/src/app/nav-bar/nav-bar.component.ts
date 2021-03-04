import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  isRotating:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  //A transition effect to rotate the pokeball logo
  rotate(){
    this.isRotating=true;
  }

  rotatingtofalse(){
    this.isRotating=false;
  }

}
