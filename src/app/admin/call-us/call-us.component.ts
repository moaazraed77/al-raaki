import { Component } from '@angular/core';

@Component({
  selector: 'app-call-us',
  templateUrl: './call-us.component.html',
  styleUrls: ['./call-us.component.scss']
})
export class CallUsComponent {

  controlView:string="show-data";
  
  showItem:any={};

  callUsArray:any[]=[
    {id:1, email:"medo@gmail.com",msg:"Welcome"},
    {id:2, email:"admin@admin.com",msg:"Hello"},
    {id:3, email:"welcome@gmail.com",msg:"hi"},
  ]
  
  dataControl(){

  }

  set_delete(item:any){

  }
  
}

