import { Component } from '@angular/core';
import { Todo, Category } from '@agh-app/model';
import { SidebarService, TodoService } from '@agh-app/service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private sidebarService: SidebarService, private todoService: TodoService) { }

  todos: Todo[] = [];
  categories: Category[] = [];

  sidenavOpened: boolean = false;

  ngOnInit() {
    this.sidebarService.getCardsByCategory().subscribe(
      (todos: Todo[]) => {
        this.todos = todos;
      }
    );

    this.sidebarService.getAllCategories().subscribe(
      (categories: Category[]) => {
        this.categories = categories;
      }
    )
  }

  addNewTodo(category: Category) {
    this.sidebarService.addCartToCategory({
      id: undefined,
      title: 'No title'
    }, category).subscribe(
      () => {
        this.sidebarService.setCurrentCategory(category)
      }
    );
  }

  toggleSidenav() {
    this.sidenavOpened = !this.sidenavOpened;
  }

  closeSidenav() {
    this.sidenavOpened = false;
  }

  removeCard(card: Todo) {
    this.todos = this.todos.filter(
      todo => todo.id !== card.id
    )
  }
}
