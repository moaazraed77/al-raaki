import { Component } from '@angular/core';

@Component({
  selector: 'app-call-us',
  templateUrl: './call-us.component.html',
  styleUrls: ['./call-us.component.scss']
})
export class CallUsComponent {

  constructor() {
    if (sessionStorage.getItem("page-attitude") != "callUs-page-working-fine") {
      sessionStorage.setItem("page-attitude", "callUs-page-working-fine")
      window.location.reload()
    }
  }

}
