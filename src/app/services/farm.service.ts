import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Farm } from './../models/Farm'

@Injectable({
  providedIn: 'root',
})
export class FarmService {

  
  urlJSON = 'http://localhost:3000/farms';

  constructor(public http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  
  create(farm: Farm): Observable<Farm> {
    return this.http.post<Farm>(this.urlJSON, JSON.stringify(farm), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  read(id: number): Observable<Farm> {
    
    return this.http.get<Farm>(this.urlJSON + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  list():Observable<Farm[]>{
    
    return this.http.get<Farm[]>(this.urlJSON)
    .pipe(
      retry(2),
      catchError(this.handleError))
 
  }

  update(farm: Farm): Observable<Farm> {
    return this.http.put<Farm>(this.urlJSON + '/' + farm.id, JSON.stringify(farm), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  
  delete(id:number){
    return this.http.delete<Farm>(this.urlJSON + '/' + id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
 }


  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };


  
}


