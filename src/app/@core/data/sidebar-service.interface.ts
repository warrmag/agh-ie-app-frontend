import {Category} from "../model/category.model";
import { Observable } from 'rxjs';

export interface SidebarServiceInterface {
  getCategory(category: Category): Observable<Category>
  getAllCategories(): Observable<Category[]>
}
