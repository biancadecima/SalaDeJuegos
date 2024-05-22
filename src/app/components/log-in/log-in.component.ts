import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { addDoc, collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
//import { User } from '../../user';


@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {
  public user = {
    email: '',
    password: ''
  }
  public error: boolean = false;
  public message: string = '';

  constructor(private AuthService:AuthService, private router: Router){}

  LogIn(){
    console.log(this.user);
    const { email, password } = this.user;
    this.AuthService.logIn(email, password).then((res) => {
      if (res !== '') {
        this.error = true;
        this.message = res;
        console.log('errooooor login');
     //   console.log(res);
      } else {
        this.error = false;
        this.router.navigateByUrl('home');
      //  console.log('se logueó', res);
      }
    });
  }

  DirectAccess() {
    console.log(this.user);
    this.user.email = 'test@gmail.com';
    this.user.password = '123456';
  }

  /*async LogIn(): Promise<void> { //
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, this.email, this.password)
        if (userCredential.user){
          this.Logs();
          this.GoTo('/home');
        }
    }catch(error: any){
      console.log(error.code);
    }
  }*/

  
/*
  GetLogs(){// te trae todos los logs, en realidad no necesito esto (ahora)
    let col = collection(this.firestore, 'logs');
    const obs = collectionData(col);
    obs.subscribe((response)=>{
      this.logsCol = response;
     //this.countLogs = this.logsCol.length;
    })
  }*/
}
