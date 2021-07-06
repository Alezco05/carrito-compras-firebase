import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['login.component.css'],
})
export class LoginComponent implements OnInit {
  error: number = 0;
  form: FormGroup;
  params: string;
  title: string;
  textError: string;
  constructor(private fb: FormBuilder, private dataService: AuthService, private route: ActivatedRoute,
    private router:Router) {
      this.route.params.forEach((params: Params) => {
        this.params = params.param;
        this.title = this.params === 'login' ? 'Iniciar Sesión': 'Registrarse';
      });
  }

  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.form = this.fb.group(
      {
        email: ['',[Validators.required, Validators.email]],
        password: ['', [Validators.required]],
      }
    )
  }
  onSubmitForm(){
    const data = {
      email : this.form.controls.email.value,
      password: this.form.controls.password.value,
    };
    this.params === 'login' ? this.signIn(data) : this.signUp(data);
  }
  signIn(data){
    this.dataService
    .signIn(data)
    .then(() => {
      this.router.navigate(["/"]);
    })
    .catch(() => {
        this.error = 1;
        this.textError = 'Email o Contraseña Incorrectas!!';
        setTimeout(() => (this.error = 0), 3000); 
    });
  }
  signUp(data){
    this.dataService.signUp(data) .then(() => {
      this.router.navigate(["/"]);
    })
    .catch(() => {
        this.error = 1;
        this.textError = 'Hubo un error inexperado intente de nuevo o comuniquese con el adminstrador';
        setTimeout(() => (this.error = 0), 3000); 
    });
  }
}
