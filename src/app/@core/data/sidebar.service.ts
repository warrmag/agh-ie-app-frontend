import { Inject, Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';
import { map, distinctUntilChanged, catchError, concatMap } from 'rxjs/operators';
import { SidebarServiceInterface } from './sidebar-service.interface';
import { Category } from '@agh-app/model';
import { Todo } from '@agh-app/model';
import { TodoService } from './todo.service';
import { PromiseType } from 'protractor/built/plugins';


@Injectable()
export class SidebarService implements SidebarServiceInterface {
  private currentCategorySubject = new BehaviorSubject({
    id: 'all'
  } as Category);

  public currentCategory = this.currentCategorySubject.asObservable().pipe(distinctUntilChanged());

  constructor(@Inject(ApiService) private apiService: ApiService, private todoService: TodoService) { }

  public getCategory(category: Category): Observable<Category> {
    return this.apiService.get('/categories/' + category.id).pipe(map(data => data));
  }

  public getAllCategories(): Observable<Category[]> {
    return this.apiService.get('/categories').pipe(map(data => data));
  }

  public setCurrentCategory(category: Category): Observable<Category> {
    this.currentCategorySubject.next(category);
    return this.currentCategory;
  }

  public getCardsByCategory(): Observable<Todo[]> {
    return this.currentCategory.pipe(
      concatMap((category: Category) => {
        if (category.id === 'all') {
          return this.todoService.getAllTodo().pipe(map(data => data));
        } else {
          return this.getCategory(category).pipe(map(data => data.card_list));
        }
      }
      )
    )
  }

  public addCartToCategory(card: Todo, category: Category): Observable<Todo> {
    return this.apiService.post('/categories/' + category.id + '/cards', card).pipe(map(data => data));
  }
}

