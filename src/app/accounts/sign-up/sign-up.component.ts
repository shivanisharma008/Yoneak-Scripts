import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserServiceService } from '../../api/api-services/user-service.service';
import { SignUpRequestModel } from '../../api/api-modules/signUpRequest.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  isPasswordVisible: boolean = false;
  constructor(
    private userApiService: UserServiceService
  ) {

  }


  signUpForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
    phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]*$')]),
    gender: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), this.passwordValidator]),
  })

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




  allowOnlyNumbers(event: KeyboardEvent) {
    const charCode = event.charCode;
    // Allow only numbers (0-9)
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }


  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }


  submitRegistrationForm() {
    const signUpResponseModel: SignUpRequestModel = {
      fullName: this.signUpForm.controls.name.value ?? '',
      email: this.signUpForm.controls.email.value ?? '',
      password: this.signUpForm.controls.password.value ?? '',
      username: 'test',
    }
    this.userApiService.registrationPostApi(signUpResponseModel).subscribe({
      next:(res)=>{
        console.log(res)
      }
    })
  }
}
