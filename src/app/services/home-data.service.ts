import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { images } from 'src/app/Modal/interfaces/images.interface';
import { environment } from 'src/environments/environment';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class HomeDataService {

  constructor(private http: HttpClient, private toastr: ToastrService, private firestorage: AngularFireStorage) { }

  url: string = environment.firebase.databaseURL;

  getDataAPI(type: string): Observable<images[]> {
    if (type == "movingImages"|| type == "homeDataCarasouel")
      return this.http.get<images[]>(`${this.url}/homeDataCarasouel.json`);
    else
      return this.http.get<images[]>(`${this.url}/homeDataStatic.json`);
  }


  // adding Carasouel data to the server 
  postCarasouelData(data: any) {
    this.http.post(`${this.url}/homeDataCarasouel.json`, data).subscribe(() => {
      this.toastr.success("تم رفع الصورة ")
    })
  }
  // adding Static data to the server 
  postStaticData(data: any) {
    this.http.post(`${this.url}/homeDataStatic.json`, data).subscribe(() => {
      this.toastr.success("تم رفع الصورة ")
    })
  }

  // edit  data on the server 
  async editData(olditem: images, newItem:any ,type: string) {
    this.getDataAPI(type).subscribe({
      next: data => {
        for (const key in data) {
          if(olditem.id==data[key].id){
            olditem.img=newItem.img;
            // olditem.URL=newItem.URL;   // removing the link of the photo
            this.http.put(`${this.url}/${type}/${key}.json`,olditem).subscribe()
          }
        }
      },
      error: () => { this.toastr.error("Error Connection ", " Data Incompleted"); },
      complete: () => {  this.toastr.warning("تم تعديل الصورة ");}
    })
  }
  
  // delete  data on the server 
  

}
