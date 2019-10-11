import { Component } from '@angular/core';
import { QuizzService } from '../Service/quizz.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  name;Category_key
  category = [];
  Question=[];
  Answers = [];

  constructor(public quizService:QuizzService) {
    
    // var data = firebase.database().ref().child("Categories")
    // data.on("child_added",snap => {
    //   this.name = snap.child("CatName").val();
    //   this.category.push({
    //     Categories: this.name,
    //    // Category_key: Key
    //   })
    // })
  }

  ngOnInit() {
  }
  getCat(key){
    this.quizService.setMe(key);
  }
  
  logout(){
this.quizService.Signout()
  }
}
