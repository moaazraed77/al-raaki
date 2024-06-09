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
import { AdminModule } from './admin/admin.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideStorage, getStorage } from '@angular/fire/storage'; // write this special code for upload img 
import { AngularFireModule, FIREBASE_OPTIONS } from '@angular/fire/compat';
import { SafeUrlCutomerViewPipe } from './Modal/pipes/safe-url-cutomer-view.pipe';
import { EditProductLinkPipe } from './Modal/pipes/edit-product-link.pipe';
import { PaymentComponent } from './components/payment/payment.component';
import { VisualsComponent } from './components/visuals/visuals.component'; // write this special code for upload img 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { cartReducer } from './store/cart.reducer';
import { AuthGatewayInterceptor } from './Modal/auth-gateway.interceptor';
import { GatewayInterceptor } from './services/interceptors/gateway.interceptor';
import { PaymentConfiremComponent } from './components/payment-confirem/payment-confirem.component';

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
    AboutUsComponent,
    SafeUrlCutomerViewPipe,
    EditProductLinkPipe,
    PaymentComponent,
    VisualsComponent,
    PaymentConfiremComponent,
  ],
  imports: [
    BrowserModule,
    AdminModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      positionClass: "toast-top-left"
    }), // ToastrModule added
    HttpClientModule, provideFirebaseApp(() => initializeApp(environment.firebase)), provideAuth(() => getAuth()), provideDatabase(() => getDatabase()), provideStorage(() => getStorage()),
    // StoreModule.forRoot({}, {})  // note that we can use multiple reducses
    StoreModule.forRoot({myCart:cartReducer})  
  ],
  providers: [
    // write this special code for upload img 
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    // {provide: HTTP_INTERCEPTORS,useClass:AuthGatewayInterceptor, multi:true}
    {provide: HTTP_INTERCEPTORS,useClass:GatewayInterceptor, multi:true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
