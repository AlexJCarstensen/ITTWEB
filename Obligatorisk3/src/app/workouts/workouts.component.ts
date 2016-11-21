import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Workout } from './classes/workout';
import { WorkoutService } from './services/workout.service';


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
        private heroService: WorkoutService) { }


    onSelect(workout: Workout): void {
        this.selectedWorkout = workout;
    };
    getHeroes(): void {
        this.heroService.getHeroes().then(heroes => this.workouts = heroes);
    };
    ngOnInit(): void {
        this.getHeroes();
    };

    gotoDetail(): void {
        this.router.navigate(['/detail', this.selectedWorkout.id]);
    }

    add(name: string): void {
        name = name.trim();
        if (!name) { return; }
        this.heroService.create(name)
            .then(hero => {
            this.workouts.push(hero);
            this.selectedWorkout = null;
            });
    }
    delete(workout: Workout): void {
        this.heroService
            .delete(workout.id)
            .then(() => {
                this.workouts = this.workouts.filter(h => h !== workout);
                if (this.selectedWorkout === workout) { this.selectedWorkout = null; }
            });
    }       
}