import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Question } from 'src/app/shared/interfaces/question.interface';

@Component({
  selector: 'single-select-question',
  templateUrl: './single-select-question.component.html',
  styleUrls: ['./single-select-question.component.css']
})
export class SingleSelectQuestion implements OnInit {
  @Input() question!: Question;
  @Output() answer = new EventEmitter<{id: number, isAnswered: boolean, answers: string[]}>();
  public answers: string[] = [];
  public givenAnswer = '';

  public ngOnInit(): void {
    this.answers = this.question.answerOptions.map(d => d.answer);
    if (this.question.isAnswered && this.question.answer?.[0]) {
      this.givenAnswer = this.question.answer?.[0];
    }
  }

  public submit(isAnswered: boolean = true): void {
    if (isAnswered) {
      this.answer.emit({id: this.question.id, isAnswered, answers: [this.givenAnswer]});
    } else {
      this.answer.emit({id: this.question.id, isAnswered, answers: []});
    }
  }
}
