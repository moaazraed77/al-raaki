import { Component } from '@angular/core';

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  // upload(event:any){
  //   const files=event.target.files;
  //     let loader=new FileReader();
  //     loader.readAsDataURL(event.target.files[0])
  //     loader.onload=(event)=>{
  //       console.log(event.target?.result);  // show the photos before uploading
  //     }
  //   }

  toggler(event:Event){
    event.preventDefault()
  }

}
