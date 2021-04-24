import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryListComponent } from './category-list/category-list.component';
import { HomeShellComponent } from './home-shell/home-shell.component';
import { MenuListComponent } from './menu-list/menu-list.component';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';

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
        path: 'menu',
        component: MenuListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
