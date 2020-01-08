import { Todo } from "./todo.model";

export interface Category {
  id?: string;
  title?: string;
  card_list?: Todo[];
}
