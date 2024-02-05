import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { LoginDashComponent } from './login-dash/login-dash.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { CallUsComponent } from './call-us/call-us.component';
import { FatawyComponent } from './fatawy/fatawy.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { SoundsComponent } from './sounds/sounds.component';
import { VisitsComponent } from './visits/visits.component';

const routes: Routes = [
  {path:"admin-login-dash",component:LoginDashComponent},
  {path:"admin",component:AdminComponent,children:[
    {path:"",component:AboutUsComponent},
    {path:"",component:CallUsComponent},
    {path:"",component:FatawyComponent},
    {path:"",component:HomeComponent},
    {path:"",component:ProductsComponent},
    {path:"",component:SoundsComponent},
    {path:"",component:VisitsComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
