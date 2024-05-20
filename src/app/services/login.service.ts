import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword/*, fetchSignInMethodsForEmail*/, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { User, UserCredential, sendPasswordResetEmail } from 'firebase/auth';
import { Observable } from 'rxjs';
//import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private auth:Auth, private router:Router) { }

  async LogIn(): Promise<void> { //
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, this.email, this.password)
        if (userCredential.user){
          this.Logs(); //esto es otro servicio
          this.GoTo('/home');
        }
    }catch(error: any){
      console.log(error.code);
  }

  CloseSession() {
    return this.auth.signOut();
  }

}
