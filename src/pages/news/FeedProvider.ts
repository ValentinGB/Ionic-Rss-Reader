import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
 
export class FeedArticle {
  description: string;
  link: string;
  title: string;
  image : string;
  date : string;
 
  constructor(description: string, link: string, title: string, image : string, date : string) {
    this.description = description;
    this.link = link;
    this.title = title;
    this.image = image;
    this.date = date;
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

  public getArticlesForUrl(feedUrl: string) {
    let articles = [];

    return this.http.get('https://api.rss2json.com/v1/api.json?rss_url='+feedUrl)
    .map(data => data.json())
    .map((res) => {
      if (res == null) {
        return articles;
      }

      let objects = res['items'];
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

        let date = item.pubDate.split(" ")[0];

        let newFeedArticle = new FeedArticle(trimmedDescription,item.link, item.title, item.enclosure.link, date);
        articles.push(newFeedArticle);
      }
      return articles
    });
  }
}