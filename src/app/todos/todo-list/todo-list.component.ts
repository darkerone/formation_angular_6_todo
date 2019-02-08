import { Component, OnInit } from '@angular/core';
import { TodosService } from '../shared/todos.service';
import { Todo } from '../shared/todo';
import { Observable, of } from 'rxjs';
import {
  filter, switchMap, merge
} from 'rxjs/operators';
import { MessageBusService } from '../shared/message-bus.service';
import { constantes } from '../shared/constantes';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todos$: Observable<Todo[]>;
  selectedTodo: Todo;

  constructor(
    private todosService: TodosService,
    private messageBus: MessageBusService) {
      messageBus.queue$.subscribe(message => {
        if (message === constantes.todoAddedMessage) {
          this.todos$ = this.todosService.getAll();
        }
      });
  }

  ngOnInit() {
    const obs1 = this.todosService.getAll();
    const obs2 = this.messageBus.queue$.pipe(
      filter(msg => msg === constantes.todoAddedMessage),
      switchMap(_ => this.todosService.getAll())
    );
    this.todos$ = obs1.pipe(merge(obs2));
  }

  public doDelete(todo: Todo): void {
    this.todos$ = this.todosService.delete(todo).pipe(
      switchMap(() => this.todosService.getAll())
    );
  }

  public doUpdate(todo: Todo): void {
    this.todos$ = this.todosService.update(todo).pipe(
      switchMap(() => this.todosService.getAll()));
  }
}
