import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Workout } from '../classes/workout';
import { WORKOUTS } from '../classes/workoutMock';

@Injectable()
export class WorkoutService {

  private baseUrl = 'https://fitnesspowah.herokuapp.com/';  
  private workoutsUrl = 'api/workouts';  // URL to web api
  private handleError(error: any): Promise<any> {
  console.error('An error occurred', error); // for demo purposes only

  return Promise.reject(error.message || error);
}
  constructor(private http: Http) { }

  getWorkouts(): Promise<Workout[]> {
    return this.http.get(this.baseUrl+this.workoutsUrl, {headers: this.getHeaders()})
               .toPromise()
               .then(response => response.json() as Workout[])
               .catch(this.handleError);

    //return Promise.resolve(WORKOUTS);
  }
    getWorkout(id: number): Promise<Workout> {
        return this.getWorkouts()
        .then(workouts => workouts.find(workout => workout._id === id));
    }

    update(workout: Workout): Promise<Workout> {
        const url = `${this.baseUrl}${this.workoutsUrl}/${workout._id}`;
        return this.http
        .put(url, JSON.stringify(workout), {headers: this.getHeaders()})
        .toPromise()
        .then(() => workout)
        .catch(this.handleError);
    }
    create(name: string): Promise<Workout> {

        return this.http
            .post(this.baseUrl + this.workoutsUrl, JSON.stringify({name: name}), {headers: this.getHeaders()})
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }
    delete(id: number): Promise<void> {
        const url = `${this.baseUrl}${this.workoutsUrl}/${id}`;
        return this.http.delete(url, {headers: this.getHeaders()})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    private getHeaders(): Headers {
        return new Headers({
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + localStorage.getItem("token")
        });
    }

}