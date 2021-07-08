import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token: string;
  constructor(private authService: AngularFireAuth) {
    this.getToken();
  }

  signIn(data) {
    const { email, password } = data;
    return new Promise((resolve, reject) => {
      this.authService.signInWithEmailAndPassword(email, password).then(
        (data) => resolve(data),
        (error) => reject(error)
      );
    });
  }
  getToken() {
    const user = localStorage.getItem('user');
    if (!user) return null;
    this.token = JSON.parse(user);
  }
  getUser() {
    const usuario = localStorage.getItem('usuario');
    if (!usuario) return null;
    const userJSON = JSON.parse(usuario);
  }
  getAuth() {
    return this.authService.authState.pipe(map((auth) => auth));
  }
  logout() {
    this.token = null;
    return this.authService.signOut();
  }
  signUp(data) {
    const { email, password } = data;
    return new Promise((resolve, reject) => {
      this.authService.createUserWithEmailAndPassword(email, password).then(
        (data) => resolve(data),
        (error) => reject(error)
      );
    });
  }
}
