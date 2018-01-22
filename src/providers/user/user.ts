import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class UserProvider {

  constructor(public http: Http) {
    console.log('Hello UserProvider Provider');
  }

  public login(userData){
    delete userData.first_name;
    delete userData.id;

    let headers = new Headers();
    headers.append('Content-Type','application/json');
    let options = new RequestOptions({headers:headers});

    console.log('userData',userData);
    return this.http.post('http://localhost:3000/users/login',userData,options).map(data => data.json());
  }

}
