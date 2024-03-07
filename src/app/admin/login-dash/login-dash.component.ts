import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminAuthService } from 'src/app/services/admin-auth.service';

@Component({
  selector: 'app-login-dash',
  templateUrl: './login-dash.component.html',
  styleUrls: ['./login-dash.component.scss']
})
export class LoginDashComponent {

  constructor(private formBuilder:FormBuilder , private authService:AdminAuthService, private route:Router){}

  error:boolean=false;
  
  login=this.formBuilder.group({
    email:["",Validators.required],
    pass:["",Validators.required]
  })

  submit(){
    this.authService.signIN(this.login.value).then(()=>{
      this.route.navigate(["/admin"])
      this.error=false
    }).catch(()=>{
      this.error=true
    })
  }
}
