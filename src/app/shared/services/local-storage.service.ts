import { Injectable } from "@angular/core";

import { Question } from "../interfaces/question.interface";

const QuestionsKey = 'QUESTIONS';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private questions: Question[] = this.parse(localStorage.getItem(QuestionsKey));

  public setQuestionsKey(): void {
    if (this.isNewUser) {
      localStorage.setItem(QuestionsKey, '[]');
    }
  }

  public getQuestion(id: number): Question {
    return this.questions[id];
  }

  public addQuestions(question: Question): void {
    this.questions = [...this.questions].concat(question);
    localStorage.setItem(QuestionsKey, this.stringify(this.questions));    
  }

  updateQuestion(id: number, updatedQuestion: Question): void {
    this.questions[id] = updatedQuestion;
    localStorage.setItem(QuestionsKey, this.stringify(this.questions));
  }

  deleteQuestion(index: number) {
    this.questions = this.questions.filter((_, ind) => ind !== index);
    localStorage.setItem(QuestionsKey, this.stringify(this.questions));
  }

  getAllQuestions(): Question[] {
    return this.parse(localStorage.getItem(QuestionsKey));
  }

  private get isNewUser(): boolean {
    return !this.questions;
  }

  private parse(data: string | null): any {
    return JSON.parse(data as string);
  }

  private stringify(data: any): string {
    return JSON.stringify(data ?? {});
  }
}
