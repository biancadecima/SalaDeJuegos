import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, authState } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { User, UserCredential, sendPasswordResetEmail } from 'firebase/auth';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth:Auth, 
              private storage:StorageService, 
              private router:Router) {}

  async logIn(email:string, password:string){
    let message: string = '';
    try{
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password)
      if(userCredential.user){
        this.storage.addLog(email);
      }
      return message;
    }catch (error: any) {
      switch (error.code) {
        case 'auth/invalid-email':
          message = 'Correo inválido';
          console.log('Correo inválido');
          break;
        case 'auth/user-not-found':
          message = 'Usuario no encontrado';
          console.log('Usuario no encontrado');
          break;
        case 'auth/wrong-password':
        case 'auth/missing-password':
          message = 'Contraseña inválida';
          console.log('Contraseña inválida');
          break;
        case 'auth/internal-error':
          message = 'Error interno';
          console.log('Error interno');
          break;
        case 'auth/too-many-requests':
          message = 'Muchas llamadas en poco tiempo';
          console.log('Muchas llamadas en poco tiempo');
          break;
        default:
          message = 'error.message';
          console.log(error);
          break;
      }
      return message;
    }
  }

  async signUp(username: string, email:string, password:string): Promise<string> {
    let message: string = '';
    try{
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      this.storage.addUser(email, username);
      return message;
    }catch (error: any) {
      switch (error.code) {
        case 'auth/invalid-email':
          message = 'Correo inválido';
          console.log('Correo inválido');
          break;
        case 'auth/email-already-in-use':
          message = 'Este correo ya está registrado';
          console.log('Este correo ya está registrado');
          break;
        case 'auth/email-already-exists':
          message = 'Este correo ya está registrado';
          console.log('Este correo ya está registrado');
          break;
        case 'auth/invalid-password':
          message = 'Contraseña inválida';
          console.log('Contraseña inválida');
          break;
        case 'auth/weak-password':
          message =
            'Error, ingrese una contraseña que tenga mas de 5 carácteres';
          console.log(
            'Error, ingrese una contraseña que tenga mas de 5 carácteres'
          );
          break;
        case 'auth/internal-error':
          message = 'Error interno';
          console.log('Error interno');
          break;
        case 'auth/too-many-requests':
          message = 'Muchas llamadas en poco tiempo';
          console.log('Muchas llamadas en poco tiempo');
          break;
        default:
          message = error.message;
          console.log(error.message);
          break;
      }
      return message;
    }
  }

  /*getLoggedUser() {
    return this.auth.currentUser;
  }*/

  getCurrentUser(): Observable<User | null> {
    return new Observable((observer) => {
      const unsubscribe = this.auth.onAuthStateChanged((user: User | null) => {
        observer.next(user);
      });
      return () => {
        unsubscribe();
      };
    });
  }

  signOut() {
    this.auth.signOut();
    console.log('usuario: ', this.auth.currentUser);
    this.router.navigate(['/log-in']);;
  }


}
