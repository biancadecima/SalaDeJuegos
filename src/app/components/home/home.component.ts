import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth, signOut } from '@angular/fire/auth';
import { Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private auth:Auth){}

  CloseSession(){
    signOut(this.auth).then(()=>{
// se rutea al login
    })
  }
}
