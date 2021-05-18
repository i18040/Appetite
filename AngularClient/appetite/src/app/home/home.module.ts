import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { RestaurantListComponent } from './orderProcess/restaurant-list/restaurant-list.component';
import { CategoryListComponent } from './orderProcess/category-list/category-list.component';
import { HomeShellComponent } from './home-shell/home-shell.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { ProductListComponent } from './orderProcess/product-list/product-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderComponent } from './recendOrder/order/order.component';



@NgModule({
    declarations: [
        RestaurantListComponent,
        CategoryListComponent,
        HomeShellComponent,
        ProductListComponent,
        OrderComponent
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        LayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatCardModule,
        FormsModule,
        ReactiveFormsModule,
    ]
})
export class HomeModule { }
