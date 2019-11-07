import { Todo, TodoElement } from '@agh-app/model';
import { Observable } from 'rxjs';

export interface TodoServiceInterface {
    addTodo(todo: Todo): Observable<Todo>
    getTodo(todo: Todo): Observable<Todo>
    updateTodo(todo: Todo): Observable<Todo>
    removeTodo(todo: Todo): Observable<boolean>
    getAllTodo(): Observable<Todo[]>
    addTodoElement(todo: Todo, element: TodoElement): Observable<Todo>
    removeTodoElement(todo: Todo, element: TodoElement): Observable<boolean>
    updateTodoElement(todo: Todo, element: TodoElement): Observable<Todo>
}