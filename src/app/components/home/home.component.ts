import { Component, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { images } from 'src/app/Modal/interfaces/images.interface';
import { HomeDataService } from 'src/app/services/home-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {

  dataListStatic: images[] = [];

  subscription: Subscription[] = []

  dataListMoving: images[] = [];

  constructor(private homeDataServ: HomeDataService, private toastr: ToastrService) {

    // if (sessionStorage.getItem("page-attitude") != "home-page-working-fine") {
    //   sessionStorage.setItem("page-attitude", "home-page-working-fine")
    //   window.location.reload()
    // }

    this.subscription.push(homeDataServ.getDataAPI("homeDataCarasouel").subscribe({
      next: data => {
        for (const key in data) {
          this.dataListMoving.push(data[key])
        }
      },
      error: () => { },
      complete: () => { }
    }))

    this.subscription.push(homeDataServ.getDataAPI("homeDataStatic").subscribe({
      next: data => {
        for (const key in data) {
          this.dataListStatic.push(data[key])
        }
      },
      error: () => { this.toastr.error("Error Connection ", " Data Incompleted"); },
      complete: () => { }
    }))
  }

  ngOnDestroy(): void {
    for (const item of this.subscription) {
      item.unsubscribe()
    }
  }
}
