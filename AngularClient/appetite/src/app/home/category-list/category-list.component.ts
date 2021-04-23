import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShoppingService } from 'src/app/service/shopping.service';
import { ICategory } from 'src/app/Template/interface';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  
  categoryArray: ICategory[]
  
  constructor(
    private shoppingService: ShoppingService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }
  
  ngOnInit(): void {
    this.categoryArray = this.shoppingService.getCategoryArray();
  }

  /**
   * switches Tab to the restaurant selection
   * 
   * @param category listed restaurants need to be that category 
   */
  showRestaurants(category: number){
    this.shoppingService.setSelectedCategory(category);
    this.router.navigate(["../restaurant"], {relativeTo: this.route });
  }

}
