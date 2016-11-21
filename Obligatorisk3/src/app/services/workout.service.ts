import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Workout } from '../classes/workout';

@Injectable()
export class WorkoutService {

  private workoutsUrl = 'api/workouts';  // URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});
  private handleError(error: any): Promise<any> {
  console.error('An error occurred', error); // for demo purposes only

  return Promise.reject(error.message || error);
}
  constructor(private http: Http) { }

  getWorkouts(): Promise<Workout[]> {
    return this.http.get(this.workoutsUrl)
               .toPromise()
               .then(response => response.json().data as Workout[])
               .catch(this.handleError);
  }
    getWorkout(id: number): Promise<Workout> {
        return this.getWorkouts()
        .then(workouts => workouts.find(workout => workout.id === id));
    }

    update(workout: Workout): Promise<Workout> {
        const url = `${this.workoutsUrl}/${workout.id}`;
        return this.http
        .put(url, JSON.stringify(workout), {headers: this.headers})
        .toPromise()
        .then(() => workout)
        .catch(this.handleError);
    }
    create(name: string): Promise<Workout> {
        return this.http
            .post(this.workoutsUrl, JSON.stringify({name: name}), {headers: this.headers})
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }
    delete(id: number): Promise<void> {
        const url = `${this.workoutsUrl}/${id}`;
        return this.http.delete(url, {headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

}