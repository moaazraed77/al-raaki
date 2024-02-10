import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', '../../Modal/main-style.css']
})
export class HomeComponent {

  controlView: string = "add-data-moving";
  editImageURL: string = "";
  deleteImageURL: any = "";
  imgMovementURL: any = "";
  imgStacticURL: any = "";
  dataList: any[] = [];
  dataList1: any[] = [{ id: 1, img: 'assets/1.jpg' }, { id: 1, img: 'assets/3.jpg' }, { id: 1, img: 'assets/2.jpg' }];
  dataList2: any[] = [{ id: 1, img: 'assets/4.jpg' }, { id: 1, img: 'assets/5.jpg' }, { id: 1, img: 'assets/6.jpg' }];

  constructor(private toastr: ToastrService, private formBuilder: FormBuilder) { }

  staticImage = this.formBuilder.group({
    id: [new Date().getTime()],
    img: [""],
  })

  movingImage = this.formBuilder.group({
    id: [new Date().getTime()],
    img: [""],
  })

  dataControl() {
    this.editImageURL = ""
    this.imgStacticURL = ""
    this.imgMovementURL = ""
  }

  // promo image upload to show which files uploaded and the size of each photo
  uploadMovingImage(event: any) {
    const files = event.target.files[0];
    let loader = new FileReader();
    if (event.target.files[0].size / 1024 <= 30) {
      loader.readAsDataURL(event.target.files[0])
      loader.onload = (event) => {
        this.imgMovementURL = event.target?.result;  // show the photos before uploading
      }
    } else {
      this.toastr.error(" 30 kb  حجم الصورة اكبر من ")
    }
  }
  // promo image upload to show which files uploaded and the size of each photo
  uploadStaticImage(event: any) {
    const files = event.target.files[0];
    let loader = new FileReader();
    if (event.target.files[0].size / 1024 <= 30) {
      loader.readAsDataURL(event.target.files[0])
      loader.onload = (event) => {
        this.imgStacticURL = event.target?.result;  // show the photos before uploading
      }
    }
    else {
      this.toastr.error(" 30 kb  حجم الصورة اكبر من ")
    }
  }

  edit(item: any) {
    if (this.controlView == "show-data-moving") {
      this.editImageURL = item.img
      this.controlView = "edit-data-moving"
    }
    else {
      this.editImageURL = item.img
      this.controlView = "edit-data-static"
    }
  }

  set_delete(item: any) {

  }



}
