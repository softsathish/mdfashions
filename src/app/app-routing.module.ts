import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin/admin.component';
import { CategoriesComponent } from './admin/categories/categories.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { UsersComponent } from './admin/users/users.component';
import { TermsComponent } from './admin/variants/terms/terms.component';
import { VariantsComponent } from './admin/variants/variants.component';
import { LoginComponent } from './components/login/login.component';
import { ProductAddEditComponent } from './components/product-add-edit/product-add-edit.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductsAdminComponent } from './admin/products/products.component';
import { ProductsComponent } from './components/products/products.component';
import { LogoutComponent } from './components/logout/logout.component';
import { CartComponent } from './components/cart/cart.component';
import { OrdersComponent } from './components/orders/orders.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { HomeComponent } from './components/home/home.component';
import { CategoriesListComponent } from './components/categories-list/categories-list.component';
import { LoginRegisterComponent } from './components/login-register/login-register.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { CreateOrderComponent } from './admin/create-order/create-order.component';
import { ProductOffersComponent } from './admin/product-offers/product-offers.component';



const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login-register', component: LoginRegisterComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'product/:id/:name', component: ProductDetailsComponent},
  {path: 'product/variant/:id/:name/:image', component: ProductDetailsComponent},
  {path: 'products/:type/:id/:name', component: ProductsComponent},
  {path: 'add-product', component: ProductAddEditComponent},
  {path: 'edit-product/:id', component: ProductAddEditComponent},
  {path: 'cart', component: CartComponent},
  {path: 'orders', component: OrdersComponent},
  {path: 'order/:id', component: OrderDetailComponent},
  {path: 'categories', component: CategoriesListComponent},
  { path: 'admin', component: AdminComponent,
    children: [
      {path: 'dashboard', component: DashboardComponent},
      {path: 'products', component: ProductsAdminComponent},
      {path: 'orders', component: AdminOrdersComponent},
      {path: 'offers', component: ProductOffersComponent},
      {path: 'create-order', component: CreateOrderComponent},
      {path: 'variants', component: VariantsComponent},
      {path: 'variant-terms/:id/:name', component: TermsComponent},
      {path: 'categories', component: CategoriesComponent},
      {path: 'users', component: UsersComponent},
    ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
