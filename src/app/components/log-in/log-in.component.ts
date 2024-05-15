import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { addDoc, collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { User } from '../../user';


@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {
  user!: User;
  logsCol: any[]=[];
  countLogs:number = 0;

  constructor(private firestore: Firestore, private router: Router){}

  GoTo(path: string){
    this.router.navigate([path]);
  }

  Logs(){
    let col = collection(this.firestore, 'logs');
    addDoc(col, {date: new Date(), "user": this.user})
  }

  LogIn(){ //
    
  }

  GetLogs(){
    let col = collection(this.firestore, 'logs');
    const obs = collectionData(col);
    obs.subscribe((response)=>{
      this.logsCol = response;
      this.countLogs = this.logsCol.length;
    })
  }
}
