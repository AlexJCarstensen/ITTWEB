import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WorkoutsComponent }      from '../workouts/workouts.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'workouts',     component: WorkoutsComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
