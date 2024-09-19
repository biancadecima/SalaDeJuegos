import { CommonModule } from '@angular/common';
import { Component, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service'; 
import Swal from 'sweetalert2';
import { Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'firebase/auth';
import { ChatComponent } from '../chat/chat.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, RouterLink, RouterLinkActive, ChatComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent{

  //@Output()
  currentUser$: Observable<User | null>;
  imgAhorcado: string = "";
  imgMayorMenor:string = "";
  imgPreguntados: string = "";
  imgTortugas: string = "";

  constructor(private router:Router, private AuthService:AuthService){
    this.currentUser$ = this.AuthService.getCurrentUser();
  }


  highlightButton(event: any) {
    const cardBody = event.target.nextElementSibling;
    cardBody.classList.add('highlight');
  }
  
  unhighlightButton(event: any) {
    const cardBody = event.target.nextElementSibling;
    cardBody.classList.remove('highlight');
  }

  ahorcado() {
    this.router.navigate(['/ahorcado']);
  }

  mayorOMenor() {
    this.router.navigate(['/mayormenor']);
  }

  preguntados() {
    this.router.navigate(['/preguntados']);
  }

  turtleRace() {
    this.router.navigate(['/turtle-race']);
  }


  SignOut(){
    Swal.fire({
      title: '¿Quieres cerrar sesión?',
      text: 'Lamentamos que quieras salir...',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.AuthService.signOut();
        this.router.navigate(['/log-in']); // puse la contrabarra, ns si esta bn
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.router.navigate(['/home']);
        Swal.fire('Que bueno, volviste!', 'Tu sesión sigue abierta :)', 'info');
      }
    });
    
  }
}
