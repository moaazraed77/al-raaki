import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss', '../../Modal/admin-style.css', '../../Modal/main-style.css']
})
export class ProductsComponent {

  controlView: string = "add-data";

  uploading: any = "";

  deletedItem: any = {}

  products: any[] = [
    { id: 1, productImage: "assets/1.jpg", productsTitle: "welcome", productsDetails: "Lorem ipsua saepe sequi deserunt id iusto accusamus beatae archi tenetur voluptas labore!", productDiscount: 120, productPrice: 100},
    { id: 1, productImage: "assets/2.jpg", productsTitle: "Hello", productsDetails: "Lorem ipsua saepe sequi deserunt id iusto accusamus beatae archi tenetur voluptas labore!", productDiscount: 120, productPrice: 100},
    { id: 1, productImage: "assets/3.jpg", productsTitle: "welcome", productsDetails: "Lorem ipsua saepe sequi deserunt id iusto accusamus beatae archi tenetur voluptas labore!", productDiscount: 120, productPrice: 100},
    { id: 1, productImage: "assets/4.jpg", productsTitle: "Hello", productsDetails: "Lorem ipsua saepe sequi deserunt id iusto accusamus beatae archi tenetur voluptas labore!", productDiscount: 120, productPrice: 100},
  ]

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService) { }

  product = this.formBuilder.group({
    id: [new Date().getTime()],
    productsTitle: [""],
    productsDetails: [""],
    productDiscount: [0],
    productPrice: [0],
    productImage: [""],
  })

  dataControl() {
    if (this.controlView = "add-view")
      this.product.patchValue({
        id: new Date().getTime(),
        productsTitle: "",
        productsDetails: "",
        productDiscount: 0,
        productPrice: 0,
        productImage: "",
      })
  }

  // promo upload to show which files uploaded and the size of each photo
  upload(event: any) {
    this.uploading = "";
    const files = event.target.files[0];
    let loader = new FileReader();
    if (event.target.files[0].size / 1024 <= 30) {
      loader.readAsDataURL(event.target.files[0])
      loader.onload = (event) => {
        this.uploading = event.target?.result;  // show the photos before uploading
      }
    } else {
      this.toastr.error(" 30 kb  حجم الصورة اكبر من ");
    }
  }

  edit(item: any) {
    this.product.patchValue({
      id: item.id,
      productsTitle: item.productsTitle,
      productsDetails: item.productsDetails,
      productDiscount: item.productDiscount,
      productPrice: item.productPrice,
      productImage: item.productImage,
    })
    this.controlView = "edit-data";
    this.uploading= item.productImage
  }

  set_delete(item: any) {
    this.deletedItem = item;
  }

}
