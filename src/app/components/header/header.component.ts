import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { social } from 'src/app/Modal/interfaces/social.interface';
import { SocialMediaService } from 'src/app/services/social-media.service';

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  // upload(event:any){
  //   const files=event.target.files;
  //     let loader=new FileReader();
  //     loader.readAsDataURL(event.target.files[0])
  //     loader.onload=(event)=>{
  //       console.log(event.target?.result);  // show the photos before uploading
  //     }
  //   }
  
  // icons form dash 
  whatsapp: social[] = []
  instagram: social[] = []
  snapchat: social[] = []
  youtube: social[] = []
  facebook: social[] = []

  constructor(private iconsServ:SocialMediaService){

  // ----------------------- get whatsapp -----------------------
  iconsServ.getSocialAPI("whats").subscribe(data => {
    for (const key in data) {
      this.whatsapp.push(data[key])
    }
  })
  // ----------------------- get instagram -----------------------
  iconsServ.getSocialAPI("insta").subscribe(data => {
    for (const key in data) {
      this.instagram.push(data[key])
    }
  })
  // ----------------------- get snapchat -----------------------
  iconsServ.getSocialAPI("snapchat").subscribe(data => {
    for (const key in data) {
      this.snapchat.push(data[key])
    }
  })
  // ----------------------- get facebook -----------------------
  iconsServ.getSocialAPI("facebook").subscribe(data => {
    for (const key in data) {
      this.facebook.push(data[key])
    }
  })
  // ----------------------- get snapchat -----------------------
  iconsServ.getSocialAPI("youtube").subscribe(data => {
    for (const key in data) {
      this.youtube.push(data[key])
    }
  })
}
  //----------------------------------------------------------------


  toggler(event:Event){
    event.preventDefault()
  }

}
