import { Component, Input, OnInit } from '@angular/core';

import { Exercise } from '../classes/exercise';

import { ExerciseService } from '../services/exercise.service';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css']
})
export class ExercisesComponent implements OnInit {

  
  constructor(private ExerciseService: ExerciseService) { }
  @Input() exercises: Exercise[];
  @Input() workoutId : number;
  newExerciseName = "";
  newExerciseDescription = "";
  newExerciseSets = 0;
  newExerciseRepetitions = 0;
  newExercise: Exercise;
  ngOnInit() {

  }

  AddNewExercise(): void {

        this.newExercise = {_id: 1234, name: this.newExerciseName, description: this.newExerciseDescription, sets: this.newExerciseSets, repetitions: this.newExerciseRepetitions};
        this.ExerciseService.add(this.workoutId,this.newExercise)
        .then(exercise => 
              { this.exercises.push(exercise);
                this.clearNewExercise(); });
        
        
    };

    delete(exercise: Exercise): void {

      this.ExerciseService
            .delete(exercise._id, this.workoutId)
            .then(() => {
                this.exercises = this.exercises.filter(h => h !== exercise);
            });

    }

    update(): void {

    }

    private clearNewExercise(): void {
      this.newExerciseName = "";
      this.newExerciseDescription = "";
      this.newExerciseRepetitions = 0;
      this.newExerciseSets = 0;
    }

}
