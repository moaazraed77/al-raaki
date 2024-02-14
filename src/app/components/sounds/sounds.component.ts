import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { sound } from 'src/app/Modal/interfaces/sound..interface';
import { SoundsService } from 'src/app/services/sounds.service';

@Component({
  selector: 'app-sounds',
  templateUrl: './sounds.component.html',
  styleUrls: ['./sounds.component.scss','../../Modal/main-style.css']
})
export class SoundsComponent {

dataList: sound[] = [];

constructor(private soundServ:SoundsService ,private toastr:ToastrService){
  soundServ.getDataAPI().subscribe({
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