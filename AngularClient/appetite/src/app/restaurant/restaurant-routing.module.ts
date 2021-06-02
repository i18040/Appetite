import { RestaurantShellComponent } from './restaurant-shell/restaurant-shell.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderListComponent } from './order-list/order-list.component';
import { CreateProductComponent } from './create-product/create-product.component';

const routes: Routes = [
    {
        path: '',
        component: RestaurantShellComponent,
        children: [
            {
                path: '',
                redirectTo: 'orders',
                pathMatch: 'full',
            },
            {
                path: 'orders',
                component: OrderListComponent,
            },
            {
                path: 'newProduct',
                component: CreateProductComponent,
            }
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RestaurantRoutingModule { }
