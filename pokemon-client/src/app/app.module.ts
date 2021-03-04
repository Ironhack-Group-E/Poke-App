import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import {MatAutocompleteModule} from '@angular/material/autocomplete';


import { AppComponent } from './app.component';
import { TeamComponent } from './team/team.component';
import { PokedexComponent } from './pokedex/pokedex.component';
import { TrainerComponent } from './trainer/trainer.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { TeamDetailsComponent } from './team/team-details/team-details.component';
import { PokemonDetailsComponent } from './team/team-details/pokemon-details/pokemon-details.component';
import { HomeComponent } from './home/home.component';
import { TrainerCardComponent } from './trainer/trainer-card/trainer-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';


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
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
