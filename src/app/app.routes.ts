import { Routes } from '@angular/router';
import { ProductsViewComponent } from './features/transactions/pages/products-view/products-view.component';
import { appTitle } from './core/constants/app.constants';

export const routes: Routes = [
  {
    path: '**',
    component: ProductsViewComponent,
    title: appTitle,
  },
];
