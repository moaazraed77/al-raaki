import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { aboutUS } from 'src/app/Modal/interfaces/about-us..interface';
import { AboutUsService } from 'src/app/services/about-us.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss', '../../Modal/admin-style.css', '../../Modal/main-style.css']
})
export class AboutUsComponent {

  controlView: string = "add-data";

  uploading: any = "";

  aboutUsList: any[] = []

  deletedItem: any = {};

  constructor(private formBuilder: FormBuilder, private aboutUsServ: AboutUsService, private http: HttpClient, private toastr: ToastrService) { }

  about = this.formBuilder.group({
    id: [new Date().getTime()],
    title: [""],
    text: [""],
  })

  resetView() {
    if (this.controlView == "add-data")
      this.about.patchValue({
        id: new Date().getTime(),
        title: "",
        text: "",
      })
  }

  async submit() {
    if (this.controlView === "add-data" && (this.about.get("title")?.value != "" || this.about.get("text")?.value != "")) {
      this.aboutUsServ.postAboutData(this.about.value!)
      this.resetView()
    } else if (this.controlView === "edit-data") {
      this.aboutUsServ.editData(this.about.value)
    }
  }

  getAboutData() {
    this.aboutUsList = [];
    this.aboutUsServ.getDataAPI().subscribe({
      next: data => {
        for (const key in data) {
          this.aboutUsList.push(data[key])
        }
        this.controlView = 'show-data'
      },
      error: () => { this.toastr.error("Error Connection ", " Data Incompleted"); },
      complete: () => { }
    })
  }

  edit(item: any) {
    this.about.patchValue({
      id: item.id,
      title: item.title,
      text: item.text,
    })
  }

  set_delete(item: aboutUS) {
    this.aboutUsServ.getDataAPI().subscribe({
      next: data => {
        for (const key in data) {
          if (item.id == data[key].id) {
            this.http.delete(`${this.aboutUsServ.url}/aboutUS/${key}.json`).subscribe(() => {
              this.toastr.success("تم حذف الصورة ");
              this.getAboutData()
            });
            break;
          }
        }
      },
    })
  }
}
