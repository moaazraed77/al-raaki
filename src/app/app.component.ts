import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SocialMediaService } from './services/social-media.service';
import { social } from './Modal/interfaces/social.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AlRaaki';

  viewHeader: boolean = true;

  whatsapp: social[] = []

  constructor(private route: Router, private iconsServ: SocialMediaService) {
    route.events.subscribe(ev => {
      if (ev instanceof NavigationEnd) {
        if (ev.url.includes("admin")) {
          this.viewHeader = false
        } else {
          this.viewHeader = true
        }
      }
    })
    // ----------------------- get whatsapp -----------------------
    iconsServ.getSocialAPI("whats").subscribe(data => {
      for (const key in data) {
        this.whatsapp.push(data[key])
      }
    })
  }


}
