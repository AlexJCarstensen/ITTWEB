import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Workout } from '../classes/workout';
import { WorkoutService } from '../services/workout.service';


@Component({
    moduleId: module.id,
    selector: 'my-workouts',
    templateUrl: 'workouts.component.html',
    styleUrls: [`workouts.component.css`],

})

export class WorkoutComponent implements OnInit {
   
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
        this.WorkoutService.getWorkouts().then(heroes => this.workouts = heroes);
    };
    ngOnInit(): void {
        //this.getWorkouts();
    };

    gotoDetail(): void {
        this.router.navigate(['/detail', this.selectedWorkout.id]);
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
            .delete(workout.id)
            .then(() => {
                this.workouts = this.workouts.filter(h => h !== workout);
                if (this.selectedWorkout === workout) { this.selectedWorkout = null; }
            });
    }       
}