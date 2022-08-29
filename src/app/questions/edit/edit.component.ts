import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

import {Question} from "../../shared/interfaces/question.interface";
import {LocalStorageService} from "../../shared/services/local-storage.service";
import {AnswerChoiceOptions} from "../create/constants/create.model";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  public typesOfQuestion = AnswerChoiceOptions;
  public id = this.route.snapshot.paramMap.get('id') || 0;
  public question!: Question;

  public form = this.fb.group({
    types: [0, Validators.required],
    questionText: ['', Validators.required],
    options: this.fb.array([])
  })

  public get options(){
    return this.form.controls['options'] as FormArray;
  }

  public get types(){
    return this.form.controls['types'].value;
  }

  public constructor(
      private fb: FormBuilder,
      private route: ActivatedRoute,
      private service: LocalStorageService,
      private router: Router,
  ) { }

  public ngOnInit(): void {
    if (this.id !== null) {
      this.question = this.service.getQuestion(+this.id);
      this.form.controls['questionText'].setValue(this.question.question);
      this.form.controls['types'].setValue(this.question.choice);
      const questions = this.question.answerOptions.map((d: any) => ({optionText: d.answer, isAnswer: d.isValid}))

      questions.forEach(d => {
        const optionForm = this.fb.group({
          optionText:[d.optionText,Validators.required],
          isAnswer:[d.isAnswer,Validators.required]
        })
        this.options.push(optionForm)
      })
    }
  }

  public addOption(): void {
    const optionForm = this.fb.group({
      optionText:['',Validators.required],
      isAnswer:[false,Validators.required]
    })

    this.options.push(optionForm)
  }

  public deleteOption(index: number): void {
    this.options.removeAt(index);
  }

  public editQuestion(): void {
    const {questionText, options} = this.form.value;

    const question: Question = {
      ...this.question,
      isAnswered: false,
      question: <string>questionText,
      editedAt: (new Date()).toUTCString(),
      answerOptions: options?.map((d: any) => { return {answer: d.optionText, isValid: d.isAnswer} })
    }
    this.service.updateQuestion(+this.id, question);
    this.router.navigate(['../'])
  }

  public checkValidForm(): boolean {
    const optionLength = this.form.controls['options'].value;
    switch (this.form.controls['types'].value) {
      case 0:
        return optionLength.length <= 1 && this.form.controls['questionText'].value.length;
      case 1:
        return optionLength.length <= 1 && this.form.controls['questionText'].value.length;
      case 2:
        return !this.form.controls['questionText'].value.length;
      default:
        return false;
    }

  }

}
