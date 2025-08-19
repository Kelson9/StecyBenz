import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductsComponent } from './pages/products/products.component';
import { EventsComponent } from './pages/events/events.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { AppComponent } from './app.component';
import { AllProductsComponent } from './pages/all-products/all-products.component';
import { CollectionsComponent } from './pages/collections/collections.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { CreateProductsComponent } from './pages/create-products/create-products.component';
import { CreateEventsComponent } from './pages/create-events/create-events.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: AppComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'featured', component: AllProductsComponent },
  { path: 'collections', component: CollectionsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },


  { 
    path: 'dashboard', component: DashboardComponent,
    children: [
      { path: 'products', component: ProductsComponent},
      { path: 'products/create', component: CreateProductsComponent},
      { path: 'events', component: EventsComponent},
      { path: 'events/create', component: CreateEventsComponent},
      { path: 'orders', component: OrdersComponent},
      { path: 'customers', component: CustomersComponent},
      { path: 'analytics', component: AnalyticsComponent},
      { path: '', redirectTo: 'products', pathMatch: 'full'}
    ]
  },
];
