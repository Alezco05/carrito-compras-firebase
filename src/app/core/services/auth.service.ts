import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private authService: AngularFireAuth) { }

  signIn(data){
    const {email, password} = data;
    return new Promise((resolve,reject)=>{
      this.authService.signInWithEmailAndPassword(email,password)
      .then(data => resolve(data),
      error => reject(error))

    })
  }
  getAuth(){
    return this.authService.authState.pipe(
      map(auth => auth)
    );
  }
  logout(){
    return this.authService.signOut();
  }
  signUp(data){
    const {email, password} = data;
    return new Promise((resolve,reject)=>{
      this.authService.createUserWithEmailAndPassword(email,password)
      .then(data => resolve(data),
      error => reject(error))
    })
  }
}
