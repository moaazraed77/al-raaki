import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, PatternValidator, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { sound } from 'src/app/Modal/interfaces/sound..interface';
import { SoundsService } from 'src/app/services/sounds.service';

@Component({
  selector: 'app-sounds',
  templateUrl: './sounds.component.html',
  styleUrls: ['./sounds.component.scss']
})
export class SoundsComponent {

  controlView: string = "add-data";

  soundArray: sound[] = []

  deletedItem: any = {}

  editItem: any = {}

  showVideoPromo = false

  constructor(private formBuilder: FormBuilder, private soundServ: SoundsService, private toastr: ToastrService, private http: HttpClient) {

  }


  sound = this.formBuilder.group({
    id: [new Date().getTime()],
    title: ["", Validators.required],
    url: ["", Validators.required],
  })

  resetView() {
    this.controlView = "add-data"
    this.sound.patchValue({
      id: new Date().getTime(),
      title: "",
      url: "",
    })
    this.showVideoPromo = false
  }

  resetURL() {
    this.sound.patchValue({
      url: "",
    })
    this.showVideoPromo = false
  }

  getData() {
    this.soundArray = []
    this.soundServ.getDataAPI().subscribe({
      next: data => {
        for (const key in data) {
          this.soundArray.push(data[key])
        }
      }
    })
    this.controlView = 'show-data';
  }

  async setYoutubeURL() {
    if (this.sound.value.url?.startsWith("https://youtu.be/")) {
      this.sound.patchValue({
        url: `https://www.youtube.com/embed/${this.sound.value.url?.slice(("https://youtu.be/").length, this.sound.value.url.indexOf("?"))}`
      })
    } else {
      this.sound.patchValue({
        url: `https://www.youtube.com/embed/${this.sound.value.url?.slice(this.sound.value.url.indexOf("=") + 1, this.sound.value.url.length)}`
      })
    }

    this.showVideoPromo = true
    if (this.sound.value.url === "https://www.youtube.com/embed/")
      this.resetURL()
  }


  submit() {
    if (this.sound.valid && this.controlView === "add-data") {
      this.soundServ.postSoundData(this.sound.value).then(() => {
        this.resetView()
      })
    } else if (this.sound.valid && this.controlView === "edit-data") {
      this.soundServ.editData(this.sound.value).then(() => {
        this.resetView()
      })
    } else {
      this.toastr.error("البيانات غير مكتملة ");
      this.resetView()
    }
  }

  edit(item: any) {
    this.editItem = item
    this.sound.patchValue({
      id: item.id,
      title: item.title,
      url: item.url,
    })
  }

  set_delete(item: sound) {
    this.soundServ.getDataAPI().subscribe({
      next: data => {
        for (const key in data) {
          if (item.id == data[key].id) {
            this.http.delete(`${this.soundServ.url}/sound/${key}.json`).subscribe(() => {
              this.toastr.success("تم حذف الصورة ");
              this.getData()
            });
            break;
          }
        }
      },
    })
  }
}
