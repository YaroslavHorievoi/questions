import { Component, OnInit } from '@angular/core';

import {LocalStorageService} from "../../shared/services/local-storage.service";
import {Question} from "../../shared/interfaces/question.interface";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  public constructor(private service: LocalStorageService) {}

  public answers: string[] = ['Single choice', 'Multiply choice', 'Open'];
  public questions = this.service.getAllQuestions();
  public unanswered: Question[] = [];
  public answered: Question[] = [];

  public ngOnInit(): void {
    this.updateList();
  }

  public handleAnswer(event: {id: number, isAnswered: boolean, answers: string[]}): void {
    const question = this.questions.find(d => d.id === event.id);
    if (question) {
      this.service.updateQuestion(event.id, {...question, isAnswered: event.isAnswered, answer: event.answers, answeredAt: (new Date()).toISOString()})
    }
    this.updateList();
  }

  public updateList(): void {
    this.questions = this.service.getAllQuestions();

    this.answered = this.questions
        .filter(d => d.isAnswered)
        .slice()
        .sort((a: Question, b: Question) => +(a.answeredAt ?? 0) - +(b.answeredAt ?? 0));
    this.unanswered = this.questions.filter(d => !d.isAnswered);
  }

}
