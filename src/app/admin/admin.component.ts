import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  constructor(private route:Router){}

  signOut(){
    sessionStorage.removeItem("Admin")
    this.route.navigate(["/"])
  }

}
