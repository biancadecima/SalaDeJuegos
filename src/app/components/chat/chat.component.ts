import { Component, ElementRef, ViewChild, OnDestroy, OnInit} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { collection, onSnapshot,addDoc, query, orderBy } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';

const options: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
};

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit, OnDestroy{
  loggedUser:any;
  colPath:string = "chatMessages"
  messages:any=[];
  showChat = false;
  newMessages = false;
  newMessage:string = "";
  userColors:any = {};
  loginDate: string = '';
  @ViewChild('messagesContainer') messagesContainerRef!: ElementRef;

  constructor(private auth: AuthService, private firestore:Firestore){}
  
  ngOnInit(): void {
      this.auth.getCurrentUser().subscribe((user) => {
        this.loggedUser = user;
        this.loginDate = this.formatDate(new Date());
      });
      this.getMessages();
  }

  getMessages() {
    const q = query(collection(this.firestore, this.colPath), orderBy('timestamp', 'asc'));
    onSnapshot(q, (snapshot) => {
      const newMessages = this.messages = snapshot.docs.map((doc) => doc.data());
      this.messages = newMessages;
      if (!this.showChat) {
        const lastMessage = this.messages[this.messages.length - 1];
        if (lastMessage.emisor !== this.loggedUser.uid) {
          this.newMessages = true;
        }
      }
      if (this.showChat) {
        setTimeout(() => {
          this.scrollChatToBottom();
        }, 100);
      }
    });
    if (this.messages.length > 0) {
      const lastMessage = this.messages[this.messages.length - 1];
      if (lastMessage.emisor !== this.loggedUser.uid) {
        this.showChat = true;
        this.newMessages = false;
      }
    }
  }

  scrollChatToBottom() {
    if (this.messagesContainerRef) {
      const container = this.messagesContainerRef.nativeElement;
      container.scrollTop = container.scrollHeight;
    }
  }

  scrollChatToTop() {
    const container = this.messagesContainerRef.nativeElement;
    if (container.scrollTop === 0) {
      this.newMessages = false;
      //this.getMessages();
    }
  }


  sendMessage() {
    if (this.newMessage === "") return;
    const date = new Date();
    const message = {
      emisor: this.loggedUser.uid,
      text: this.newMessage,
      timestamp: date.getTime(),
      date: date.toLocaleTimeString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }),
      time: date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false }),
      username: this.loggedUser.email
    };
  
    addDoc(collection(this.firestore, this.colPath), message)
      .then(() => {
        //console.log('Mensaje guardado en Firestore');
        this.newMessage = "";
        this.scrollChatToTop();
        this.newMessages = true;
      })
      .catch((error) => {
        console.error('Error al guardar el mensaje en Firestore:', error);
      });
  
    this.newMessage = "";
    setTimeout(() => {
      this.getMessages();
    }, 0);
  }

  getChatColor(uid: string) {
    if (!this.userColors[uid]) {
      this.userColors[uid] = this.getRandomColor();
    }
    return this.userColors[uid];
  }

  getRandomColor(): string {
    const minBrightness = 50; 
    const letters = '0123456789ABCDEF';
    let color = '#';
    do {
      color = '#';
      for (let i = 0; i < 3; i++) {
        const channel = Math.floor(Math.random() * 256);
        const hex = channel.toString(16).padStart(2, '0'); 
        color += hex;
      }
    } while (this.getLightness(color) > minBrightness);
  
    return color;
  }
  
  getLightness(color: string): number {

    const r = parseInt(color.substr(1, 2), 16);
    const g = parseInt(color.substr(3, 2), 16);
    const b = parseInt(color.substr(5, 2), 16);
  
    return (0.2126 * r + 0.7152 * g + 0.0722 * b);
  }
 
  ngOnDestroy(): void {}
  
  private formatDate(date: Date): string {
    return date.toLocaleDateString('es-ES', options);
  }
}
