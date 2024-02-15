import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss', '../../Modal/main-style.css']
})
export class ProductsComponent {

  constructor() {
    // if (sessionStorage.getItem("page-attitude") != "products-page-working-fine") {
    //   sessionStorage.setItem("page-attitude", "products-page-working-fine")
    //   window.location.reload()
    // }
  }
}
