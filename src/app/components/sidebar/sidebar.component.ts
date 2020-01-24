import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Category } from "@agh-app/model";
import { SidebarService } from "@agh-app/service";
import { Subscription } from 'rxjs';


@Component({
  selector: 'agh-app-categories-sidenav',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  constructor(private sidebarService: SidebarService) { }

  categories: Category[] = [];
  selectedCategory: Category = { id: 'all' };

  currentCategory: Subscription;

  @Output()
  optionSelected: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.sidebarService.getAllCategories().subscribe(
      (categories: Category[]) => {
        this.categories = categories;
      }
    )
  }

  selectCategory() {
    this.currentCategory = this.sidebarService.setCurrentCategory(this.selectedCategory).subscribe(
      () => {
        this.optionSelected.emit(null);
      }
    )
  }

  ngOnDestroy() {
    if (this.currentCategory) {
      this.currentCategory.unsubscribe();
    }
  }
}
