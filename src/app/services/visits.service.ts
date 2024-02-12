import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { images } from '../Modal/interfaces/images.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VisitsService {

  url: string = environment.firebase.databaseURL;
  
  constructor(private http: HttpClient, private toastr: ToastrService, private firestorage: AngularFireStorage) { }

  getDataAPI(): Observable<images[]> {
      return this.http.get<images[]>(`${this.url}/visits.json`);
  }

  // adding Carasouel data to the server 
  postVisitData(data: any) {
    this.http.post(`${this.url}/visits.json`, data).subscribe(() => {
      this.toastr.success("تم رفع الصورة ")
    })
  }

  // edit  data on the server 
  editData(olditem: images, newItem:any) {
    this.getDataAPI().subscribe({
      next: data => {
      for (const key in data) {
      if(olditem.id==data[key].id){
            olditem.img=newItem.img;
            this.http.put(`${this.url}/visits/${key}.json`,olditem).subscribe(()=>{
              this.toastr.warning("تم تعديل الصورة ") 
            })
            break;
          }
        }
      },
      error: () => { this.toastr.error("Error Connection ", " Data Incompleted"); },
      complete: () => {  }
    })
  }
}
