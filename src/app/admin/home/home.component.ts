import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { images } from 'src/app/Modal/interfaces/images.interface';
import { HomeDataService } from 'src/app/services/home-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', '../../Modal/main-style.css']
})
export class HomeComponent {

  controlView: string = "add-data-moving";
  editObjectPromo: any = "";
  deleteObjectPromo: any = "";

  imgMovementFile: any = "";
  imgStacticFile: any = "";
  imgMovmentSize: boolean = false;

  imgMovementPromoURL: any = "";
  imgStacticPromoURL: any = "";
  imgStacticSize: boolean = false;

  dataList: images[] = []

  constructor(private toastr: ToastrService, private formBuilder: FormBuilder, private http: HttpClient,
    private homeDataServ: HomeDataService, private firestorage: AngularFireStorage) {
  }

  staticImage = this.formBuilder.group({
    id: [new Date().getTime()],
    img: ["", Validators.required],
  })
  movingImage = this.formBuilder.group({
    id: [new Date().getTime()],
    img: ["", Validators.required],
  })

  dataControl() {
    this.imgMovementFile = "";
    this.imgStacticFile = "";
    this.editObjectPromo = ""
    this.imgStacticPromoURL = ""
    this.imgMovementPromoURL = ""
    this.staticImage.patchValue({
      id: new Date().getTime(),
      img: "",
    })
    this.movingImage.patchValue({
      id: new Date().getTime(),
      img: "",
    })
  }

  getMovmentData() {
    this.dataList = [];
    this.homeDataServ.getDataAPI("movingImages").subscribe({
      next: data => {
        for (const key in data) {
          this.dataList.push(data[key])
        }
        this.controlView = 'show-data-moving'
      },
      error: () => { this.toastr.error("Error Connection ", " Data Incompleted"); },
      complete: () => { }
    })
  }

  getStaticData() {
    this.dataList = [];
    this.controlView = 'show-data-static'
    this.homeDataServ.getDataAPI("staticImages").subscribe({
      next: data => {
        for (const key in data) {
          this.dataList.push(data[key])
        }
      },
      error: () => { this.toastr.error("Error Connection ", " Data Incompleted"); },
      complete: () => { }
    })
  }

  // promo image upload to show which files uploaded and the size of each photo
  uploadMovingImage(event: any) {
    this.imgMovementFile = event.target.files[0];
    let loader = new FileReader();
    if (event.target.files[0].size / 1024 <= 30) {
      loader.readAsDataURL(event.target.files[0])
      loader.onload = (event) => {
        this.imgMovementPromoURL = event.target?.result;  // show the photos before uploading
      }
      this.imgMovmentSize = true;
    } else {
      this.toastr.error(" 30 kb  حجم الصورة اكبر من ")
      this.imgMovmentSize = false;
    }
  }
  // promo image upload to show which files uploaded and the size of each photo
  uploadStaticImage(event: any) {
    this.imgStacticFile = event.target.files[0];
    let loader = new FileReader();
    if (event.target.files[0].size / 1024 <= 30) {
      loader.readAsDataURL(event.target.files[0])
      loader.onload = (event) => {
        this.imgStacticPromoURL = event.target?.result;  // show the photos before uploading
      }
      this.imgStacticSize = true;
    }
    else {
      this.toastr.error(" 30 kb  حجم الصورة اكبر من ")
    }
    this.imgStacticSize = true;
  }

  // submit Movment Data on firebase 
  async submitMovmentImage() {
    this.toastr.info("يتم رفع الصورة حاليا", "يرجي الانتظار")
    await this.uploadFile(this.imgMovementFile, "movmentImage")  // wait until file is uploaded
    if (this.imgMovementPromoURL && this.controlView === "add-data-moving") {
      this.homeDataServ.postCarasouelData(this.movingImage.value!)
      this.dataControl()
    } else if (this.controlView === "edit-data-moving") {
      this.setEditValueOnServer("homeDataCarasouel")
    }
  }
  // submit Static Data on firebase 
  async submitStaticImage() {
    this.toastr.info("يتم رفع الصورة حاليا", "يرجي الانتظار")
    await this.uploadFile(this.imgStacticFile, "staticImage") // wait until file is uploaded
    if (this.imgStacticPromoURL && this.controlView === "add-data-static") {
      this.homeDataServ.postStaticData(this.staticImage.value!)
      this.dataControl()
    } else if (this.controlView === "edit-data-static") {
      this.setEditValueOnServer("homeDataStatic")
    }
  }

  // -------------- funcion to upload img file and get image url ---- on firebase --------------
  async uploadFile(file: any, type: string) {
    if (file) {
      const path = `alraaki/${new Date().getTime()}${file.name}`; // we make name of file in firebase storage 
      const uploadTask = await this.firestorage.upload(path, file);
      if (type == "staticImage") {
        this.staticImage.patchValue({
          id: new Date().getTime(),
          img: await uploadTask.ref.getDownloadURL()
        })
      } else {
        this.movingImage.patchValue({
          id: new Date().getTime(),
          img: await uploadTask.ref.getDownloadURL()
        })
      }
    }
  }

  edit(item: images) {
    if (this.controlView == "show-data-moving") {
      this.editObjectPromo = item
      this.controlView = "edit-data-moving";
    }
    else {
      this.editObjectPromo = item
      this.controlView = "edit-data-static"
    }
  }
  setEditValueOnServer(type: string) {
    this.firestorage.storage.refFromURL(this.editObjectPromo.img).delete() // to delete the file from Firebase Storage
    if (type === "homeDataCarasouel")
      this.homeDataServ.editData(this.editObjectPromo, this.movingImage.value, type)
    else if (type === "homeDataStatic")
      this.homeDataServ.editData(this.editObjectPromo, this.staticImage.value, type)
  }

  set_delete(item: images, type: string) {
    this.homeDataServ.getDataAPI(type).subscribe({
      next: data => {
        for (const key in data) {
          if (item.id == data[key].id) {
            this.http.delete(`${this.homeDataServ.url}/${type}/${key}.json`).subscribe(() => {
              this.firestorage.storage.refFromURL(item.img).delete() // to delete the file from Firebase Storage
              this.toastr.success("تم حذف الصورة ");
              if (type == "homeDataCarasouel")
                this.getMovmentData()
              else
                this.getStaticData()
            });
            break;
          }
        }
      },
    })
  }

}
