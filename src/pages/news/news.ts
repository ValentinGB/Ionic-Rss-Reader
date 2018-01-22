import { Component, ViewChild, Input } from '@angular/core';
import { IonicPage, AlertController, NavController, NavParams } from 'ionic-angular';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { FeedProvider, Feed, FeedArticle } from './FeedProvider';
import { LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
  animations: [
    trigger('searchAnimation', [
      state('hidden', style({
        transform: 'scaleY(0)',
        display : 'none'
      })),
      state('shown', style({
        transform: 'scaleY(1)',
        display : 'block'
      })),
      transition('hidden <=> shown', animate('300ms ease-in-out'))
    ])
  ],
  providers : [FeedProvider]
})
export class NewsPage {
  @Input() searchText : string;
  registered : boolean = false;
  searchPlaceHolder : string = "Search for an article";
  searchBarState : string = 'hidden';
  public articles: FeedArticle[];
  pulled : boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private alertCtrl : AlertController,
    private feedProvider : FeedProvider,
    private loadingCtrl : LoadingController
  ) {}

  doRefresh(refresher) {
    setTimeout(() => {
      this.search((articles) => {
        this.pulled = true;
        this.articles = articles;
        localStorage.setItem('articles',JSON.stringify(articles));
        refresher.complete();
      });
    }, 2000);
  }

  showAlertLogin(){
    this.showAlert('Sorry','To read articles you need to be logged in.')
  }

  showAlertLike(){
    this.showAlert('Sorry','To like an article you need to be logged in.')
  }

  search(done){
    this.feedProvider.getArticlesForUrl('http://rss.nytimes.com/services/xml/rss/nyt/World.xml')
    .subscribe(articles => done(articles));
  }

  toggleSearchBar(){
    this.searchBarState = (this.searchBarState == 'hidden' ? 'shown' : 'hidden');
    this.searchText = "";
  }

  ionViewDidLoad() {
    let userData = JSON.parse(localStorage.getItem('userData'));
    
    if(userData !== null && userData !== undefined){
      this.registered = true;
    } else {
      this.registered = false;
    }

    let _articles = JSON.parse(localStorage.getItem('articles'));
  
    if(_articles === null || _articles === undefined) return;

    this.articles = _articles;
  }

  likeArticle(article){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();
    console.log("I call him");
    this.feedProvider.likeArticle(article.ID_article,localStorage.getItem('ID_user')).subscribe(response => {
      if(response.ok){
        article.liked = 1;
        article.likes = Number(article.likes) + 1 * 1;
      }
      loading.dismiss();
    });
  }

  dislikeArticle(article){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();
    this.feedProvider.dislikeArticle(article.ID_article,localStorage.getItem('ID_user')).subscribe(response => {
      if(response.ok){
        article.liked = 0;
        article.likes -= 1;
      }
      loading.dismiss();
    });
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
