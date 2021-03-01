import {TeamComponent} from '../app/team/team.component';
import {PokedexComponent} from '../app/pokedex/pokedex.component';
import {TrainerComponent} from '../app/trainer/trainer.component';


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'team', component: TeamComponent },
  { path: 'pokedex', component: PokedexComponent },
  { path: 'trainer', component: TrainerComponent },
  { path: '', redirectTo: '/team', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
