import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Owner } from './../models/Owner'

@Injectable({
  providedIn: 'root',
})
export class OwnerService {

  
  urlJSON = 'http://localhost:3000/owners';

  constructor(public http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  
  create(owner: Owner): Observable<Owner> {
    return this.http.post<Owner>(this.urlJSON, JSON.stringify(owner), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  read(id: number): Observable<Owner> {
    
    return this.http.get<Owner>(this.urlJSON + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  list():Observable<Owner[]>{
    
    return this.http.get<Owner[]>(this.urlJSON)
    .pipe(
      retry(2),
      catchError(this.handleError))
 
  }

  update(owner: Owner): Observable<Owner> {
    return this.http.put<Owner>(this.urlJSON + '/' + owner.id, JSON.stringify(owner), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  
  delete(id:number){
    return this.http.delete<Owner>(this.urlJSON + '/' + id, this.httpOptions)
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


