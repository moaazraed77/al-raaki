import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { social } from 'src/app/Modal/interfaces/social.interface';
import { SocialMediaService } from 'src/app/services/social-media.service';

@Component({
  selector: 'app-call-us',
  templateUrl: './call-us.component.html',
  styleUrls: ['./call-us.component.scss']
})
export class CallUsComponent {

  whatsapp: social[] = []


  constructor(private formBuilder: FormBuilder, private iconsServ: SocialMediaService) {
    if (sessionStorage.getItem("page-attitude") != "callUs-page-working-fine") {
      sessionStorage.setItem("page-attitude", "callUs-page-working-fine")
      window.location.reload()
    }
    // ----------------------- get whatsapp -----------------------
    iconsServ.getSocialAPI("whats").subscribe(data => {
      for (const key in data) {
        this.whatsapp.push(data[key])
      }
    })
  }

  callUS = this.formBuilder.group({
    email: ["", Validators.required],
    type: ["", Validators.required],
    msg: ["", Validators.required]
  })



}
