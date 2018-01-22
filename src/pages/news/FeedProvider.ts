import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
 
export class FeedArticle {
  ID_article: number;
  description: string;
  link: string;
  title: string;
  image : string;
  date : string;
  likes : number;
  liked : number;

  constructor(
      ID_article: number,description: string, 
      link: string, title: string, 
      image : string, date : string,
      likes: number, liked: number
    ) {
    this.ID_article = ID_article;
    this.description = description;
    this.link = link;
    this.title = title;
    this.image = image;
    this.date = date;
    this.likes = likes;
    this.liked = liked;
  }
}
 
export class Feed {
  title: string;
  url: string;
 
  constructor(title: string, url: string) {
    this.title = title;
    this.url = url;
  }
}
 
@Injectable()
export class FeedProvider {
 
  constructor(private http: Http, public storage: Storage) {}

  public likeArticle(ID_article, ID_user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    let options = new RequestOptions({headers:headers});

    let body = {FK_ID_article:ID_article, FK_ID_user: ID_user};
    console.log("they called me");
    return this.http.post('http://localhost:3000/feeds/like', body, options).map(data => data.json());
  }

  public dislikeArticle(ID_article, ID_user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    let options = new RequestOptions({headers:headers});

    let body = {FK_ID_article:ID_article, FK_ID_user: ID_user};

    return this.http.post('http://localhost:3000/feeds/dislike', body, options).map(data => data.json());
  }

  public getArticlesForUrl(feedUrl: string) {
    let articles = [];

    let ID_user = (localStorage.getItem('ID_user') !== undefined && localStorage.getItem('ID_user') !== null)
      ? '/'+localStorage.getItem('ID_user')
      : '/'+0;

    return this.http.get('http://localhost:3000/feeds/getFeed'+ID_user)//Route where the backend is
    .map(data => data.json())
    .map((res) => {
      if (res == null) {
        return articles;
      }

      let objects = res;
      var length = 20;

      for (let i = 0; i < objects.length; i++) {

        let item = objects[i];
        if(item.description != null){
          var trimmedDescription = item.description.length > length ?
          item.description.substring(0, 80) + "..." :
          item.description;
        } else {
          item.description = 'No description available...';
        }

        let date = item.date.split("T")[0];
        let liked = (item.liked !== null && item.liked !== undefined) ? item.liked : 0;

        let newFeedArticle = new FeedArticle(
            item.ID_article, trimmedDescription, 
            item.link, item.title, item.image, 
            date, item.likes, liked);

        articles.push(newFeedArticle);
      }
      return articles
    });
  }
}