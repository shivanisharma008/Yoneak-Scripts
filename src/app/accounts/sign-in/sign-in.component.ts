import { ChangeDetectorRef, Component, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from '../../api/api-services/user-service.service';
import { isPlatformBrowser } from '@angular/common';
import { SendOtpRequestModel } from '../../api/api-modules/sentotpRequest.mode';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VerifyEmailRequestModel } from '../../api/api-modules/verifyEmailResponse.modal';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  isPasswordVisible: boolean = false;
  showOtpFields = false;
  returnUrl: string = '';


  constructor(
    private userApiService: UserServiceService,
    private elementRef: ElementRef, @Inject(PLATFORM_ID) private platformId: object,
    private _snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.signInForm.valueChanges.subscribe(() => {
      this.concatenateOtp();
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    console.log(this.returnUrl);


  }


  signInForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),

    otp1: new FormControl('', [Validators.required, Validators.pattern('^[0-9]$')]),
    otp2: new FormControl('', [Validators.required, Validators.pattern('^[0-9]$')]),
    otp3: new FormControl('', [Validators.required, Validators.pattern('^[0-9]$')]),
    otp4: new FormControl('', [Validators.required, Validators.pattern('^[0-9]$')]),
    otp5: new FormControl('', [Validators.required, Validators.pattern('^[0-9]$')]),
    otp6: new FormControl('', [Validators.required, Validators.pattern('^[0-9]$')]),
    fullOtp: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{6}$')]),

    // password : new FormControl('',[Validators.required,Validators.minLength(8), this.passwordValidator]),
  })

  concatenateOtp() {
    const otpValues = [
      this.signInForm.controls.otp1.value,
      this.signInForm.controls.otp2.value,
      this.signInForm.controls.otp3.value,
      this.signInForm.controls.otp4.value,
      this.signInForm.controls.otp5.value,
      this.signInForm.controls.otp6.value
    ];
    const fullOtp = otpValues.join('');
    this.signInForm.controls.fullOtp.setValue(fullOtp, { emitEvent: false });
  }


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


  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }


  submitLoginForm() {
    const sendOtpRequestModel: SendOtpRequestModel = {
      email: this.signInForm.controls.email.value ?? '',
    }
    this.userApiService.sendOtpPostApi(sendOtpRequestModel).subscribe({
      next: (res) => {
        if (res.status === 200) {

          setTimeout(() => {
            this.showOtpFields = true; // Update the variable inside setTimeout
          });
          // this.cdr.detectChanges();
          this._snackBar.open(res.message, 'Close', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'center'
          });

        }
      }
    })
  }

  sendOtp() {
    const verifyEmailRequestModel: VerifyEmailRequestModel = {
      email: this.signInForm.controls.email.value ?? '',
      otp: this.signInForm.controls.fullOtp.value ?? '',
    }
    this.userApiService.verifyEmailPostApi(verifyEmailRequestModel).subscribe({
      next: (res) => {
        console.log(res);

        const role = res.data.role;
        const userDetails = res.data;
        localStorage.setItem('userDetails', JSON.stringify(userDetails));
        if (res.status === 200) {
          this._snackBar.open(res.message, 'Close', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'center'
          });
          if (this.returnUrl === '' || this.returnUrl === '/' || this.returnUrl === null || this.returnUrl === undefined) {
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
          } else {
            this.router.navigateByUrl(this.returnUrl);
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
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center'
        });
      }
    })
  }
}
