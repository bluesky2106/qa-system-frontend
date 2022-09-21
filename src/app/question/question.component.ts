import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { Answer } from '../core/models/answer.model';
import { QuestionService } from '../core/services/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  questionControl = new FormControl('', [
    Validators.required,
    Validators.nullValidator,
  ]);
  languageControl = new FormControl('', [
    Validators.required,
    Validators.nullValidator,
  ]);

  questions = this._formBuilder.group({
    questionControl: this.questionControl,
    languageControl: this.languageControl,
  });
  answers: Answer[] = []
  
  constructor(
    private _formBuilder: FormBuilder,
    private questionService: QuestionService
  ) { }

  ngOnInit(): void {
    this.languageControl.setValue('English');
  }

  onSubmit(): void {
    this.answers = [];
    this.questionService.answerQuestion(this.questionControl.value, this.languageControl.value)
      .subscribe({next: data => this.answers = data})
  }
}
