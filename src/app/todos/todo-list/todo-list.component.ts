import { Component, OnInit } from '@angular/core';
import { TodosService } from '../shared/todos.service';
import { Todo } from '../shared/todo';
import { Observable, of } from 'rxjs';
import {
  filter, switchMap
} from 'rxjs/operators';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todos$: Observable<Todo[]>;
  selectedTodo: Todo;

  constructor(private todosService: TodosService) {
  }

  ngOnInit() {
    this.todos$ = this.todosService.getAll();
  }

  public doDelete(todo: Todo): void {
    this.todos$ = this.todosService.delete(todo).pipe(
      switchMap(() => this.todosService.getAll())
    );
  }

  public doUpdate(todo: Todo): void {
    this.todosService.update(todo).subscribe(() => {
      this.todos$ = this.todosService.getAll();
    });
  }
}
