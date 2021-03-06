import { Component, OnInit } from '@angular/core';
import { TodosService } from '../shared/todos.service';
import { Todo } from '../shared/todo';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MessageBusService } from '../shared/message-bus.service';
import { constantes } from '../shared/constantes';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {

  todoForm = this.fb.group({
    action: ['', Validators.required],
    dueDate: ['', Validators.required]
  });

  constructor(
    private todosService: TodosService,
    private fb: FormBuilder,
    private messageBus: MessageBusService) { }

  ngOnInit() {
    this.todoForm.valueChanges.subscribe(data => {
      // Action réalisée à chaque changement
      // console.log(data);
    });
  }

  public doAdd(): void {
    const todoToAdd: Todo = {
      id: null,
      action: this.todoForm.value.action,
      done: false,
      dueDate: new Date(this.todoForm.value.dueDate).getTime()
    };

    this.todosService.add(todoToAdd).subscribe(() => {
      this.messageBus.addMessage(constantes.todoAddedMessage);
      this.todoForm.reset();
    });
  }
}
