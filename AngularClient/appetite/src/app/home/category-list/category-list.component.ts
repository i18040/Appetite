import { Component, OnInit } from '@angular/core';
import { ShoppingService } from 'src/app/service/shopping.service';
import { ICategory } from 'src/app/Template/category';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  
  categoryArray: ICategory[]
  
  constructor(
    private shoppingService: ShoppingService,
  ) { }
  
  ngOnInit(): void {
    this.categoryArray = this.shoppingService.getCategoryArray();
  }

}
