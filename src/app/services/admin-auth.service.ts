import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {

  constructor(private auth:Auth) { }

  signIN(data:any){
    // return createUserWithEmailAndPassword(this.auth,data.email,data.pass)
    return signInWithEmailAndPassword(this.auth,data.email,data.pass).then(()=>{
      sessionStorage.setItem("Admin" , "true")
    })
  }

}
