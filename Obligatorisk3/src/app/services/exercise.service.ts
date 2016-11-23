import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Exercise } from '../classes/exercise';

@Injectable()
export class ExerciseService {

  private baseUrl = 'https://fitnesspowah.herokuapp.com/api';  
  private workoutsUrl = '/workouts';
  private exerciseUrl = '/exercises';  // URL to web api
  private handleError(error: any): Promise<any> {
  console.error('An error occurred', error); // for demo purposes only

  return Promise.reject(error.message || error);
}
  constructor(private http: Http) { }


  add(workoutId : number ,exercise: Exercise): Promise<Exercise> {
          const url = this.baseUrl + this.workoutsUrl + "/" + workoutId + this.exerciseUrl;

           return this.http
            .post(url , JSON.stringify(exercise), {headers: this.getHeaders()})
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);

  }

  delete(exerciseId: number, workoutId: number): Promise<void> {
      const url = this.baseUrl + this.workoutsUrl + "/" + workoutId + this.exerciseUrl + "/" + exerciseId;
          
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
