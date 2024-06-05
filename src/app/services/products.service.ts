import { Injectable } from '@angular/core';
import { product } from '../Modal/interfaces/product.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  url: string = environment.firebase.databaseURL;

  constructor(private http: HttpClient, private toastr: ToastrService, private firestorage: AngularFireStorage) { }

  getDataAPI(): Observable<product[]> {
    return this.http.get<product[]>(`${this.url}/products.json`);
  }

  // adding Carasouel data to the server 
  async postproductData(data: any) {
    this.http.post(`${this.url}/products.json`, data).subscribe(() => {
      this.toastr.success("تم رفع المنتج ")
    })
  }

  // edit  data on the server 
  async editData(olditem: product, newItem: any) {
    this.getDataAPI().subscribe({
      next: data => {
        for (const key in data) {
          if (olditem.id == data[key].id) {
            newItem.id = olditem.id;
            this.http.put(`${this.url}/products/${key}.json`, newItem).subscribe(() => {
              this.toastr.warning("تم تعديل المنتج ")
              if (olditem.productImage != newItem.productImage) {
                this.firestorage.storage.refFromURL(olditem.productImage).delete() // to delete the file from Firebase Storage
              }
            })
            break;
          }
        }
      },
      error: () => { this.toastr.error("Error Connection ", " Data Incompleted"); },
      complete: () => { }
    })
  }


}
