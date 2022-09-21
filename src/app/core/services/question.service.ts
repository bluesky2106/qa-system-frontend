import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Document } from '../models/document.model';
import { Answer } from '../models/answer.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private questionUrl = environment.apiUrl.question;

  constructor(private http: HttpClient) { }

  answerQuestion(question: string, language: string): Observable<Answer[]>{
    let body = {
      "question": question,
      "language": language,
    }
    return this.http.post<Answer[]>(this.questionUrl, body).pipe(catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse){
    return throwError(`An error occurred: ${err}`);
  }
}
