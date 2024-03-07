import { Component, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { visuals } from 'src/app/Modal/interfaces/visuals.interface';
import { VisualsService } from 'src/app/services/visuals.service';

@Component({
  selector: 'app-visuals',
  templateUrl: './visuals.component.html',
  styleUrls: ['./visuals.component.scss', '../../Modal/main-style.css']
})
export class VisualsComponent implements OnDestroy {

  dataList: visuals[] = [];

  subscription: Subscription[] = []

  constructor(private visualsServ: VisualsService, private toastr: ToastrService) {
    // if (sessionStorage.getItem("page-attitude") != "visualss-page-working-fine") {
    //   sessionStorage.setItem("page-attitude", "visualss-page-working-fine")
    //   window.location.reload()
    // }

    this.subscription.push(visualsServ.getDataAPI().subscribe({
      next: data => {
        for (const key in data) {
          this.dataList.push(data[key])
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