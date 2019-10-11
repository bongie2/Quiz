import { Component, OnInit, asNativeElements } from '@angular/core';
import * as firebase from 'firebase';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Key } from 'protractor';
import { QuizzService } from '../Service/quizz.service';
import { maybeQueueResolutionOfComponentResources } from '@angular/core/src/metadata/resource_loading';
import { unescapeIdentifier } from '@angular/compiler';
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss'],
})
export class QuizPage implements OnInit {
Questions=[]
Options=[]
ID; 
Answers
question;
answer;
Ans;
Question;
CorrectAnswer = [];
Answered=[]
UID
Unique_ID
  constructor(public quizService:QuizzService) { 
    this.ID=this.quizService.returnID();
    this.Questions=this.quizService.getQuiz(this.ID);
    this.UID = this.quizService.getUID();
    this.Unique_ID = this.quizService.getUnique_ID()
    
     }
     
SetData(event,quiz){
  this.Ans=event.detail.value;
  // console.log(this.Ans)
  this.Question= quiz.Question;
  //this.CorrectAns;
  //console.log(this.CorrectAns)
  let index;
  let newIndex;
  let madeIndex;
  let check = false;
 
  if(this.Answered.length == 0){
    this.Answered.push({
      Question:this.Question,
      Answer:this.Ans,
      CorrectAnswer:"",
      Score:false
    })
    for(var x=0; x<this.Questions.length;x++){
      for(var y =0;y<this.Questions[x].value.length;y++){
        if(this.Questions[x].value[y]==true){
          index =this.Questions[x].value.indexOf(this.Questions[x].value[y])
          newIndex=this.Questions[x].option[index];
        this.CorrectAnswer.push(newIndex);
        }
      }
    }

    this.Answered[0].CorrectAnswer=this.CorrectAnswer[this.Answered[0].Question.indexOf(this.Question)]
    for(var z=0;z<this.Answered.length;z++){
      if(this.Answered[z].Answer===this.Answered[z].CorrectAnswer){
        this.Answered[z].Score=true;
      }else{
      }
    }
   console.log(this.Answered)
}else{
    let exists=false;
    for(var i=0;i<this.Answered.length;i++){
      if(this.Answered[i].Question==this.Question){
        // console.log("true")
        this.Answered[i].Answer=this.Ans;
        // console.log(this.Answered)
        exists=true;
        }else{
        }
        
        if(this.Answered[i].Answer===this.Answered[i].CorrectAnswer){
          this.Answered[i].Score=true;
        }else{
          this.Answered[i].Score=false;
        }
    }
    let findIndex=this.Questions.find(x=>x.Question===this.Question);
    let myIndex=this.Questions.indexOf(findIndex);
  if(exists==false){
      this.Answered.push({
        Question:this.Question,
        Answer:this.Ans,
        CorrectAnswer:this.CorrectAnswer[myIndex],
        Score:false
      })

      for(var a=1;a<this.Answered.length;a++){
        if(this.Answered[a].Answer===this.Answered[a].CorrectAnswer){
          this.Answered[a].Score=true;
        }
      }
      //console.log(this.Answered)
    } 
    // console.log(this.Answered);   
    }

    console.log(this.Answered);
    
   }


  submit(){
    this.quizService.SubmitData(this.Answered,this.UID,this.ID,this.Unique_ID)
  }

  getQuiz(key){
    this.quizService.setMe(key);  
  }

  getAnswer(key){
    this.quizService.setMe(key); 
  }

  ngOnInit() {
  }

}
