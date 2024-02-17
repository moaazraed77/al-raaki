import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { product } from 'src/app/Modal/interfaces/product.interface';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss', '../../Modal/admin-style.css', '../../Modal/main-style.css']
})
export class ProductsComponent {

  controlView: string = "add-product";

  uploading: any = "";

  editItem: product = {} as product;

  deletedItem: product = {} as product;

  imageFile: any = {}

  products: product[] = []

  constructor(private toastr: ToastrService, private formBuilder: FormBuilder, private http: HttpClient,
    private productServ: ProductsService, private firestorage: AngularFireStorage) {
  }
  product = this.formBuilder.group({
    id: [new Date().getTime()],
    productsTitle: [""],
    productsDetails: [""],
    productDiscount: [0],
    productPrice: [0],
    productImage: [""],
  })

  resetView() {
    this.controlView='add-product';
    this.uploading=''
    this.product.patchValue({
      id: new Date().getTime(),
      productsTitle: "",
      productsDetails: "",
      productDiscount: 0,
      productPrice: 0,
      productImage: "",
    })
  }

  getProducts() {
    this.products = [];
    this.controlView='show-product'
    this.productServ.getDataAPI().subscribe({
      next: data => {
        for (const key in data) {
          this.products.push(data[key])
        }
      },
      error: () => { this.toastr.error("Error Connection ", " Data Incompleted"); },
      complete: () => { }
    })
  }
  // promo upload to show which files uploaded and the size of each photo
  upload(event: any) {
    this.uploading = "";
    let loader = new FileReader();
    if (event.target.files[0].size / 1024 <= 30) {
      this.imageFile = event.target.files[0];
      loader.readAsDataURL(event.target.files[0])
      loader.onload = (event) => {
        this.uploading = event.target?.result;  // show the photos before uploading
      }
    } else {
      this.toastr.error(" 30 kb  حجم الصورة اكبر من ");
    }
  }
  // -------------- funcion to upload img file and get image url ---- on firebase --------------
  async uploadFile(file: any) {
    if (file) {
      const path = `alraaki/${new Date().getTime()}${file.name}`; // we make name of file in firebase storage 
      const uploadTask = await this.firestorage.upload(path, file);
      this.product.patchValue({
        id: new Date().getTime(),
        productImage: await uploadTask.ref.getDownloadURL()
      })
    }
  }
  submit() {
    if ((this.product.get("productPrice")?.value! > this.product.get("productDiscount")?.value! 
    || this.product.get("productPrice")?.value! <= 0) &&
      this.product.get("productDiscount")?.value! > 0 &&
       this.product.get("productsDetails")?.value != '' &&
       this.product.get("title")?.value != ''&&
       this.uploading != ''
      ) {

      // if (this.control == "add-product"  || (this.control=="edit-product" && this.product.get("type")?.value != this.globalProduct.type ) ) {
      if (this.controlView == "add-product") {
        this.product.patchValue({
          id: new Date().getTime(),
        })
        this.uploadFile(this.imageFile).then(() => {
          this.productServ.postproductData(this.product.value)
          this.resetView();
        })
      }// --------- for editing the products ---------
      else if (this.controlView == "edit-product") {
        // if there are a new uploads 
        if (this.uploading != this.product.get("productImage")?.value!) {
          this.uploadFile(this.imageFile).then(() => {
            this.productServ.editData(this.editItem, this.product.value)
            this.resetView();
          })
        } else {
          this.productServ.editData(this.editItem, this.product.value)
          this.resetView();
        }
      }
    } else {
      this.toastr.error("راجع بيانات المنتج")
    }
  }

  edit(item: any) {
    this.editItem = item;
    this.product.patchValue({
      id: item.id,
      productsTitle: item.productsTitle,
      productsDetails: item.productsDetails,
      productDiscount: item.productDiscount,
      productPrice: item.productPrice,
      productImage: item.productImage,
    })
    this.controlView = "edit-product";
    this.uploading = item.productImage
  }

  set_delete(item: product) {
    this.productServ.getDataAPI().subscribe({
      next: data => {
        for (const key in data) {
          if (item.id == data[key].id) {
            this.http.delete(`${this.productServ.url}/products/${key}.json`).subscribe(() => {
              this.firestorage.storage.refFromURL(item.productImage).delete() // to delete the file from Firebase Storage
              this.toastr.success("تم حذف الصورة ");
              this.getProducts()
            });
            break;
          }
        }
      },
    })
  }

}
