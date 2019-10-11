import { Component, OnInit } from '@angular/core';
import { database } from 'firebase';
import { QuizzService } from '../Service/quizz.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
})
export class ResultsPage implements OnInit {
Results
Questions
  constructor(public quizService:QuizzService) {
    //this.Results = this.quizService.getResults(event,this.Questions)
   }

  ngOnInit() {
  }

}
