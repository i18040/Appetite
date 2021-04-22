import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  
  categoryArray: string[]
  
  constructor() { }
  
  ngOnInit(): void {
    this.categoryArray = ['All', 'Asian', 'Western', 'African', 'Mexican']
  }

}
