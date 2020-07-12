import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Message } from '../models/message';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://localhost:3000/api/v1/messages';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }

  getMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(apiUrl)
      .pipe(
        tap(Message => console.log('fetched Messages')),
        catchError(this.handleError('getMessages', []))
      );
  }
  
  getMessage(id: any): Observable<Message> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Message>(url).pipe(
      tap(_ => console.log(`fetched Message id=${id}`)),
      catchError(this.handleError<Message>(`getMessage id=${id}`))
    );
  }
  
  addMessage(Message: Message): Observable<Message> {
    return this.http.post<Message>(apiUrl, Message, httpOptions).pipe(
      tap((prod: Message) => console.log(`added Message w/ id=${prod.id}`)),
      catchError(this.handleError<Message>('addMessage'))
    );
  }
  
  updateMessage(id: any, Message: any): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, Message, httpOptions).pipe(
      tap(_ => console.log(`updated Message id=${id}`)),
      catchError(this.handleError<any>('updateMessage'))
    );
  }
  
  deleteMessage(id: any): Observable<Message> {
    const url = `${apiUrl}/${id}`;
  
    return this.http.delete<Message>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted Message id=${id}`)),
      catchError(this.handleError<Message>('deleteMessage'))
    );
  }
}
