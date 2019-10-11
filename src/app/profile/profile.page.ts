import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { QuizzService } from '../Service/quizz.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
currentImage
userID
users
ID
used
  constructor(private camera:Camera,public quizService:QuizzService,private router:Router )
   {
this.used =this.quizService.UserInfo();


console.log(this.used);

firebase.auth().onAuthStateChanged((user)=>{
if(user)
{
  this.ID= user.uid
  console.log(this.ID)
}else{
  this.router.navigate(['/login']);
}
});
   }
takePicture(){
  const options:CameraOptions={
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }
  this.camera.getPicture(options).then((imageData) => {
    // imageData is either a base64 encoded string or a file URI
    // If it's base64 (DATA_URL):
  this.currentImage = 'data:image/jpeg;base64,' + imageData;
}
, (err) => {
  // Handle error
 });
}
logout(){
  this.quizService.Signout()
    }
  ngOnInit() {
  }

}
