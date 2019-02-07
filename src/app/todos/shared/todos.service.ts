import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Todo } from './todo';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor(private http: HttpClient) {

  }

  /** GET heroes from the server */
  public getAll(): Observable<Todo[]> {
    return this.http.get<Todo[]>(environment.url_todos);
  }

  public get(id: string): Observable<Todo> {
    return this.http.get<Todo>(environment.url_todos);
  }

  public update(todo: Todo): Observable<any> {
    return this.http.put(environment.url_todos, todo, httpOptions);
  }

  public add(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(environment.url_todos, todo, httpOptions);
  }

  public delete(todo: Todo | string): Observable<Todo> {
    const id = typeof todo === 'string' ? todo : todo.id;
    const url = `${environment.url_todos}${id}`;

    return this.http.delete<Todo>(url, httpOptions);
  }
}
