import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { visuals } from 'src/app/Modal/interfaces/visuals.interface';
import { VisualsService } from 'src/app/services/visuals.service';

@Component({
  selector: 'app-visuals',
  templateUrl: './visuals.component.html',
  styleUrls: ['./visuals.component.scss']
})
export class VisualsComponent  {

  controlView: string = "add-data";

  visualsArray: visuals[] = []

  deletedItem: visuals = {} as visuals

  editItem: visuals = {} as visuals

  showVideoPromo = false

  constructor(private formBuilder: FormBuilder, private visualsServ: VisualsService, private toastr: ToastrService, private http: HttpClient) {

  }

  visuals = this.formBuilder.group({
    id: [new Date().getTime()],
    title: ["", Validators.required],
    url: ["", Validators.required],
  })

  resetView() {
    this.controlView = "add-data"
    this.visuals.patchValue({
      id: new Date().getTime(),
      title: "",
      url: "",
    })
    this.showVideoPromo = false
  }

  resetURL() {
    this.visuals.patchValue({
      url: "",
    })
    this.showVideoPromo = false
  }

  getData() {
    this.visualsArray = []
    this.visualsServ.getDataAPI().subscribe({
      next: data => {
        for (const key in data) {
          this.visualsArray.push(data[key])
        }
      }
    })
    this.controlView = 'show-data';
  }

  async setYoutubeURL() {
    if (this.visuals.value.url?.startsWith("https://youtu.be/")){
       this.visuals.patchValue({
        url: `https://www.youtube.com/embed/${this.visuals.value.url?.slice(("https://youtu.be/").length, this.visuals.value.url.indexOf("?"))}`
      })}else{
        this.visuals.patchValue({
          url: `https://www.youtube.com/embed/${this.visuals.value.url?.slice(this.visuals.value.url.indexOf("=") + 1, this.visuals.value.url.length)}`
        })
      }
      
    this.showVideoPromo = true
    if (this.visuals.value.url === "https://www.youtube.com/embed/")
      this.resetURL()
  }


  submit() {
    if (this.visuals.valid && this.controlView === "add-data") {
      this.visualsServ.postvisualsData(this.visuals.value).then(() => {
        this.resetView()
      })
    } else if (this.visuals.valid && this.controlView === "edit-data") {
      this.visualsServ.editData(this.visuals.value).then(() => {
        this.resetView()
      })
    } else {
      this.toastr.error("البيانات غير مكتملة ");
      this.resetView()
    }
  }

  edit(item: any) {
    this.editItem = item
    this.visuals.patchValue({
      id: item.id,
      title: item.title,
      url: item.url,
    })
  }

  set_delete(item: visuals) {
    this.visualsServ.getDataAPI().subscribe({
      next: data => {
        for (const key in data) {
          if (item.id == data[key].id) {
            this.http.delete(`${this.visualsServ.url}/visuals/${key}.json`).subscribe(() => {
              this.toastr.success("تم حذف الفيديو ");
              this.getData()
            });
            break;
          }
        }
      },
    })
  }
}
