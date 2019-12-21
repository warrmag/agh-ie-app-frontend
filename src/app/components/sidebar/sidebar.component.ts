import { Component, OnInit, Input } from '@angular/core';
import {Category} from "../../@core/model/category.model";
import {SidebarServiceInterface} from "../../@core/data/sidebar-service.interface";

@Component({
  selector: 'agh-app-todo',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  constructor(private sidebarService: SidebarServiceInterface) { }

  categories: Category[] = [];

  ngOnInit() {
    this.sidebarService.getAllCategories().subscribe(
      (categories: Category[]) => {
        this.categories = categories;
      }
    )
  }
}
