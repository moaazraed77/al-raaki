import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { ZfooterComponent } from './components/zfooter/zfooter.component';
import { SoundsComponent } from './components/sounds/sounds.component';
import { ProductsComponent } from './components/products/products.component';
import { VisitsComponent } from './components/visits/visits.component';
import { CallUsComponent } from './components/call-us/call-us.component';
import { FatawyComponent } from './components/fatawy/fatawy.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AboutUsComponent } from './components/about-us/about-us.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    ZfooterComponent,
    SoundsComponent,
    ProductsComponent,
    VisitsComponent,
    CallUsComponent,
    FatawyComponent,
    AboutUsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    {provide : LocationStrategy,useClass:HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
