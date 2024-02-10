import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-sounds',
  templateUrl: './sounds.component.html',
  styleUrls: ['./sounds.component.scss']
})
export class SoundsComponent {

  controlView: string = "add-data";

  uploading: any = "";

  soundArray: any[] = [{ id: 1, url: "https://www.youtube.com/embed/qrolVhT05iQ", title: "تلاوة هادئة .. القارئ هزاع البلوشي  " }, { id: 2, url: "https://www.youtube.com/embed/1O_VxbrzWHQ", title: "هزاع البلوشي تلاوة خاشعة لعلاج ضيق الصدر والهم ارح مسمعك واسمعها  " }, { id: 3, url: "https://www.youtube.com/embed/MagEXhAbLkM", title: "سورة البقرة بصوت هزاع البلوشي بجودة عالية" }]

  deletedItem:any={}

  constructor(private formBuilder:FormBuilder){}
  
  sound=this.formBuilder.group({
    id:[new Date().getTime()],
    title:[""],
    url:[""],
  })

  dataControl(){
    if(this.controlView=="add-data")
    this.sound.patchValue({
      id:new Date().getTime(),
      title:"",
      url:"",
    })
  }

  // promo upload to show which files uploaded and the size of each photo
  upload(event: any) {
    const files = event.target.files[0];
    let loader = new FileReader();
    if (event.target.files[0].size / 1024 > 30)
      loader.readAsDataURL(event.target.files[0])
    loader.onload = (event) => {
      this.uploading = event.target?.result;  // show the photos before uploading
    }
  }

  edit(item:any){
    this.sound.patchValue({
      id:item.id,
      title:item.title,
      url:item.url,
    })
  }

  set_delete(item:any){
    this.deletedItem=item;
  }
}
