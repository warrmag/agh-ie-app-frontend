import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo, TodoElement } from '@agh-app/model';
import { TodoService } from '@agh-app/service';

@Component({
  selector: 'agh-app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {
  @Input()
  todo: Todo;

  @Output()
  cardDeleted: EventEmitter<boolean> = new EventEmitter();

  constructor(private todoService: TodoService) { }

  removeTodo() {
    this.todoService.removeTodo(this.todo).subscribe(
      () => {
        this.cardDeleted.emit(true);
      }
    );
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
      }).subscribe((data: TodoElement) => { this.todo.elements.push(data) });

      event.target.value = '';
    }
  }

  removeElement(element: TodoElement) {
    let elementIndex = this.getTodoElementIndex(this.todo, element);

    this.todoService.removeTodoElement(this.todo, element).subscribe(
      () => this.todo.elements.splice(elementIndex, 1)
    );
  }

  updateElement(event, element: TodoElement) {
    element.done = event.checked;

    this.todoService.updateTodoElement(this.todo, element);
  }


  private getTodoElementIndex(todo: Todo, element: TodoElement) {
    return this.todo.elements.findIndex((todoElement: TodoElement) => todoElement.id === element.id);
  }


}
