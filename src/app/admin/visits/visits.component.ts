import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { images } from 'src/app/Modal/interfaces/images.interface';
import { VisitsService } from 'src/app/services/visits.service';

@Component({
  selector: 'app-visits',
  templateUrl: './visits.component.html',
  styleUrls: ['./visits.component.scss', '../../Modal/main-style.css']
})
export class VisitsComponent {

  controlView: string = "add-data";
  editObjectPromo: any = "";
  deleteObjectPromo: any = "";
  imgPromoURL: any = "";
  imageFile: any = {}
  visitsList: any[] = [];

  constructor(private toastr: ToastrService, private formBuilder: FormBuilder, private http: HttpClient,
    private visitsServ: VisitsService, private firestorage: AngularFireStorage) {
  }

  visit = this.formBuilder.group({
    id: [new Date().getTime()],
    img: [""],
    url: [""],
  })

  resetData() {
    this.editObjectPromo = "";
    this.imgPromoURL = "";
    this.visit.patchValue({
      id: new Date().getTime(),
      img: "",
      url: "",
    })
  }

  getVisitsData() {
    this.visitsList = [];
    this.visitsServ.getDataAPI().subscribe({
      next: data => {
        for (const key in data) {
          this.visitsList.push(data[key])
        }
        this.controlView = 'show-data'
      },
      error: () => { this.toastr.error("Error Connection ", " Data Incompleted"); },
      complete: () => { }
    })
  }

  // promo upload to show which files uploaded and the size of each photo
  upload(event: any) {
    this.imageFile = event.target.files[0];
    let loader = new FileReader();
    if (event.target.files[0].size / 1024 <= 30) {
      loader.readAsDataURL(event.target.files[0])
      loader.onload = (event) => {
        this.imgPromoURL = event.target?.result;  // show the photos before uploading
      }
    } else {
      this.toastr.error(" 30 kb  حجم الصورة اكبر من ")
    }
  }

  // submit  Data on firebase 
  async submitImage() {
    this.toastr.info("يتم رفع الصورة حاليا", "يرجي الانتظار")
    if (this.imgPromoURL != "")
      await this.uploadFile(this.imageFile)  // wait until file is uploaded
    if (this.imgPromoURL && this.controlView === "add-data") {
      await this.visitsServ.postVisitData(this.visit.value!)
    } else if (this.controlView === "edit-data") {
      await this.visitsServ.editData(this.editObjectPromo, this.visit.value)
    }
    this.resetData()
  }

  // -------------- funcion to upload img file and get image url ---- on firebase --------------
  async uploadFile(file: any) {
    if (file) {
      const path = `alraaki/${new Date().getTime()}${file.name}`; // we make name of file in firebase storage 
      const uploadTask = await this.firestorage.upload(path, file);
      this.visit.patchValue({
        id: new Date().getTime(),
        img: await uploadTask.ref.getDownloadURL()
      })
    }
  }

  edit(item: any) {
    this.editObjectPromo = item;
    this.controlView = "edit-data";
    this.imgPromoURL = "";
    this.visit.patchValue({
      id: new Date().getTime(),
      img: item.img,
      url: item.url,
    })
  }

  set_delete(item: images) {
    this.visitsServ.getDataAPI().subscribe({
      next: data => {
        for (const key in data) {
          if (item.id == data[key].id) {
            this.http.delete(`${this.visitsServ.url}/visits/${key}.json`).subscribe(() => {
              this.firestorage.storage.refFromURL(item.img).delete() // to delete the file from Firebase Storage
              this.toastr.success("تم حذف الصورة ");
              this.getVisitsData()
            });
            break;
          }
        }
      },
    })
  }


}
