import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ExtractiveAnswer } from '../models/answer.model';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  private anserUrl = environment.apiUrl.answer;

  constructor(private http: HttpClient) { }

  extractAnswer(question: string, passage: string, language: string): Observable<ExtractiveAnswer[]>{
    let body = {
      "question": question,
      "passage": passage,
      "language": language,
    }
    return this.http.post<ExtractiveAnswer[]>(this.anserUrl, body).pipe(catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse){
    return throwError(`An error occurred: ${err}`);
  }
}
