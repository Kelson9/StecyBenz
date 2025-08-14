/* filepath: /Users/supremum/Desktop/CONTRACTS/stecy-benz/src/app/pages/login/login.component.ts */
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  showPassword = false;
  isLoading = false;
  loginError = '';

  stats = [
    { number: '50K+', label: 'Happy Customers' },
    { number: '98%', label: 'Satisfaction Rate' },
    { number: '24/7', label: 'Support Available' }
  ];

  benefits = [
    {
      icon: 'M12 2L13.09 8.26L22 9L13.09 9.74L12 22L10.91 9.74L2 9L10.91 8.26L12 2Z',
      text: 'Exclusive member discounts and offers'
    },
    {
      icon: 'M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4L12 14.01 9 11.01',
      text: 'Track your orders and delivery status'
    },
    {
      icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M23 21v-2a4 4 0 0 0-3-3.87',
      text: 'Personalized hair care recommendations'
    },
    {
      icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
      text: 'Save your favorite products and wishlists'
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
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  isFieldValid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field && field.valid && (field.dirty || field.touched));
  }

  getEmailErrorMessage(): string {
    const emailControl = this.loginForm.get('email');
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

  async quickLogin(type: 'demo' | 'guest') {
    this.isLoading = true;
    this.loginError = '';

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (type === 'demo') {
        // Set demo credentials
        this.loginForm.patchValue({
          email: 'demo@stecybenz.com',
          password: 'demo123'
        });
        console.log('Demo login successful');
      } else {
        console.log('Guest login successful');
      }

      // Redirect to dashboard
      this.router.navigate(['/']);
    } catch (error) {
      this.loginError = 'Quick login failed. Please try again.';
      console.error('Quick login error:', error);
    } finally {
      this.isLoading = false;
    }
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.loginError = '';
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const formData = this.loginForm.value;
        console.log('Login data:', formData);

        // Simulate login validation
        if (formData.email === 'admin@stecybenz.com' && formData.password === 'admin123') {
          this.router.navigate(['/']);
        } else {
          throw new Error('Invalid credentials');
        }
      } catch (error) {
        this.loginError = 'Invalid email or password. Please try again.';
        console.error('Login error:', error);
      } finally {
        this.isLoading = false;
      }
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.loginForm.controls).forEach(key => {
        this.loginForm.get(key)?.markAsTouched();
      });
    }
  }

  forgotPassword(event: Event) {
    event.preventDefault();
    console.log('Forgot password clicked');
    // Implement forgot password functionality
    // You could open a modal, navigate to forgot password page, etc.
  }

  async signInWithGoogle() {
    console.log('Sign in with Google');
    this.isLoading = true;
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Implement Google sign in
      this.router.navigate(['/']);
    } catch (error) {
      this.loginError = 'Google sign in failed. Please try again.';
    } finally {
      this.isLoading = false;
    }
  }

  async signInWithApple() {
    console.log('Sign in with Apple');
    this.isLoading = true;
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Implement Apple sign in
      this.router.navigate(['/']);
    } catch (error) {
      this.loginError = 'Apple sign in failed. Please try again.';
    } finally {
      this.isLoading = false;
    }
  }

  async signInWithMicrosoft() {
    console.log('Sign in with Microsoft');
    this.isLoading = true;
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Implement Microsoft sign in
      this.router.navigate(['/']);
    } catch (error) {
      this.loginError = 'Microsoft sign in failed. Please try again.';
    } finally {
      this.isLoading = false;
    }
  }
}