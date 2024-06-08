import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { LoginDashComponent } from './login-dash/login-dash.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AboutUsComponent } from './about-us/about-us.component';
import { CallUsComponent } from './call-us/call-us.component';
import { FatawyComponent } from './fatawy/fatawy.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { SoundsComponent } from './sounds/sounds.component';
import { VisitsComponent } from './visits/visits.component';
import { SafePipe } from '../Modal/pipes/safe.pipe';
import { SocialIconsComponent } from './social-icons/social-icons.component';
import { VisualsComponent } from './visuals/visuals.component';
import { OrdersComponent } from './orders/orders.component';


@NgModule({
  declarations: [
    AdminComponent,
    LoginDashComponent,
    AboutUsComponent,
    CallUsComponent,
    FatawyComponent,
    HomeComponent,
    ProductsComponent,
    SoundsComponent,
    VisitsComponent,
    SafePipe,
    SocialIconsComponent,
    VisualsComponent,
    OrdersComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AdminModule { }
