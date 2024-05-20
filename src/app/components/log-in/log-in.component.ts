import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { addDoc, collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { LoginService } from '../../services/login.service';
//import { User } from '../../user';


@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {
  //user!: User;
  email!: string;
  password!:string;
  logsCol: any[]=[];
  //countLogs:number = 0;

  constructor(private auth:Auth, private firestore: Firestore, private router: Router){}

  GoTo(path: string){
    this.router.navigate([path]);
  }

  Logs(){
    let col = collection(this.firestore, 'logs');
    addDoc(col, {date: new Date(), "user": this.email})
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

  

  GetLogs(){// te trae todos los logs, en realidad no necesito esto (ahora)
    let col = collection(this.firestore, 'logs');
    const obs = collectionData(col);
    obs.subscribe((response)=>{
      this.logsCol = response;
     //this.countLogs = this.logsCol.length;
    })
  }
}
