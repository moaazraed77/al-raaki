import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { sound } from 'src/app/Modal/interfaces/sound..interface';
import { SoundsService } from 'src/app/services/sounds.service';

@Component({
  selector: 'app-sounds',
  templateUrl: './sounds.component.html',
  styleUrls: ['./sounds.component.scss', '../../Modal/main-style.css']
})
export class SoundsComponent implements OnDestroy {

  dataList: sound[] = [];

  subscription: Subscription[] = []

  constructor(private soundServ: SoundsService, private toastr: ToastrService) {
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