import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShoppingService } from 'src/app/service/shopping.service';
import { ICategory } from 'src/app/model/orderProcess/category';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit {
  categoryArray: string[];

  constructor(
    private shoppingService: ShoppingService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.shoppingService.fetchCategoryArray().then((categories) => {
      this.categoryArray = Object.values(categories.categories);
    });
  }

  /**
   * switches Tab to the restaurant selection
   *
   * @param category listed restaurants need to be that category
   */
  showRestaurants(category: string, id: number) {
    this.shoppingService.setSelectedCategory(category, id);
    this.router.navigate(['../restaurant'], { relativeTo: this.route });
  }
}
