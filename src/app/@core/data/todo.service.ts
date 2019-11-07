import { Injectable } from "@angular/core";
import { Todo } from '@agh-app/model';
import { Observable } from 'rxjs';
import { ApiService } from '@agh-app/service';
import { map } from 'rxjs/operators';
import { TodoServiceInterface } from './todo-service.interface';


@Injectable()
export class TodoService implements TodoServiceInterface {
    constructor(private apiService: ApiService) { }

    public addTodo(todo: Todo): Observable<Todo> {
        return this.apiService.post('/todo', todo).pipe(map(data => data));
    }

    public getTodo(todo: Todo): Observable<Todo> {
        return this.apiService.get('/todo/' + todo.id).pipe(map(data => data));
    }

    public updateTodo(todo: Todo): Observable<Todo> {
        return this.apiService.put('/todo/' + todo.id).pipe(map(data => data));
    }

    public removeTodo(todo: Todo): Observable<boolean> {
        return this.apiService.delete('/todo/' + todo.id).pipe(map(data => data));
    }
}