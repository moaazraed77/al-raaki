import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { visit } from '../Modal/interfaces/visit.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VisitsService {

  url: string = environment.firebase.databaseURL;

  constructor(private http: HttpClient, private toastr: ToastrService, private firestorage: AngularFireStorage) { }

  getDataAPI(): Observable<visit[]> {
    return this.http.get<visit[]>(`${this.url}/visits.json`);
  }

  // adding Carasouel data to the server 
  async postVisitData(data: any) {
    this.http.post(`${this.url}/visits.json`, data).subscribe(() => {
      this.toastr.success("تم رفع المحتوي ")
    })
  }

  // edit  data on the server 
  async editData(olditem: visit, newItem: any) {
    this.getDataAPI().subscribe({
      next: data => {
        for (const key in data) {
          if (olditem.id == data[key].id) {
            newItem.id = olditem.id;
            this.http.put(`${this.url}/visits/${key}.json`, newItem).subscribe(() => {
              this.toastr.warning("تم تعديل المحتوي ")
              if (olditem.img != newItem.img) {
                this.firestorage.storage.refFromURL(olditem.img).delete() // to delete the file from Firebase Storage
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
