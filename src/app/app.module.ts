import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import * as firebase from 'firebase'
var firebaseConfig = {
  apiKey: "AIzaSyC-Tsn0nMA-f4-GrwGloA2uL0tYRxVj8ug",
  authDomain: "quizzapp-a701b.firebaseapp.com",
  databaseURL: "https://quizzapp-a701b.firebaseio.com",
  projectId: "quizzapp-a701b",
  storageBucket: "",
  messagingSenderId: "177919007713",
  appId: "1:177919007713:web:471aad5d4923627a"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    Camera,
       SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
