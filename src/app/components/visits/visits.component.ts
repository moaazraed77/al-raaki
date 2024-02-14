import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { visit } from 'src/app/Modal/interfaces/visit.interface';
import { VisitsService } from 'src/app/services/visits.service';

@Component({
  selector: 'app-visits',
  templateUrl: './visits.component.html',
  styleUrls: ['./visits.component.scss']
})
export class VisitsComponent {
  
  dataList: visit[] = [];
  
  constructor(private visitsServ:VisitsService ,private toastr:ToastrService){
    visitsServ.getDataAPI().subscribe({
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
