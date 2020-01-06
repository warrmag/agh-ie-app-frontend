import {Inject, Injectable} from '@angular/core';
import { Todo, TodoElement } from '@agh-app/model';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { TodoServiceInterface } from './todo-service.interface';


@Injectable()
export class TodoService implements TodoServiceInterface {
    constructor(@Inject(ApiService) private apiService: ApiService) { }

    public addTodo(todo: Todo): Observable<Todo> {
        return this.apiService.post('/cards', todo).pipe(map(data => data));
    }

    public getTodo(todo: Todo): Observable<Todo> {
        return this.apiService.get('/cards/' + todo.id).pipe(map(data => data));
    }

    public updateTodo(todo: Todo): Observable<Todo> {
        return this.apiService.put('/cards/' + todo.id, todo).pipe(map(data => data));
    }

    public removeTodo(todo: Todo): Observable<boolean> {
        return this.apiService.delete('/cards/' + todo.id).pipe(map(data => data));
    }

    public getAllTodo(): Observable<Todo[]> {
        return this.apiService.get('/cards').pipe(map(data => data));
    }

    public addTodoElement(todo: Todo, element: TodoElement): Observable<TodoElement> {
        return this.apiService.post('/cards/' + todo.id + '/tasks', element).pipe(map(data => data));
    }

    public removeTodoElement(todo: Todo, element: TodoElement): Observable<boolean> {
        return this.apiService.delete('/tasks/' + element.id).pipe(map(data => data));
    }

    public updateTodoElement(todo: Todo, element: TodoElement): Observable<Todo> {
        return this.apiService.put('/cards/' + todo.id + '/tasks/' + element.id, element).pipe(map(data => data));
    }
}
