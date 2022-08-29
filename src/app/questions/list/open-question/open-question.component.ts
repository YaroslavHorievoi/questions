import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Question } from 'src/app/shared/interfaces/question.interface';

@Component({
  selector: 'open-question',
  templateUrl: './open-question.component.html',
  styleUrls: ['./open-question.component.css']
})
export class OpenQuestion implements OnInit {
  @Input() question!: Question;
  @Output() answer = new EventEmitter<{id: number, isAnswered: boolean, answers: string[]}>();
  public form!: FormGroup;
  public answers: string[] = [];
  public givenAnswer = '';

  public constructor(private fb: FormBuilder) {}

  public ngOnInit(): void {
    this.answers = this.question.answerOptions.map(d => d.answer);
    if (!this.question.isAnswered) {
      this.form = this.fb.group({
        answer: ['', [Validators.required, Validators.minLength(0), Validators.maxLength(255)]]
      })
    }
  }

  public submit(isAnswered: boolean = true): void {
    if (isAnswered) {
      this.answer.emit({id: this.question.id, isAnswered, answers: [this.form.controls['answer'].value]});
    } else {
      this.answer.emit({id: this.question.id, isAnswered, answers: []})
    }
  }
}
