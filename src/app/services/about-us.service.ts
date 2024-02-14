import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { aboutUS } from '../Modal/interfaces/about-us..interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AboutUsService {

  constructor(private http: HttpClient, private toastr: ToastrService,) { }

  url: string = environment.firebase.databaseURL;

  dataList: aboutUS[] = [];

  getDataAPI(): Observable<aboutUS[]> {
    return this.http.get<aboutUS[]>(`${this.url}/aboutUS.json`);
  }

  postAboutData(data: any) {
    this.http.post(`${this.url}/aboutUS.json`, data).subscribe(() => {
      this.toastr.success("تمت الاضافة المحتوي ")
    })
  }

  editData(item: any) {
    this.getDataAPI().subscribe({
      next: data => {
        for (const key in data) {
          if (item.id == data[key].id) {
            this.http.put(`${this.url}/aboutUS/${key}.json`, item).subscribe();
            break;
          }
        }
      },
      error: () => { this.toastr.error("Error Connection ", " Data Incompleted"); },
      complete: () => { this.toastr.warning("تم تعديل المحتوي ") }
    })
  }
}
