import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FacebookService, InitParams } from 'ngx-facebook';
import { AlertController } from 'ionic-angular';

@Injectable()
export class FacebookProvider {

  constructor(public http: HttpClient, private fb: FacebookService, private alertCtrl: AlertController) {

    let initParams: InitParams = {
      appId: '315858782256890',
      xfbml: true,
      version: 'v2.11'
    };
 
    fb.init(initParams);

  }

  public login(){
    const options: any = {
      scope: 'public_profile,user_friends,email,pages_show_list',
      return_scopes: true,
      enable_profile_selector: true
    };
  
    return this.fb.login(options)
    .then((response) => {
      return (response.status == "connected") ? true : false;
    })
    .catch(e => {
        this.showAlert('Sorry','Couldn\'t log into your facebook account');
        console.error('Error logging in')
      });
  }

  public getFacebookData() {
    return this.fb.api('/me?fields=id,name,first_name,gender,email').then(
        (userData: any) => userData,
        (error: any) => {
          this.showAlert('Sorry','Couldn\'t log into your facebook account');
          console.error(error);
        }
    );
  }

  showAlert(title:string,subTitle:string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: ['OK']
    });
    alert.present();
  }

}
