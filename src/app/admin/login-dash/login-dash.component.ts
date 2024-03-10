import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminAuthService } from 'src/app/services/admin-auth.service';

@Component({
  selector: 'app-login-dash',
  templateUrl: './login-dash.component.html',
  styleUrls: ['./login-dash.component.scss']
})
export class LoginDashComponent {

  constructor(private formBuilder:FormBuilder , private authService:AdminAuthService, private route:Router, private toastr:ToastrService){}

  error:boolean=false;
  
  login=this.formBuilder.group({
    email:["",Validators.required],
    pass:["",Validators.required]
  })

  submit(){
    this.authService.signIN(this.login.value).then(()=>{
      this.toastr.success("تم تسجيل الدخول بنجاح")
      this.route.navigate(["/admin"])
      this.error=false
    }).catch(()=>{
      this.error=true
      this.toastr.error("خطاء في الايميل او كلمة المرور")
    })
  }
}
