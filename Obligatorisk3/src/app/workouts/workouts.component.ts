import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Workout } from '../classes/workout';
import { WorkoutService } from '../services/workout.service';


@Component({
    
    selector: 'my-workouts',
    templateUrl: 'workouts.component.html',
    styleUrls: ['workouts.component.css'],

})

export class WorkoutsComponent implements OnInit {
   
    title = 'Your workouts';
    selectedWorkout: Workout;
    workouts: Workout[];

    constructor(
        private router: Router,
        private WorkoutService: WorkoutService) { }


    onSelect(workout: Workout): void {
        this.selectedWorkout = workout;
    };
    getWorkouts(): void {
        this.WorkoutService.getWorkouts().then(workouts => this.workouts = workouts);
    };
    ngOnInit(): void {
        this.getWorkouts();
    };

    gotoExercises(): void {
        this.router.navigate(['/exercises', this.selectedWorkout._id]);
    }

    add(name: string): void {
        name = name.trim();
        if (!name) { return; }
        this.WorkoutService.create(name)
            .then(hero => {
            this.workouts.push(hero);
            this.selectedWorkout = null;
            });
    }
    delete(workout: Workout): void {
        this.WorkoutService
            .delete(workout._id)
            .then(() => {
                this.workouts = this.workouts.filter(h => h !== workout);
                if (this.selectedWorkout === workout) { this.selectedWorkout = null; }
            });
    }       
}