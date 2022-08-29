import { Component, OnInit } from '@angular/core';

import {Question} from "../../shared/interfaces/question.interface";
import {LocalStorageService} from "../../shared/services/local-storage.service";
import {AnswerChoice, AnswerChoiceOptions} from "../create/constants/create.model";

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {
  public questions!: Question[];
  public constructor(private questionsService:LocalStorageService) { }

  public ngOnInit(){
    this.questions = this.questionsService.getAllQuestions();
  }

  public deleteQuestion(index: number) {
    this.questionsService.deleteQuestion(index);
    this.questions = this.questionsService.getAllQuestions();
  }

  public getQuestionType(type: AnswerChoice): string {
    return AnswerChoiceOptions.get(type) || '';
  }

}
