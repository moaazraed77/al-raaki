import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-dash',
  templateUrl: './login-dash.component.html',
  styleUrls: ['./login-dash.component.scss']
})
export class LoginDashComponent {

  constructor(private formBuilder:FormBuilder){}

  error:boolean=false;
  
  login=this.formBuilder.group({
    email:["",Validators.required],
    pass:["",Validators.required]
  })

  submit(){

  }
}
