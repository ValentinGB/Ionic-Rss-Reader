import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { NewsPage } from '../pages/news/news';
import { ProfilePage } from '../pages/profile/profile';
import { FeedProvider } from '../pages/news/FeedProvider';

import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { PipesModule } from '../pipes/pipes.module';
import { FacebookModule } from 'ngx-facebook';

import { ArticleComponent } from '../components/article/article';
import { FacebookProvider } from '../providers/facebook/facebook';
import { UserProvider } from '../providers/user/user';

@NgModule({
  declarations: [
    MyApp, HomePage, NewsPage, ArticleComponent, ProfilePage
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, HttpModule, IonicStorageModule, 
    PipesModule, HttpClientModule, FacebookModule.forRoot(),
    IonicModule.forRoot(MyApp), IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp, HomePage, NewsPage, ArticleComponent, ProfilePage
  ],
  providers: [
    StatusBar, SplashScreen, InAppBrowser, FeedProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FacebookProvider,
    UserProvider
  ]
})
export class AppModule {}
