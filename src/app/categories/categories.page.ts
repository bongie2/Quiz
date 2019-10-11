import { Component, OnInit } from '@angular/core';
import {QuizzService} from '../Service/quizz.service';
import * as firebase from 'firebase';
import { Key } from 'protractor';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  name;
  Category_key
  category = [];
  Question;
  Answers = [];
  cat_key;
  Categories
  constructor(public quizService:QuizzService, public loadingCtrl:LoadingController) {
    //this.category = this.quizService.getCat();   
  }

  ngOnInit() {
    console.log("sas");
    this.loadData()
  }

  async loadData() {
    const loader = await this.loadingCtrl.create({
      message:'loading categories......'
    })
    await loader.present()
    this.quizService.Categories().then(categories =>{
      this.Question = categories
      // console.log(categories);
      loader.dismiss()
    });
  }
  
  getQuiz(key){
    this.quizService.setMe(key);
  }
  
  setName(name) {
    this.quizService.getName(name);
  }

  setID(id){
    this.quizService.getID(id);
  }
  logout(){
    this.quizService.Signout()
      }
}
