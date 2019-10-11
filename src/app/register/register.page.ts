import { Component, OnInit } from '@angular/core';
import { QuizzService } from '../Service/quizz.service';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
name
surname
physicaladdress
email
password

  constructor(public quizService:QuizzService, public alertController: AlertController,public toastController: ToastController, public router:Router ) { }

  ngOnInit() {
  }
register(){
  this.quizService.Signup(this.email,this.password,this.name, this.surname, this.physicaladdress).then(data=>{
    console.log(data);
    if(data.operationType == "signIn"){
      this.router.navigate(['/login'])
      this.presentToast();
    }else{
      this.presentAlert(data);
    }
   })
  }

  async presentAlert(data){
    const alert = await this.alertController.create({
      header:'Alert',
      message:data,
      buttons:['OK']
    });
    await alert.present();
  }

  async presentToast(){
    const toast= await this.toastController.create({
      message:'your settings have been saved',
      duration:8000,
      color:"primary",
      position:"middle"

    });
    toast.present();
  }

}
