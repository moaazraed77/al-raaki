import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { images } from 'src/app/Modal/interfaces/images.interface';
import { HomeDataService } from 'src/app/services/home-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  
  dataListStatic: images[] = [];
  
  dataListMoving: images[] = [];
  
  constructor(private homeDataServ:HomeDataService ,private toastr:ToastrService){
    homeDataServ.getDataAPI("homeDataCarasouel").subscribe({
      next: data => {
        for (const key in data) {
          this.dataListMoving.push(data[key])
        }
      },
      error: () => { this.toastr.error("Error Connection ", " Data Incompleted"); },
      complete: () => {    }
    })
    homeDataServ.getDataAPI("homeDataStatic").subscribe({
      next: data => {
        for (const key in data) {
          this.dataListStatic.push(data[key])
        }
      },
      error: () => { this.toastr.error("Error Connection ", " Data Incompleted"); },
      complete: () => {    }
    })
  }
}
