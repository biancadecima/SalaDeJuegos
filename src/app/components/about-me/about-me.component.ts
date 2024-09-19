import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2'
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { User } from 'firebase/auth';


@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.css'
})
export class AboutMeComponent {

  public btnVolver = 'Volver a Home';
  isDropdownOpen = false;
  showLogoutButton = false;
  currentUser$: Observable<User | null>;
  screenWidth = 0;

  constructor(private router: Router, private AuthService: AuthService)
  {
    this.currentUser$ = this.AuthService.getCurrentUser();
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;

    document.addEventListener('click', this.onDocumentClick.bind(this));
  }

  onClick(event: any): void 
  {
    this.router.navigate(['/home']);
  }

  onClickWs(event: any): void 
  {
    this.router.navigate(['/home/word-scramble']);
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;

  }

  onDocumentClick(event: MouseEvent) {
    if (!(<HTMLElement>event.target).closest('.navbar-custom')) {
      this.isDropdownOpen = false;
    }
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
