import { Todo } from '@agh-app/model';
import { Observable } from 'rxjs';

export interface TodoServiceInterface {
    addTodo(todo: Todo): Observable<Todo>
    getTodo(todo: Todo): Observable<Todo>
    updateTodo(todo: Todo): Observable<Todo>
    removeTodo(todo: Todo): Observable<boolean>
}