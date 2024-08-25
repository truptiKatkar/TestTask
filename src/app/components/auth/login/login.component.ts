import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  role: string = 'admin';
  error: string = '';
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.setForm();
  }

  setForm() {
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('/^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/'),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{4,16})/'
          ),
          Validators.minLength(4),
        ],
      ],
      role: [''],
    });
  }

  handleLogin() {
    console.log(this.loginForm.valid, 'valid');
    const formData = this.loginForm.value;
    this.loginForm.controls['role'].setValue(this.role);

    

    if (this.role === 'admin') {
      this.handleAdminLogin(formData);
    } else {
      this.handleUserLogin(formData);
    }
  }

  private handleAdminLogin(formData: any) {
    console.log(formData, 'formData');
    const adminValues = this.authService.adminValue;
    const isAdmin =
      formData.email === adminValues.email &&
      formData.password === adminValues.password;

    console.log(isAdmin, 'isAdmin');

    if (isAdmin) {
      console.log(adminValues, 'adminValues');
      this.authService.login(this.loginForm.value);
      this.router.navigate(['/admin']);
    } else {
      this.error = 'Invalid login details.';
    }
  }

  private handleUserLogin(formData: any) {
    const prevData: any = localStorage.getItem('data');
    const data: any[] = JSON.parse(prevData) || [];
    const user = data.find((d) => d.email === formData.email);
    console.log(user,'user')
    if (user && user.password === formData.password) {
      this.authService.login(this.loginForm.value);
      console.log(user, 'isExist');
      switch (this.role) {
        case 'user':
          this.router.navigate(['/user']);
          break;
        case 'super-user':
          this.router.navigate(['/super-user']);
          break;
        default:
          this.error = 'Invalid role.';
      }
    } else {
      this.error = 'Invalid login details.';
    }
  }
}
