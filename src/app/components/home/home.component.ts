import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  upload(event:any){
    const files=event.target.files;
      let loader=new FileReader();
      loader.readAsDataURL(event.target.files[0])
      loader.onload=(event)=>{
        console.log(event.target?.result);  // show the photos before uploading
      }
    }

}
