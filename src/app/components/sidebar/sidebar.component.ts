import { Component, OnInit } from '@angular/core';
import { Category } from "@agh-app/model";
import { SidebarService } from "@agh-app/service";

@Component({
  selector: 'agh-app-categories-sidenav',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  constructor(private sidebarService: SidebarService) { }

  categories: Category[] = [];

  ngOnInit() {
    this.sidebarService.getAllCategories().subscribe(
      (categories: Category[]) => {
        this.categories = categories;
      }
    )
  }
}
