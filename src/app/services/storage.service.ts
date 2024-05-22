import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { addDoc, collection, collectionData, Firestore } from '@angular/fire/firestore';
import { formatDate } from '@angular/common';
//import {}

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  user:any;
  log:any;
  collection!: string;
  
  constructor(private router:Router, private db:Firestore) { }

  public async addUser(email:string, username:string){
    this.user = {
      email: email,
      username: username
    }
    console.log('user en addUser', this.user);
    try{
      const col = collection(this.db, 'users');
      await addDoc(col, {email: this.user.email, username: this.user.username});
      console.log('usuario grabado con exito');
    } catch (error: any) {
      console.log('error en addUser', error);
    };
  }

  public async addLog(email:string){
    this.log = {
      email: email,
      ingreso: formatDate(new Date(), 'dd-MMM-yyyy hh:mm:ss a', 'en-US'),
    }
    console.log('log en addLog', this.log);
    try{
    let col = collection(this.db, 'logs');
    /*await*/ addDoc(col, {date: this.log.ingreso, "user": this.log.email});
    console.log('log grabado con exito');
    }catch (error: any) {
      console.log('error en addLog', error);
    };
  }

  

}
