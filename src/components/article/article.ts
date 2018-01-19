import { Component, Input } from '@angular/core';
import { FeedArticle } from '../../pages/news/FeedProvider';

@Component({
  selector: 'article-component',
  templateUrl: 'article.html'
})
export class ArticleComponent {
  @Input() public myArticle : FeedArticle;
  text: string;

  constructor() {}
}
