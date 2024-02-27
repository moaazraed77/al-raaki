import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { visuals } from '../Modal/interfaces/visuals.interface';

@Injectable({
  providedIn: 'root'
})
export class VisualsService {

  constructor(private http: HttpClient, private toastr: ToastrService,) { }

  url: string = environment.firebase.databaseURL;

  dataList: visuals[] = [];

  getDataAPI(): Observable<visuals[]> {
    return this.http.get<visuals[]>(`${this.url}/visuals.json`);
  }

  async postvisualsData(data: any) {
    this.http.post(`${this.url}/visuals.json`, data).subscribe(() => {
      this.toastr.success("تمت الاضافة المحتوي ")
    })
  }

  async editData(item: any) {
    this.getDataAPI().subscribe({
      next: data => {
        for (const key in data) {
          if (item.id == data[key].id) {
            this.http.put(`${this.url}/visuals/${key}.json`, item).subscribe();
            break;
          }
        }
      },
      error: () => { this.toastr.error("Error Connection ", " Data Incompleted"); },
      complete: () => { this.toastr.warning("تم تعديل المحتوي ") }
    })
  }
}
