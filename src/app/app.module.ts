import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { NewsPage } from '../pages/news/news';
import { FeedProvider } from '../pages/news/FeedProvider';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { PipesModule } from '../pipes/pipes.module';

import { ArticleComponent } from '../components/article/article';

@NgModule({
  declarations: [
    MyApp, HomePage, NewsPage, ArticleComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, HttpModule, IonicStorageModule, 
    PipesModule,
    IonicModule.forRoot(MyApp), IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp, HomePage, NewsPage, ArticleComponent
  ],
  providers: [
    StatusBar, SplashScreen, InAppBrowser, FeedProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
