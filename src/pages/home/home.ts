import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { NewsPage } from '../news/news';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage implements OnInit{

  newsPage:any = NewsPage;
  registered:boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
  }

  ngOnInit(){
    var userData = this.storage.get('userData').then(data => {
      data = JSON.parse(data);
      if(data !== null && data !== undefined){
        this.registered = true;
      } else {
        this.registered = false;
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

}
