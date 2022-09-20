import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentComponent } from './document/document.component';
import { QuestionComponent } from './question/question.component';
import { AnswerComponent } from './answer/answer.component';

const routes: Routes = [
  { path: 'document', component: DocumentComponent },
  { path: 'question', component: QuestionComponent },
  { path: 'answer', component: AnswerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
