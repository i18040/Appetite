import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryListComponent } from './orderProcess/category-list/category-list.component';
import { HomeShellComponent } from './home-shell/home-shell.component';
import { ProductListComponent } from './orderProcess/product-list/product-list.component';
import { RestaurantListComponent } from './orderProcess/restaurant-list/restaurant-list.component';
import { OrderComponent } from './recendOrder/order/order.component';
import { ReviewComponent } from './recendOrder/review/review.component';

const routes: Routes = [
    {
        path: '',
        component: HomeShellComponent,
        children: [
            {
                path: '',
                redirectTo: 'category',
                pathMatch: 'full',
            },
            {
                path: 'category',
                component: CategoryListComponent,
            },
            {
                path: 'restaurant',
                component: RestaurantListComponent,
            },
            {
                path: 'product',
                component: ProductListComponent,
            },
            {
                path: 'history',
                component: OrderComponent,
            },
            {
                path: 'review',
                component: ReviewComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HomeRoutingModule { }
