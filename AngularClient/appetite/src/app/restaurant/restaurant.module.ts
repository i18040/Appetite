import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestaurantRoutingModule } from './restaurant-routing.module';
import { RestaurantShellComponent } from './restaurant-shell/restaurant-shell.component';


@NgModule({
  declarations: [RestaurantShellComponent],
  imports: [
    CommonModule,
    RestaurantRoutingModule
  ]
})
export class RestaurantModule { }
