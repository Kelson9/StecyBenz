/* filepath: /Users/supremum/Desktop/CONTRACTS/stecy-benz/src/app/pages/signup/signup.component.ts */
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  showPassword = false;
  isLoading = false;

  features = [
    {
      icon: 'M12 2L13.09 8.26L22 9L13.09 9.74L12 22L10.91 9.74L2 9L10.91 8.26L12 2Z',
      title: 'Premium Products',
      description: 'Access to exclusive hair care formulations'
    },
    {
      icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
      title: 'Expert Consultations',
      description: 'Personalized advice from hair care specialists'
    },
    {
      icon: 'M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4L12 14.01 9 11.01',
      title: 'Satisfaction Guaranteed',
      description: '30-day money-back guarantee on all products'
    }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm() {
    this.signupForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      agreeToTerms: [false, Validators.requiredTrue]
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.signupForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  isFieldValid(fieldName: string): boolean {
    const field = this.signupForm.get(fieldName);
    return !!(field && field.valid && (field.dirty || field.touched));
  }

  getEmailErrorMessage(): string {
    const emailControl = this.signupForm.get('email');
    if (emailControl?.hasError('required')) {
      return 'Email is required';
    }
    if (emailControl?.hasError('email')) {
      return 'Please enter a valid email address';
    }
    return '';
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  getPasswordStrength(): number {
    const password = this.signupForm.get('password')?.value || '';
    let strength = 0;

    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    return strength;
  }

  getPasswordStrengthClass(index: number): string {
    const strength = this.getPasswordStrength();
    if (index < strength) {
      switch (strength) {
        case 1: return 'weak';
        case 2: return 'fair';
        case 3: return 'good';
        case 4: return 'strong';
        default: return '';
      }
    }
    return '';
  }

  getPasswordStrengthText(): string {
    const strength = this.getPasswordStrength();
    switch (strength) {
      case 0:
      case 1: return 'Weak password';
      case 2: return 'Fair password';
      case 3: return 'Good password';
      case 4: return 'Strong password';
      default: return '';
    }
  }

  async onSubmit() {
    if (this.signupForm.valid) {
      this.isLoading = true;
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        console.log('Sign up data:', this.signupForm.value);
        
        // Redirect to login or dashboard
        this.router.navigate(['/login']);
      } catch (error) {
        console.error('Sign up error:', error);
      } finally {
        this.isLoading = false;
      }
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.signupForm.controls).forEach(key => {
        this.signupForm.get(key)?.markAsTouched();
      });
    }
  }

  async signUpWithGoogle() {
    console.log('Sign up with Google');
    // Implement Google sign up
  }

  async signUpWithApple() {
    console.log('Sign up with Apple');
    // Implement Apple sign up
  }

  async signUpWithFacebook() {
    console.log('Sign up with Facebook');
    // Implement Facebook sign up
  }
}