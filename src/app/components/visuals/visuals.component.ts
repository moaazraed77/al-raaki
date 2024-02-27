import { Component, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { sound } from 'src/app/Modal/interfaces/sound..interface';
import { VisualsService } from 'src/app/services/visuals.service';

@Component({
  selector: 'app-visuals',
  templateUrl: './visuals.component.html',
  styleUrls: ['./visuals.component.scss']
})
export class VisualsComponent implements OnDestroy {

  dataList: sound[] = [];

  subscription: Subscription[] = []

  constructor(private soundServ: VisualsService, private toastr: ToastrService) {
    // if (sessionStorage.getItem("page-attitude") != "sounds-page-working-fine") {
    //   sessionStorage.setItem("page-attitude", "sounds-page-working-fine")
    //   window.location.reload()
    // }

    this.subscription.push(soundServ.getDataAPI().subscribe({
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