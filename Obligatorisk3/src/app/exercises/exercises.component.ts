import { Component, Input, OnInit } from '@angular/core';

import { Exercise } from '../classes/exercise';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css']
})
export class ExercisesComponent implements OnInit {

  
  constructor() { }
  @Input() exercises: Exercise[];
  newExerciseName = "";
  newExerciseDescription = "";
  newExerciseSets = 0;
  newExerciseRepetitions = 0;
  newExercise: Exercise;
  ngOnInit() {

  }

  newWorkout(): void {

        this.newExercise = {id: 1234, name: this.newExerciseName, description: this.newExerciseDescription, sets: this.newExerciseSets, repetitions: this.newExerciseRepetitions};
        this.exercises.push(this.newExercise);
    };

}
