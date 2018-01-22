import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FacebookProvider } from '../../providers/facebook/facebook';
import { UserProvider } from '../../providers/user/user';
import { LoadingController } from 'ionic-angular';

import { NewsPage } from '../news/news';
import { ProfilePage } from '../profile/profile';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [FacebookProvider]
})
export class HomePage implements OnInit{

  newsPage:any = NewsPage;
  profilePage:any = ProfilePage;
  registered:boolean = false;
  rootPage = this.newsPage;

  constructor( 
    public navCtrl: NavController, 
    public navParams: NavParams,
    private storage: Storage, 
    private fb: FacebookProvider,
    private alertCtrl: AlertController, 
    private user: UserProvider,
    private loadingCtrl : LoadingController
  ) {}

  ngOnInit(){
    let userData = JSON.parse(localStorage.getItem('userData'));

    if(userData !== null && userData !== undefined){
      this.registered = true;
      this.login(userData);
    } else {
      this.registered = false;
    }

  }

  changePage(page:any){
    this.rootPage = page;
  }

  signIn(){
    this.fb.login().then(loggedIn => {

      if(!loggedIn)
        return this.registered = false;

      this.fb.getFacebookData().then(userData => {

        if(userData === undefined || userData === null)
          return this.registered = false;

        localStorage.setItem('userData', JSON.stringify(userData));
        this.registered = true;
        this.rootPage = this.profilePage;

        this.login(userData);

      }, (err) => {
        console.log(err);
        this.registered = false;
      });
    });

  }

  login(userData){

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();
    this.user.login(userData).subscribe((data) => {
      localStorage.setItem('ID_user',data.ID_user);
      loading.dismiss();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

}
