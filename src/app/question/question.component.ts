import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  // floatLabelControl = new FormControl('auto' as FloatLabelType);
  options = this._formBuilder.group({
    // floatLabel: this.floatLabelControl,
  });
  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }
}
