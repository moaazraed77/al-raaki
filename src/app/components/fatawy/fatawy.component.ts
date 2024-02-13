import { Component, ElementRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { fatawy } from 'src/app/Modal/interfaces/fatawy.interface';
import { FatawyService } from 'src/app/services/fatawy.service';

@Component({
  selector: 'app-fatawy',
  templateUrl: './fatawy.component.html',
  styleUrls: ['./fatawy.component.scss']
})
export class FatawyComponent {

  play:number=0;

  dataList:fatawy[]=[]

  constructor(private fatawyServ:FatawyService, private toastr:ToastrService){

    fatawyServ.getDataAPI().subscribe(data=>{
      for (const key in data) {
        this.dataList.push(data[key])
      }
    })
  }

  showToastr(id:number){
    this.play=id;
    // this.toastr.success("يتم تحميل الفتوي حاليا يرجي الانتظار")
  }

}
