import { TodoElement } from './todo-element.model';

export interface Todo {
    id: number;
    title: string;
    elements: TodoElement[];
}