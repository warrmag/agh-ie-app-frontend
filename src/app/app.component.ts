import { Component } from '@angular/core';
import { Todo } from '@agh-app/model';
import { SidebarService, TodoService } from '@agh-app/service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private sidebarService: SidebarService, private todoService: TodoService) { }

  todos: Todo[] = [];

  sidenavOpened: boolean = false;

  ngOnInit() {
    this.sidebarService.getCardsByCategory().subscribe(
      (todos: Todo[]) => {
        this.todos = todos;
      }
    );
  }

  addNewTodo() {
    this.todoService.addTodo({
      id: undefined,
      title: '',
      elements: []
    }).subscribe();
  }

  toggleSidenav() {
    console.log(this.sidenavOpened);
    this.sidenavOpened = !this.sidenavOpened;
  }
}
