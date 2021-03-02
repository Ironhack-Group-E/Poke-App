import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TeamComponent } from './team/team.component';
import { PokedexComponent } from './pokedex/pokedex.component';
import { TrainerComponent } from './trainer/trainer.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FormsModule } from '@angular/forms';
import { TeamDetailsComponent } from './team/team-details/team-details.component';
import { PokemonDetailsComponent } from './team/team-details/pokemon-details/pokemon-details.component';
import { HomeComponent } from './home/home.component';
import { TrainerCardComponent } from './trainer/trainer-card/trainer-card.component';

@NgModule({
  declarations: [
    AppComponent,
    TeamComponent,
    PokedexComponent,
    TrainerComponent,
    NavBarComponent,
    TeamDetailsComponent,
    PokemonDetailsComponent,
    HomeComponent,
    TrainerCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
