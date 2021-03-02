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

  rotate(){
    this.isRotating=true;
  }
  
  rotatingtofalse(){
    this.isRotating=false;
  }

}
