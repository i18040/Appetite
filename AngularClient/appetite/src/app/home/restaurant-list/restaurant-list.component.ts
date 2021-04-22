import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.scss']
})
export class RestaurantListComponent implements OnInit {

  restaurantArray: string[]

  constructor() { }

  ngOnInit(): void {
    this.restaurantArray = ['R1', 'Dönerbude', 'MeisterPasta', 'AfricanFrodo', 'MexicanMix']
  }

}
