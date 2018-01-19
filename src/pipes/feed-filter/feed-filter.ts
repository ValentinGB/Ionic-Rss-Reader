import { Pipe, PipeTransform } from '@angular/core';
import { FeedArticle } from '../../pages/news/FeedProvider';
import 'rxjs/add/operator/filter';

@Pipe({
 name: 'feedFilter'
})
export class FeedFilterPipe implements PipeTransform{

 transform(articles:FeedArticle[], filter:string) : any {
   if(filter === undefined || filter == "") return articles;

   return articles.filter((article)=>{
    return article.title.toLowerCase().includes(filter.toLowerCase());
   });
 }

}