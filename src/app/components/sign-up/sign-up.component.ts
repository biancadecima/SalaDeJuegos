import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { addDoc, collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2'




@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  //newEmail!:string;
 // newUsername!:string;
  //newPassword!:string;

  user ={
    username: '',
    email: '',
    password: ''
  }
  public error: boolean = false;
  public message: string = '';
  //isLoggedIn:boolean = false;

  constructor(private firestore: Firestore, public AuthService: AuthService, private router: Router){}

  GoTo(path: string){
    this.router.navigate([path]);
  }

  Toast = Swal.mixin({
    toast: true,
    position: 'bottom',
    iconColor: 'white',
    customClass: {
      popup: 'colored-toast',
    },
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
  })

  errorMessage(msj:any){
    this.Toast.fire({
      icon: 'error',
      title: msj,
    })
  }

  SignUp(){
    console.log(this.user);
    const { username, email, password } = this.user;
    this.AuthService.signUp(username, email, password).then((res) => {
      if (res !== '') {
        this.error = true;
        this.message = res;
       // console.log('errooooor');
       // console.log(res);
      } else {
        this.error = false;
        this.router.navigateByUrl('home');
      }
    });
  }
  
/*
  async SignUp(): Promise<void> {//
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, this.newEmail, this.newPassword);

      if (userCredential.user) { // Ensure user object exists
        const col = collection(this.firestore, 'users');
        await addDoc(col, { email: this.newEmail, username: this.newUsername });
        //this.isLoggedIn = true;
        this.GoTo('/home');
        //this.errorMessage('Sign Up Successful!'); // Success message
      }
    } catch (error: any) {
      switch (error.code) {
        case 'auth/invalid-email':
          this.errorMessage('Ingrese un email válido.');
          break;
        case 'auth/weak-password':
          this.errorMessage('La contraseña debe tener almenos 6 caracteres.'); 
          break;
        case 'auth/email-already-in-use':
          this.errorMessage('El email ya está en uso.');
          break;
        default:
          this.errorMessage('Ocurrió un error');
          break;
      }
    }*/
  
}
