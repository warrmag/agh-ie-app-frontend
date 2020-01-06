import { Component, OnInit, Input } from '@angular/core';
import { Todo, TodoElement } from '@agh-app/model';
import { TodoService } from '@agh-app/service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'agh-app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  @Input()
  todo: Todo;

  constructor(private todoService: TodoService) { }

  ngOnInit() {
  }

  removeTodo() {
    this.todoService.removeTodo(this.todo).subscribe();
  }

  updateTodo() {
    this.todoService.updateTodo(this.todo).subscribe();
  }

  addElement(event) {
    console.log(event.keyCode, event.target.value);
    if (event.keyCode === 13 && event.target.value.length > 1) {

      this.todoService.addTodoElement(this.todo, {
        id: undefined,
        title: event.target.value,
        done: false
      }).subscribe(data => this.todo.elements.push(data)); // Sewo pokaż jak naprawić żeby linter nie wkurwiał

      event.target.value = '';
    }
  }

  removeElement(element: TodoElement) {
    // let elementIndex = this.getTodoElementIndex(this.todo, element);

    // this.todoService.removeTodoElement(this.todo, element).subscribe(
    //   _ => this.todo.elements.splice(elementIndex, 1)
    // );
  }

  updateElement(event, element: TodoElement) {
    element.done = event.checked;

    this.todoService.updateTodoElement(this.todo, element);
  }


  private getTodoElementIndex(todo: Todo, element: TodoElement) {

    return this.todo.elements.find((todoElement: TodoElement) => todoElement.id === element.id);
  }
}
