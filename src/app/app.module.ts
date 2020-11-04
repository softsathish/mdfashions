import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './components/products/products.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductAddEditComponent } from './components/product-add-edit/product-add-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImagesUploadComponent } from './components/images-upload/images-upload.component';
import { ImagesComponent } from './components/images/images.component';
import { HeaderComponent } from './components/includes/header/header.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { VariantsComponent } from './admin/variants/variants.component';
import { TermsComponent } from './admin/variants/terms/terms.component';
import { AdminComponent } from './admin/admin/admin.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CategoriesComponent } from './admin/categories/categories.component';
import { UsersComponent } from './admin/users/users.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsAdminComponent } from './admin/products/products.component';
import { OrdersComponent } from './components/orders/orders.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { HomeComponent } from './components/home/home.component';
import { CategoriesListComponent } from './components/categories-list/categories-list.component';
import { LoginRegisterComponent } from './components/login-register/login-register.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { CreateOrderComponent } from './admin/create-order/create-order.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductOffersComponent } from './admin/product-offers/product-offers.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { RouterModule } from '@angular/router';
import { CountdownerModule } from 'ng-countdowner';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductDetailsComponent,
    ProductAddEditComponent,
    ImagesUploadComponent,
    ImagesComponent,
    HeaderComponent,
    DashboardComponent,
    VariantsComponent,
    TermsComponent,
    AdminComponent,
    CategoriesComponent,
    UsersComponent,
    LoginComponent,
    LogoutComponent,
    CartComponent,
    ProductsAdminComponent,
    OrdersComponent,
    OrderDetailComponent,
    HomeComponent,
    CategoriesListComponent,
    LoginRegisterComponent,
    AdminOrdersComponent,
    CreateOrderComponent,
    FooterComponent,
    ProductOffersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    BrowserAnimationsModule,
    TypeaheadModule.forRoot(),
    CountdownerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
