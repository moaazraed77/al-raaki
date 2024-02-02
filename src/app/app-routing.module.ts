import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CallUsComponent } from './components/call-us/call-us.component';
import { FatawyComponent } from './components/fatawy/fatawy.component';
import { ProductsComponent } from './components/products/products.component';
import { SoundsComponent } from './components/sounds/sounds.component';
import { VisitsComponent } from './components/visits/visits.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"call-us",component:CallUsComponent},
  {path:"fatawy",component:FatawyComponent},
  {path:"products",component:ProductsComponent},
  {path:"sounds",component:SoundsComponent},
  {path:"visits",component:VisitsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true,scrollPositionRestoration:"enabled"})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
