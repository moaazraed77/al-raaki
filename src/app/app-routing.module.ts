import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CallUsComponent } from './components/call-us/call-us.component';
import { FatawyComponent } from './components/fatawy/fatawy.component';
import { ProductsComponent } from './components/products/products.component';
import { SoundsComponent } from './components/sounds/sounds.component';
import { VisitsComponent } from './components/visits/visits.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { PaymentComponent } from './components/payment/payment.component';
import { VisualsService } from './services/visuals.service';
import { VisualsComponent } from './components/visuals/visuals.component';
import { PaymentConfiremComponent } from './components/payment-confirem/payment-confirem.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"call-us",component:CallUsComponent},
  {path:"about-us",component:AboutUsComponent},
  {path:"fatawy",component:FatawyComponent},
  {path:"payment",component:PaymentComponent},
  {path:"payment-confirm/:id",component:PaymentConfiremComponent},
  {path:"products",component:ProductsComponent},
  {path:"sounds",component:SoundsComponent},
  {path:"visuals",component:VisualsComponent},
  {path:"visits",component:VisitsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true,scrollPositionRestoration:"enabled"})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
