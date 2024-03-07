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
import { SocialIconsComponent } from './social-icons/social-icons.component';
import { VisualsComponent } from './visuals/visuals.component';
import { adminAuthGuard } from '../services/admin-auth.guard';

const routes: Routes = [
  { path: "admin-login-dash", component: LoginDashComponent },
  {
    path: "admin", component: AdminComponent, children: [
      { path: "about-us-dash", component: AboutUsComponent },
      { path: "call-us-dash", component: CallUsComponent },
      { path: "fatawy-dash", component: FatawyComponent },
      { path: "home-dash", component: HomeComponent },
      { path: "products-dash", component: ProductsComponent },
      { path: "sounds-dash", component: SoundsComponent },
      { path: "visuals-dash", component: VisualsComponent },
      { path: "visits-dash", component: VisitsComponent },
      { path: "social-icons-dash", component: SocialIconsComponent },
    ] ,

    canActivate:[adminAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
