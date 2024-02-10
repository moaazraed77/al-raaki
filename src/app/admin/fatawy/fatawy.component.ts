import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-fatawy',
  templateUrl: './fatawy.component.html',
  styleUrls: ['./fatawy.component.scss']
})
export class FatawyComponent {

  controlView:string="add-data";
  
  uploading:any="";
  
  deletedItem:any = {};

  fatawyArray:any[]=[{id:1,src:"assets/a.mp3", title:"مشاري راشد"},{id:2,src:"assets/b.mp3", title:"هزاع البلوشي"},{id:3,src:"assets/c.mp3", title:"سعد الغامدي"}]
  
  dataControl(){
    if(this.controlView=="add-data")
    this.fatawy.patchValue({
      id:new Date().getTime(),
      title:"",
      src:null,
    })
  }

  constructor(private formBuilder:FormBuilder){}

  fatawy=this.formBuilder.group({
    id:[new Date().getTime()],
    title:[""],
    src:[],
  })

  // promo upload to show which files uploaded and the size of each photo
  upload(event:any){
    const files=event.target.files[0];
    let loader=new FileReader();
    if(event.target.files[0].size/1024 > 30)
    loader.readAsDataURL(event.target.files[0])
    loader.onload=(event)=>{
      this.uploading=event.target?.result;  // show the photos before uploading
    }
  }

  edit(item:any){
    this.fatawy.patchValue({
      id:item.id,
      title:item.title,
      src:item.text,
    })
  }

  set_delete(item:any){
    this.deletedItem=item;
  }
  
}
