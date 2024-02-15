import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { aboutUS } from 'src/app/Modal/interfaces/about-us..interface';
import { AboutUsService } from 'src/app/services/about-us.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss','../../Modal/main-style.css']
})
export class AboutUsComponent {

  dataList: aboutUS[] = [];
  
  constructor(private aboutUsServ:AboutUsService ,private toastr:ToastrService){
    // if(sessionStorage.getItem("page-attitude")!="aboutUs-page-working-fine"){
    //   sessionStorage.setItem("page-attitude","aboutUs-page-working-fine")
    //   window.location.reload()
    // }
    aboutUsServ.getDataAPI().subscribe({
      next: data => {
        for (const key in data) {
          this.dataList.push(data[key])
        }
      },
      error: () => { this.toastr.error("Error Connection ", " Data Incompleted"); },
      complete: () => {    }
    })
  }
}
