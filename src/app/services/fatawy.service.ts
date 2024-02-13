import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { fatawy } from '../Modal/interfaces/fatawy.interface';

@Injectable({
  providedIn: 'root'
})
export class FatawyService {

  url: string = environment.firebase.databaseURL;

  constructor(private http: HttpClient, private toastr: ToastrService, private firestorage: AngularFireStorage) { }

  getDataAPI(): Observable<fatawy[]> {
    return this.http.get<fatawy[]>(`${this.url}/fatawy.json`);
  }

  // adding Carasouel data to the server 
  async postFatawyData(data: any) {
    this.http.post(`${this.url}/fatawy.json`, data).subscribe(() => {
      this.toastr.success("تم رفع تفاصيل الفتوي ")
    })
  }

  // edit  data on the server 
  async editData(olditem: fatawy, newItem: any) {
    this.getDataAPI().subscribe({
      next: data => {
        for (const key in data) {
          if (olditem.id == data[key].id) {
            newItem.id = olditem.id;
            this.http.put(`${this.url}/fatawy/${key}.json`, newItem).subscribe(() => {
              this.toastr.warning("تم تعديل تفاصيل الفتوي ")
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
