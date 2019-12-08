import { Inject, Injectable } from '@angular/core';
import { TodoServiceInterface } from './todo-service.interface';
import { Todo, TodoElement } from '@agh-app/model';
import { Observable, BehaviorSubject } from 'rxjs';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

const STORAGE_KEY = 'todolist';

@Injectable()
export class TodoService implements TodoServiceInterface {
    lastId: number = 0;
    currentTodoList: Todo[] = [];

    constructor(@Inject(LOCAL_STORAGE) private localStorage: StorageService) {
        let todos = this.localStorage.get(STORAGE_KEY);

        if (undefined !== todos && 0 < todos.length) {
            this.currentTodoList = todos;
            this.lastId = this.currentTodoList[this.currentTodoList.length - 1].id + 1;
        }
    }

    public addTodo(todo: Todo & { id?: number }): Observable<Todo> {
        todo.id = this.lastId++;

        this.currentTodoList.push(todo);

        this.updateLocalStorage();

        return new BehaviorSubject<Todo>(todo);
    }

    getTodo(todo: Todo): Observable<Todo> {
        let id = todo.id;

        return new BehaviorSubject<Todo>(this.currentTodoList.find(
            (todo: Todo) => todo.id == id
        ))
    }

    updateTodo(todo: Todo): Observable<Todo> {

        this.currentTodoList[this.getTodoIndex(todo)] = todo;

        this.updateLocalStorage();

        return new BehaviorSubject<Todo>(this.currentTodoList[this.getTodoIndex(todo)])
    }

    removeTodo(todo: Todo): Observable<boolean> {
        let index = this.getTodoIndex(todo);

        if (index > -1) {
            this.currentTodoList.splice(index, 1);
        }

        this.updateLocalStorage();

        return new BehaviorSubject<boolean>(true)
    }

    getAllTodo(): Observable<Todo[]> {
        return new BehaviorSubject<Todo[]>(this.currentTodoList);
    }

    addTodoElement(todo: Todo, element: TodoElement): Observable<Todo> {
        let id = 0;

        if (todo.elements.length > 0) {
            id = todo.elements[todo.elements.length - 1].id + 1
        }

        this.currentTodoList[this.getTodoIndex(todo)].elements.push({
            id: id,
            title: element.title,
            done: false
        });


        this.updateLocalStorage();

        return new BehaviorSubject<Todo>(this.currentTodoList[this.getTodoIndex(todo)]);
    }

    removeTodoElement(todo: Todo, element: TodoElement): Observable<boolean> {

        let todoIndex = this.getTodoIndex(todo);

        if (todoIndex > -1) {
            let elementIndex = this.getTodoElementIndex(todo, element);

            if (elementIndex > -1) {
                this.currentTodoList[todoIndex].elements.splice(elementIndex, 1);
            }
        }

        this.updateLocalStorage();

        return new BehaviorSubject<boolean>(true)

    }

    updateTodoElement(todo: Todo, element: TodoElement): Observable<Todo> {
        this.currentTodoList[this.getTodoIndex(todo)].elements[this.getTodoElementIndex(todo, element)] = element;

        this.updateLocalStorage();

        return new BehaviorSubject<Todo>(this.currentTodoList[this.getTodoIndex(todo)])
    }


    private updateLocalStorage() {
        this.localStorage.set(STORAGE_KEY, this.currentTodoList);
    }

    private getTodoIndex(todo: Todo): number {
        let id = todo.id;

        let currentTodo = this.currentTodoList.find((todo: Todo) => todo.id == id);

        return this.currentTodoList.indexOf(currentTodo);
    }

    private getTodoElementIndex(todo: Todo, element: TodoElement): number {
        let todoIndex = this.getTodoIndex(todo);

        let currentTodo = this.currentTodoList[todoIndex].elements.find((todoElement: TodoElement) => todoElement.id == element.id)

        return this.currentTodoList[todoIndex].elements.indexOf(currentTodo);
    }
}
