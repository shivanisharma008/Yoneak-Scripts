import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {
  isPasswordVisible: boolean = false;


  forgetPasswordForm = new  FormGroup ({
    email : new FormControl('',[Validators.required,Validators.email]),
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

  
  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}
