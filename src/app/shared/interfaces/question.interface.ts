import {AnswerChoice} from "../../questions/create/constants/create.model";

export interface Question {
  id: number;
  question: string;
  choice: AnswerChoice;
  createdAt: string;
  editedAt?: string;
  answeredAt?: string;
  isAnswered: boolean;
  answerOptions: IAnswerOption[];
  answer?: string[];
}

export interface IAnswerOption {
  answer: string;
  isValid: boolean;
}
