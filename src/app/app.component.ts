import { Component } from '@angular/core';
import { TodoService } from './@core/data/todo.service';
import { Todo } from '@agh-app/model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private todoService: TodoService) { }

  todos: Todo[] = [];

  ngOnInit() {
    this.todoService.getAllTodo().subscribe(
      (todos: Todo[]) => {
        this.todos = todos;
      }
    )
  }

  addNewTodo() {
    this.todoService.addTodo({
      id: undefined,
      title: '',
      elements: []
    }).subscribe()
  }
}
