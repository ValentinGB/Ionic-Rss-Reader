import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  userData : UserData = new UserData();

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private storage: Storage) {}

  ionViewDidLoad() {
    let userData = JSON.parse(localStorage.getItem('userData'));
    if(userData === undefined || userData === null)
      return;

    this.userData = new UserData(userData.id,userData.name,userData.email,userData.gender);
    console.log(this.userData);
  }

}

class UserData {
  id : string;
  name : string;
  mail : string;
  gender : string;

  constructor(id?: string, name?: string, mail?: string, gender?: string){
    this.id = id || '';
    this.name = name || '';
    this.mail = mail || '';
    this.gender = gender || '';
  }
}
