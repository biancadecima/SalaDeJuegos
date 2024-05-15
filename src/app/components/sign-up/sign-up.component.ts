import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { addDoc, collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
//import { FirebaseError } from 'firebase/app';
import { User } from '../../user';



@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  newEmail!:string;
  newUsername!:string;
  newPassword!:string;

  loggedUser!:string;
  flagEmailUsed:boolean = false;

  errorMessage!:string;
  constructor(private firestore: Firestore, public auth: Auth, private router: Router){}

  async SignUp(): Promise<void> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, this.newEmail, this.newPassword);

      if (userCredential.user) { // Ensure user object exists
        const col = collection(this.firestore, 'users');
        await addDoc(col, { email: this.newEmail, username: this.newUsername });
        this.errorMessage = 'Sign Up Successful!'; // Success message
      }
    } catch (error: any) {
      switch (error.code) {
        case 'auth/invalid-email':
          this.errorMessage = 'Invalid email format.';
          break;
        case 'auth/weak-password':
          this.errorMessage = 'Password must be at least 6 characters long.'; // Adjust complexity rules
          break;
        case 'auth/email-already-in-use':
          this.errorMessage = 'Email address already in use.';
          break;
        default:
          this.errorMessage = 'An error occurred';
          break;
      }
    }
  }
}
