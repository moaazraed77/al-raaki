import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { sound } from '../Modal/interfaces/sound..interface';

@Injectable({
  providedIn: 'root'
})
export class SoundsService {

  constructor(private http: HttpClient, private toastr: ToastrService,) { }

  url: string = environment.firebase.databaseURL;

  dataList: sound[] = [];

  getDataAPI(): Observable<sound[]> {
    return this.http.get<sound[]>(`${this.url}/sound.json`);
  }

  postSoundData(data: any) {
    this.http.post(`${this.url}/sound.json`, data).subscribe(() => {
      this.toastr.success("تمت الاضافة المحتوي ")
    })
  }

  async editData(item: any) {
    this.getDataAPI().subscribe({
      next: data => {
        for (const key in data) {
          if (item.id == data[key].id) {
            this.http.put(`${this.url}/sound/${key}.json`, item).subscribe();
            break;
          }
        }
      },
      error: () => { this.toastr.error("Error Connection ", " Data Incompleted"); },
      complete: () => { this.toastr.warning("تم تعديل المحتوي ") }
    })
  }
}
