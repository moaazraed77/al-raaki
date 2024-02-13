import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FatawyService } from 'src/app/services/fatawy.service';

@Component({
  selector: 'app-fatawy',
  templateUrl: './fatawy.component.html',
  styleUrls: ['./fatawy.component.scss']
})
export class FatawyComponent {

  controlView: string = "add-data";

  uploading: any = "";

  soundFile: any = {}

  progressBarWidth: number = -1;

  editObjectPromo: any = "";

  deleteObjectPromo: any = "";

  fatawyArray: any[] = []

  resetView() {
    this.uploading=""
    this.progressBarWidth = -1;
    this.editObjectPromo = {};
    this.deleteObjectPromo = {}
    this.soundFile = null;
    this.controlView="add-data"
      this.fatawy.patchValue({
        id: new Date().getTime(),
        title: "",
        audio: "",
      })
  }

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private http: HttpClient,
    private firestorage: AngularFireStorage, private fatawyServ: FatawyService) { }

  fatawy = this.formBuilder.group({
    id: [new Date().getTime()],
    title: ["", Validators.required],
    audio: ["", Validators.required],
  })

  getData() {
    this.fatawyArray = [];
    this.controlView = 'show-data';
    this.fatawyServ.getDataAPI().subscribe(data => {
      for (const key in data) {
        this.fatawyArray.push(data[key])
      }
    })
  }
  // promo upload to show which files uploaded and the size of each photo
  upload(event: any) {
    this.progressBarWidth=-1
    this.soundFile = event.target.files[0];
    let loader = new FileReader();
    if ((event.target.files[0].size / 1024) / 1024 <= 10) {
      loader.readAsDataURL(event.target.files[0])
      loader.onload = (event) => {
        this.uploading = event.target?.result;  // show the photos before uploading
      }
    } else {
      this.toastr.error("MB حجم الملف اكبر من 10 ")
    }
  }

  // -------------- funcion to upload img file and get image url ---- on firebase --------------
  async uploadFile(file: any) {
    if (file) {
      const path = `alraaki/${new Date().getTime()}${file.name}`; // we make name of file in firebase storage 
      const uploadTask = this.firestorage.upload(path, file)
      uploadTask.percentageChanges().subscribe(data => {
        this.progressBarWidth = data!
      })
      this.fatawy.patchValue({
        id: new Date().getTime(),
        audio: (await (await uploadTask).ref.getDownloadURL()).toString()
      })
    }
  }

  async submit() {
    if (this.fatawy.get("audio")?.value! != null && this.fatawy.get("audio")?.value! != "" &&
      this.fatawy.get("audio")?.value! != undefined && this.fatawy.get("title")?.value! != "") {
      if (this.controlView == "add-data") {
        await this.fatawyServ.postFatawyData(this.fatawy.value)
      }
      else {
        await this.fatawyServ.editData(this.editObjectPromo, this.fatawy.value)
        if (this.editObjectPromo.audio != this.fatawy.get("audio")?.value!)
          await this.firestorage.storage.refFromURL(this.editObjectPromo.audio).delete() // to delete the file from Firebase Storage
      }
      this.resetView()
    } else {
      this.toastr.error("راجع بيانات الفتوي")
    }
  }


  edit(item: any) {
    this.uploading=""
    this.editObjectPromo = item;
    this.fatawy.patchValue({
      id: item.id,
      title: item.title,
      audio: item.audio,
    })
  }

  set_delete(item: any) {
    this.deleteObjectPromo = item;
    this.fatawyServ.getDataAPI().subscribe({
      next: data => {
        for (const key in data) {
          if (item.id == data[key].id) {
            this.http.delete(`${this.fatawyServ.url}/fatawy/${key}.json`).subscribe(() => {
               this.firestorage.storage.refFromURL(item.audio).delete() // to delete the file from Firebase Storage
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
