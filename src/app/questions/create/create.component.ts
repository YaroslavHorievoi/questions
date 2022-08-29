import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";

import {AnswerChoiceOptions} from "./constants/create.model";
import {Question} from "../../shared/interfaces/question.interface";
import {LocalStorageService} from "../../shared/services/local-storage.service";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  public typesOfQuestion = AnswerChoiceOptions;
  public questionForm: FormGroup = this.fb.group({
    types: [null, Validators.required],
    questionText: ['', Validators.required],
    options: this.fb.array([])
  })

  public get options(){
    return this.questionForm.controls['options'] as FormArray;
  }

  public get types(){
    return this.questionForm.controls['types'].value;
  }

  public constructor(
      private fb: FormBuilder,
      private service: LocalStorageService,
      private router: Router,
  ) { }

  public ngOnInit(): void {
  }

  public addOption(): void {
    const optionForm = this.fb.group({
      text:['',Validators.required],
      isAnswer:[false,Validators.required]
    })

    this.options.push(optionForm)
  }

  public deleteOption(index: number): void {
    this.options.removeAt(index);
  }

  public createQuestion(): void {
    const {questionText, types, options} = this.questionForm.value;

    const question: Question = {
      id: this.service.getAllQuestions()?.length || 0,
      isAnswered: false,
      question: <string>questionText,
      choice: types,
      createdAt: (new Date()).toUTCString(),
      answerOptions: options?.map((d: any) => { return {answer: d.text, isValid: d.isAnswer} })
    }
    this.service.addQuestions(question);
    this.router.navigate(['../'])
  }

  public checkValidForm(): boolean {
    const optionLength = this.questionForm.controls['options'].value;
    switch (this.questionForm.controls['types'].value) {
      case 0:
      case 1:
        return optionLength.length <= 1 && this.questionForm.controls['questionText'].value.length;
      case 2:
        return !this.questionForm.controls['questionText'].value.length;
      default:
        return false;
    }

  }
}
