import { Component, ElementRef, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { fatawy } from 'src/app/Modal/interfaces/fatawy.interface';
import { FatawyService } from 'src/app/services/fatawy.service';

@Component({
  selector: 'app-fatawy',
  templateUrl: './fatawy.component.html',
  styleUrls: ['./fatawy.component.scss']
})
export class FatawyComponent implements OnDestroy{

  play:number=0;

  dataList:fatawy[]=[]

  subscription: Subscription[] = []

  constructor(private fatawyServ:FatawyService, private toastr:ToastrService){

    // if (sessionStorage.getItem("page-attitude") != "fatawy-page-working-fine") {
    //   sessionStorage.setItem("page-attitude", "fatawy-page-working-fine")
    //   window.location.reload()
    // }

    this.subscription.push(fatawyServ.getDataAPI().subscribe(data=>{
      for (const key in data) {
        this.dataList.push(data[key])
      }
    }))
  }

  showToastr(id:number){
    this.play=id;
    // this.toastr.success("يتم تحميل الفتوي حاليا يرجي الانتظار")
  }

  ngOnDestroy(): void {
    for (const item of this.subscription) {
      item.unsubscribe()
    }
  }
}
