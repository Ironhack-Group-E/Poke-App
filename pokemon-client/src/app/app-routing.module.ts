import {TeamComponent} from '../app/team/team.component';
import {PokedexComponent} from '../app/pokedex/pokedex.component';
import {TrainerComponent} from './trainer/trainer.component';


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'team', component: TeamComponent },
  { path: 'pokedex', component: PokedexComponent },
  { path: 'trainer', component: TrainerComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
