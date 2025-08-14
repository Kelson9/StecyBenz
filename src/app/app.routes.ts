import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductsComponent } from './pages/products/products.component';
import { EventsComponent } from './pages/events/events.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: AppComponent },
    { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { 
    path: 'dashboard', component: DashboardComponent,
    children: [
      { path: 'products', component: ProductsComponent },
      { path: 'events', component: EventsComponent },
      { path: 'orders', component: OrdersComponent },
      { path: '', redirectTo: 'products', pathMatch: 'full' }
    ]
  },
];
