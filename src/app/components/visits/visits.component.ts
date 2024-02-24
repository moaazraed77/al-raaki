import { Component, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { visit } from 'src/app/Modal/interfaces/visit.interface';
import { VisitsService } from 'src/app/services/visits.service';
import * as AOS from 'aos';

@Component({
  selector: 'app-visits',
  templateUrl: './visits.component.html',
  styleUrls: ['./visits.component.scss']
})
export class VisitsComponent implements OnDestroy {
  
  dataList: visit[] = [];
  
  subscription: Subscription[] = []

  constructor(private visitsServ:VisitsService ,private toastr:ToastrService){
    // if (sessionStorage.getItem("page-attitude") != "visits-page-working-fine") {
    //   sessionStorage.setItem("page-attitude", "visits-page-working-fine")
    //   window.location.reload()
    // }
    this.subscription.push(visitsServ.getDataAPI().subscribe({
      next: data => {
        for (const key in data) {
          this.dataList.push(data[key])
        }
      },
      error: () => { this.toastr.error("Error Connection ", " Data Incompleted"); },
      complete: () => {    }
    }))

    AOS.init();

  }

  ngOnDestroy(): void {
    for (const item of this.subscription) {
      item.unsubscribe()
    }
  }
}
