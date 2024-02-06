import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AlRaaki';
  
  viewHeader:boolean=true;

  constructor (private route:Router){
    route.events.subscribe(ev=>{
      if(ev instanceof NavigationEnd){
        if(ev.url.includes("admin")){
          this.viewHeader=false
        }else{
          this.viewHeader=true
        }
      }
    })
  }


}
