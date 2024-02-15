import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SocialMediaService } from 'src/app/services/social-media.service';

@Component({
  selector: 'app-social-icons',
  templateUrl: './social-icons.component.html',
  styleUrls: ['./social-icons.component.scss']
})
export class SocialIconsComponent {

  constructor(private socialServ: SocialMediaService, private formBuilder: FormBuilder,private toastr: ToastrService) {}

  whatsapp=this.formBuilder.group({
    id:["phone"],
    social:[""],
  })

  instagram=this.formBuilder.group({
    id:["instagram"],
    social:[""],
  })

  snapchat=this.formBuilder.group({
    id:["snapchat"],
    social:[""],
  })

  twitter=this.formBuilder.group({
    id:["youtube"],
    social:[""],
  })

  facebook=this.formBuilder.group({
    id:["facebook"],
    social:[""],
  })


   //------------------------------------ update what's app ------------------------------------
   submitWhats(){
    this.socialServ.updateWhatsapp(this.whatsapp.value)
  }
  submitInstagram(){
    this.socialServ.updateInstagram(this.instagram.value)
  }
  submitSnapChat(){
    this.socialServ.updateSnapChat(this.snapchat.value)
  }
  submitYoutube(){
    this.socialServ.updateYoutube(this.twitter.value)
  }
  submitfacebook(){
    this.socialServ.updatefacebook(this.facebook.value)
  }

}
