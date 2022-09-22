import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ExtractiveAnswer } from '../core/models/answer.model';
import { AnswerService } from '../core/services/answer.service';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit {
  questionControl = new FormControl('', [
    Validators.required,
    Validators.nullValidator,
  ]);
  passageControl = new FormControl('', [
    Validators.required,
    Validators.nullValidator,
  ]);
  languageControl = new FormControl('', [
    Validators.required,
    Validators.nullValidator,
  ]);

  qaForm = this._formBuilder.group({
    questionControl: this.questionControl,
    passageControl: this.passageControl,
    languageControl: this.languageControl,
  });
  answer: ExtractiveAnswer = {
    answer: "",
    score: 0
  };

  constructor(
    private _formBuilder: FormBuilder,
    private answerService: AnswerService
  ) { }

  ngOnInit(): void {
    this.languageControl.setValue('English');
  }

  onSubmit(): void {
    this.answer = {
      answer: "",
      score: 0
    };

    this.answerService.extractAnswer(this.questionControl.value, this.passageControl.value, this.languageControl.value)
      .subscribe({next: data => this.answer = data[0]})
  }
}
