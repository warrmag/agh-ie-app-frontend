import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { SidebarServiceInterface } from './sidebar-service.interface';
import { Category } from "../model/category.model";


@Injectable()
export class SidebarService implements SidebarServiceInterface {
  constructor(@Inject(ApiService) private apiService: ApiService) { }

  public getCategory(category: Category): Observable<Category> {
    return this.apiService.get('/categories/' + category.id).pipe(map(data => data));
  }

  public getAllCategories(): Observable<Category[]> {
    return this.apiService.get('/categories').pipe(map(data => data));
  }
}
