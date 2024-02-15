import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { social } from '../Modal/interfaces/social.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocialMediaService {

  constructor(private toastr: ToastrService, private http: HttpClient) { }

  url: string = environment.firebase.databaseURL;

  // --------------------------------------- update social media links ---------------------------------------
  getSocialAPI(socialtype: string): Observable<social[]> {
    return this.http.get<social[]>(`${this.url}/${socialtype}.json`)
  }

  updateYoutube(youtube: any) {
    this.getSocialAPI("youtube").subscribe(data => {
      for (let key in data) {
        this.http.put(`${this.url}/youtube/${key}.json`, youtube).subscribe((data) => {
          this.toastr.error("تم تعديل يوتيوب", "عملية ناجحة");
        })
      }
    })
  }

  updatefacebook(facebook: any) {
    this.getSocialAPI("facebook").subscribe(data => {
      for (let key in data) {
        this.http.put(`${this.url}/facebook/${key}.json`, facebook).subscribe((data) => {
          this.toastr.info("تم تعديل فيسبوك", "عملية ناجحة");
        })
      }
    })
  }

  updateWhatsapp(whats: any) {
    this.getSocialAPI("whats").subscribe(data => {
      for (let key in data) {
        this.http.put(`${this.url}/whats/${key}.json`, whats).subscribe((data) => {
          this.toastr.success("تم تعديل الواتساب", "عملية ناجحة");
        })
      }
    })
  }

  updateSnapChat(snapchat: any) {
    this.getSocialAPI("snapchat").subscribe(data => {
      for (let key in data) {
        this.http.put(`${this.url}/snapchat/${key}.json`, snapchat).subscribe((data) => {
          this.toastr.warning("تم تعديل سناب شات", "عملية ناجحة");
        })
      }
    })
  }

  updateInstagram(insta: any) {
    this.getSocialAPI("insta").subscribe(data => {
      for (let key in data) {
        this.http.put(`${this.url}/insta/${key}.json`, insta).subscribe((data) => {
          this.toastr.error("تم تعديل الانستجرام", "عملية ناجحة");
        })
      }
    })
  }
}
