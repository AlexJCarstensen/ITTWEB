import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WorkoutsComponent }      from '../workouts/workouts.component';
import { ExercisesComponent } from '../exercises/exercises.component';
import { LoginComponent } from '../login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'workouts',     component: WorkoutsComponent },
  { path: 'exercises',  component: ExercisesComponent}
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
