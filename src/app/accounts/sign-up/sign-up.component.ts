import { Component, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserServiceService } from '../../api/api-services/user-service.service';
import { SignUpRequestModel } from '../../api/api-modules/signUpRequest.model';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  isAdminSignUp: boolean = false;
  isPasswordVisible: boolean = false;
  currentPath: any;
  showOtpBoxes: boolean = false; 
  constructor(
    private userApiService: UserServiceService,
    private ActivateRoute: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private elementRef: ElementRef, @Inject(PLATFORM_ID) private platformId: object,
    private router: Router
  ) {

  }

  ngOnInit(): void {
   
  }

  signUpForm = new FormGroup({
    // name: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
    // phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]*$')]),
    // gender: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    // password: new FormControl('', [Validators.required, Validators.minLength(8), this.passwordValidator]),
    // alternatePhone: new FormControl('', [Validators.pattern(/^[0-9]*$/), Validators.minLength(10), Validators.maxLength(10)]),
    
  })
  otpForm = new FormGroup({
      otp1: new FormControl('', [Validators.required, Validators.pattern('[0-9]')]),
      otp2: new FormControl('', [Validators.required, Validators.pattern('[0-9]')]),
      otp3: new FormControl('', [Validators.required, Validators.pattern('[0-9]')]),
      otp4: new FormControl('', [Validators.required, Validators.pattern('[0-9]')]),
     
    });

    moveToNext(event: any, index: number) {
      const inputs = document.querySelectorAll('.otp-box');
      if (event.target.value && index < inputs.length - 1) {
        (inputs[index + 1] as HTMLElement).focus();
      }
    }

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

  // onInput(event: any) {
  //   const input = event.target;
  //   if (input) {
  //     let value = input.value;
  //     value = value.replace(/[^0-9]/g, '');
  //     if (value.length > 10) {
  //       value = value.slice(0, 10);
  //     }
  //     input.value = value;
  //     this.signUpForm.controls.phone.setValue(value, { emitEvent: false });
  //   }
  // }

  // allowOnlyNumbers(event: KeyboardEvent) {
  //   const charCode = event.charCode;
  //   // Allow only numbers (0-9)
  //   if (charCode < 48 || charCode > 57) {
  //     event.preventDefault();
  //   }
  // }

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  // submitRegistrationForm() {
  //   if (this.signUpForm.valid) {
  //     const signUpResponseModel: SignUpRequestModel = {
  //       fullName: this.signUpForm.controls.name.value ?? '',
  //       email: this.signUpForm.controls.email.value ?? '',
  //       password: this.signUpForm.controls.password.value ?? '',
  //       username: 'test',
  //       role:1 
  //     }
  //     this.userApiService.registrationPostApi(signUpResponseModel).subscribe({
  //       next: (res) => {
  //         console.log(res)
  //         if (res.status === 200) {
  //           this._snackBar.open('Form submitted successfully!', 'Close', {
  //             duration: 3000,
  //             verticalPosition: 'bottom',
  //             horizontalPosition: 'center'
  //           });
  //         } else {
  //           this._snackBar.open(res.message, 'Close', {
  //             duration: 5000,
  //             verticalPosition: 'bottom',
  //             horizontalPosition: 'center'
  //           });
  //         }
  //       }
  //     })
  //   }
  //   else {
  //     this._snackBar.open('Please fill the required fields', 'Close', {
  //       duration: 3000,
  //       verticalPosition: 'bottom',
  //       horizontalPosition: 'center'
  //     });
  //   }

  // }
}
