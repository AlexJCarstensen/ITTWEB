import { Component, OnInit } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
private baseUrl = 'https://fitnesspowah.herokuapp.com/api/';  
private loginUrl = "login"
userName : string;
password: string;
private headers = new Headers({'Content-Type': 'application/json'});

   constructor(private http: Http,  
                private router: Router) { }
  submitForm(): void {
      this.http.post(this.baseUrl + this.loginUrl, JSON.stringify({email: this.userName, password: this.password}), {headers: this.headers})
      .toPromise()
      .then(
        response => 
        {let token = response.json().token as string
          localStorage.setItem("token", token);
          this.router.navigate(['/workouts']);
        }
      )
      .catch(error => console.error("an error occurred"));
  }

  ngOnInit() {
  }

}
