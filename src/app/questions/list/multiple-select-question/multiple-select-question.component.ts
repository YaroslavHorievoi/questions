import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Question } from 'src/app/shared/interfaces/question.interface';

@Component({
  selector: 'multiple-select-question',
  templateUrl: './multiple-select-question.component.html',
  styleUrls: ['./multiple-select-question.component.css']
})
export class MultipleSelectQuestion implements OnInit {
  @Input() question!: Question;
  @Output() answer = new EventEmitter<{id: number, isAnswered: boolean, answers: string[]}>();

  public form = this.fb.group({
    options: this.fb.array([])
  })
  public answers: string[] = [];
  public selectedAnswers: string[] = [];

  constructor(
      private fb: FormBuilder,
  ) {}

  public ngOnInit(): void {
    this.answers = this.question.answerOptions.map(d => d.answer);

    const formOptions = this.question.answerOptions.map((d: any) => ({optionText: d.answer, isAnswer: this.question.answer?.includes(d.answer)}))

    formOptions.forEach(d => {
      const optionForm = this.fb.group({
        answer:[d.optionText,Validators.required],
        isAnswer:[d.isAnswer,Validators.required]
      })
      this.options.push(optionForm)
    })

    this.form.valueChanges.subscribe(() => {
      this.selectedAnswers = this.form.controls['options'].value
          .filter((d: any) => d.isAnswer)
          .map((d: any) => d.answer);
    })
  }

  public get options(){
    return this.form.controls['options'] as FormArray;
  }

  public submit(isAnswered: boolean = true): void {
    if (isAnswered) {
      const answers = this.form.controls['options'].value.filter((d: any) => d.isAnswer).map((d: any) => d.answer);
      this.answer.emit({id: this.question.id, isAnswered, answers});
    } else {
      this.answer.emit({id: this.question.id, isAnswered, answers: []});
    }
  }
}
