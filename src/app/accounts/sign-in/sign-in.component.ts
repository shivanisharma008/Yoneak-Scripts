import { Component, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from '../../api/api-services/user-service.service';
import { LoginRequestModel } from '../../api/api-modules/loginRequest.mode';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  isPasswordVisible: boolean = false;

  constructor(
    private userApiService : UserServiceService,
    private elementRef: ElementRef, @Inject(PLATFORM_ID) private platformId: object
  ){}


  signInForm = new  FormGroup ({
    email : new FormControl('',[Validators.required,Validators.email]),
    password : new FormControl('',[Validators.required,Validators.minLength(8), this.passwordValidator]),
  })


  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const upper_sec = this.elementRef.nativeElement.querySelectorAll('.form_field');
      const heading = this.elementRef.nativeElement.querySelector('.login_body');
      const left = this.elementRef.nativeElement.querySelector('.formName');


      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('fade-in');
            }
          });
        }, { threshold: 0.5 });

        upper_sec.forEach((upper_sec: Element) => {
          observer.observe(upper_sec);
        });

        observer.observe(heading);
        observer.observe(left);
      }
    }
  }

  passwordValidator(control: FormControl): { [key: string]: boolean } | null {
    const password = control.value;
  
    // Regular expression to enforce validation rules
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
  
    if (!passwordRegex.test(password)) {
      return { passwordStrength: true }; // Validation fails
    }
  
    return null; // Validation passes
  }

  
  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }


  submitLoginForm(){
    const loginResponseModel: LoginRequestModel = {
      email: this.signInForm.controls.email.value ?? '',
      password:  this.signInForm.controls.password.value ?? ''
    }
    this.userApiService.loginPostApi(loginResponseModel).subscribe({
      next:(res)=>{
        console.log(res);
      }
    })
  }
}
