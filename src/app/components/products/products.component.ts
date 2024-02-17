import { Component } from '@angular/core';
import { product } from 'src/app/Modal/interfaces/product.interface';
import { social } from 'src/app/Modal/interfaces/social.interface';
import { ProductsService } from 'src/app/services/products.service';
import { SocialMediaService } from 'src/app/services/social-media.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss', '../../Modal/main-style.css']
})
export class ProductsComponent {

  products: product[] = []
  
  whatsapp: social[] = []

  constructor( private productServ: ProductsService, private iconsServ: SocialMediaService) {
    // if (sessionStorage.getItem("page-attitude") != "products-page-working-fine") {
    //   sessionStorage.setItem("page-attitude", "products-page-working-fine")
    //   window.location.reload()
    // }
    this.productServ.getDataAPI().subscribe({
      next: data => {
        for (const key in data) {
          this.products.push(data[key])
        }
      },
      error: () => { },
      complete: () => { }
    })

    // ----------------------- get whatsapp -----------------------
    iconsServ.getSocialAPI("whats").subscribe(data => {
      for (const key in data) {
        this.whatsapp.push(data[key])
      }
    })
  }
}
