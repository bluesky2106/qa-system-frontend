import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Document } from '../models/document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private documentUrl = environment.apiUrl.document;

  constructor(private http: HttpClient) { }

  getAllDocuments(): Observable<Document[]>{
    return this.http.get<Document[]>(this.documentUrl).pipe(catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse){
    return throwError(`An error occurred: ${err}`);
  }
}
