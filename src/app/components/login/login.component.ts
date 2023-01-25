import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/auth.model';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm) {
    console.log('thi si siht eflorm ', f.value);
    this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyASoRkPzw2fKpYJuxq-UYdRhaTMX1_7byc', {
      email: f.value.email,
      password: f.value.password,
      returnSecureToken: true
    }).subscribe(response => {
      console.log(response);
      
    })

  }

}
