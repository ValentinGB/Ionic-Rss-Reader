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
  searchPlaceHolder : string = "Ingresa palabras de busqueda";
  searchBarState : string = 'hidden';
  public articles: FeedArticle[];
  pulled : boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private alertCtrl : AlertController,
    private feedProvider : FeedProvider
  ) {}

  doRefresh(refresher) {
    setTimeout(() => {
      this.search((articles) => {
        this.pulled = true;
        this.articles = articles;
        refresher.complete();
      });
    }, 2000);
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
    console.log('ionViewDidLoad NewsPage');
  }

}
