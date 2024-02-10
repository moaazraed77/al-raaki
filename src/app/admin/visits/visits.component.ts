import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-visits',
  templateUrl: './visits.component.html',
  styleUrls: ['./visits.component.scss', '../../Modal/main-style.css']
})
export class VisitsComponent {

  controlView: string = "add-data";

  uploading: any = "";

  editImageURL: string = ""

  deleteImageURL: any = ""

  visitsList: any[] = [{ id: 1, img: 'assets/1.jpg' }, { id: 1, img: 'assets/3.jpg' }, { id: 1, img: 'assets/2.jpg' }];

  constructor(private toastr: ToastrService, private formBuilder: FormBuilder) { }

  visit = this.formBuilder.group({
    id: [new Date().getTime()],
    img: [""],
  })

  dataControl() {
    if (this.controlView == "add-data") {
      this.editImageURL = ""
      this.uploading = ""
    }
  }

  // promo upload to show which files uploaded and the size of each photo
  upload(event: any) {
    const files = event.target.files[0];
    let loader = new FileReader();
    if (event.target.files[0].size / 1024 <= 30) {
      loader.readAsDataURL(event.target.files[0])
      loader.onload = (event) => {
        this.uploading = event.target?.result;  // show the photos before uploading
      }
    } else {
      this.toastr.error(" 30 kb  حجم الصورة اكبر من ")
    }
  }

  edit(item: any) {
    this.editImageURL = item.img
    this.controlView = "edit-data";
    this.uploading = ""
  }

  set_delete(item: any) {

  }

}
