import { Component, OnInit } from '@angular/core';
import { QuizzService } from '../Service/quizz.service';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
email
password
  constructor(public quizService:QuizzService, public alertCtrl: AlertController,public toastController: ToastController, public router:Router) { }

  ngOnInit() {
  }
  login(){
    this.quizService.Signin(this.email, this.password).then(result=>{
      console.log(result);
      if(result.operationType == "signIn"){
        this.router.navigate(['/categories'])
        this.presentToast();
      }else{
        this.presentAlert(result);
      }
     })
    }
  
    async presentAlert(result){
      const alert = await this.alertCtrl.create({
        header:'Alert',
        message:result,
        buttons:['OK']
      });
      await alert.present();
    }
  
    async presentToast(){
      const toast= await this.toastController.create({
        message:'login successfully....',
        duration:8000,
        color:"primary",
        position:"middle"
  
      });
      toast.present();
    }
  
  async ResetPassword(){
    let alert = await this.alertCtrl.create({
      header: 'reset password',
      inputs: [{
        name: 'Email',
        type: 'email',
        placeholder: 'please enter email'
      }],
      buttons: [{
        text: 'Cancel',
        handler: ()=>{
          console.log('confirm cancel')
        }
      },{
        text: 'Ok',
        handler: (email)=>{
          this.quizService.resetPassword(email.Email)
          console.log('Confirm OK')
        }
      }]
    });
    await alert.present();
  }
}
