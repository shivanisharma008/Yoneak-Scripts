import { Component, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserServiceService } from '../../api/api-services/user-service.service';
import { SignUpRequestModel } from '../../api/api-modules/signUpRequest.model';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { isPlatformBrowser } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<SignUpComponent>

  ) {
    console.log(data);
    console.log(data.returnUrl);
    console.log(data.email);
    
  }

  ngOnInit(): void {
    // const email = history.state.email
    // this.signUpForm.controls.email.patchValue(email)

    this.signUpForm.controls.email.patchValue(this.data.email)


    // this.ActivateRoute.queryParams.subscribe(params => {
    //   const email = params['email'];
    //   console.log(email);
    // });
  }

  signUpForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
    phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]*$')]),
    role: new FormControl('3', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
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

  onInput(event: any) {
    const input = event.target;
    if (input) {
      let value = input.value;
      value = value.replace(/[^0-9]/g, '');
      if (value.length > 10) {
        value = value.slice(0, 10);
      }
      input.value = value;
      this.signUpForm.controls.phone.setValue(value, { emitEvent: false });
    }
  }

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

  submitRegistrationForm() {
    if (this.signUpForm.valid) {
      const signUpResponseModel: SignUpRequestModel = {
        username: this.signUpForm.controls.name.value ?? '',
        email: this.signUpForm.controls.email.value ?? '',
        phoneNo: this.signUpForm.controls.phone.value ?? '',
        role: Number(this.signUpForm.controls.role.value) ?? 1,
      }
      this.userApiService.registrationPostApi(signUpResponseModel).subscribe({
        next: (res) => {
          console.log(res)
          if (res.status === 200) {
            const role = res.data.role;
            const userDetails = res.data;
            localStorage.setItem('userDetails', JSON.stringify(userDetails));
            this._snackBar.open(res.message, 'Close', {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'center'
            });
            if (this.data.returnUrl === '' || this.data.returnUrl === '/' || this.data.returnUrl === null || this.data.returnUrl === undefined) {
              switch (role) {
                case 1:
                  this.router.navigate(['super-admin-module']);
                  break;
                case 2:
                  this.router.navigate(['admin']);
                  break;
                case 3:
                  this.router.navigate(['user/blogs']);
                  break;
                default:
                  console.error('Unknown role:', role);
              }
              this.dialogRef.close();
            } else {
              this._snackBar.open(res.message, 'Close', {
                duration: 3000,
                verticalPosition: 'bottom',
                horizontalPosition: 'center'
              });
              this.router.navigateByUrl(this.data.returnUrl);
              this.dialogRef.close();
            }
          } else {
            this._snackBar.open(res.message, 'Close', {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'center'
            });
          }
        }, error: (err: HttpErrorResponse) => {
          this._snackBar.open(err.statusText, 'Close', {
            duration: 5000,
            verticalPosition: 'bottom',
            horizontalPosition: 'center'
          })
        }
      })
    }
    else {
      this._snackBar.open('Please fill the required fields', 'Close', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      });
    }

  }
}
