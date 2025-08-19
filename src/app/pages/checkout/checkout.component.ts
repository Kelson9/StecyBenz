import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { HeaderComponent } from '../../header/header.component';

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
}

interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

interface ShippingOption {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: string;
}

interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
}

interface State {
  code: string;
  name: string;
}

interface Country {
  code: string;
  name: string;
}

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule, HeaderComponent],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(20px)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ])
  ]
})
export class CheckoutComponent implements OnInit {
  currentStep = 1;
  shippingForm!: FormGroup;
  paymentForm!: FormGroup;
  billingAddressSameAsShipping = true;
  isProcessingOrder = false;

  // Data
  cartItems: CartItem[] = [];
  shippingOptions: ShippingOption[] = [];
  paymentMethods: PaymentMethod[] = [];
  selectedShippingOption: ShippingOption | null = null;
  selectedPaymentMethod: PaymentMethod | null = null;
  detectedCardType = '';

  // Form Data
  states: State[] = [
    { code: 'CA', name: 'California' },
    { code: 'NY', name: 'New York' },
    { code: 'TX', name: 'Texas' },
    { code: 'FL', name: 'Florida' },
    { code: 'IL', name: 'Illinois' },
    { code: 'WA', name: 'Washington' },
    { code: 'OR', name: 'Oregon' },
    { code: 'NV', name: 'Nevada' },
    { code: 'AZ', name: 'Arizona' },
    { code: 'CO', name: 'Colorado' }
  ];

  countries: Country[] = [
    { code: 'US', name: 'United States' },
    { code: 'CA', name: 'Canada' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'AU', name: 'Australia' },
    { code: 'DE', name: 'Germany' },
    { code: 'FR', name: 'France' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.initializeForms();
  }

  ngOnInit(): void {
    this.loadCartItems();
    this.loadShippingOptions();
    this.loadPaymentMethods();
  }

  private initializeForms(): void {
    this.shippingForm = this.fb.group({
      email: ['john.doe@example.com', [Validators.required, Validators.email]],
      phone: ['(555) 123-4567', [Validators.required]],
      firstName: ['John', [Validators.required]],
      lastName: ['Doe', [Validators.required]],
      address: ['123 Main Street', [Validators.required]],
      address2: ['Apt 4B'],
      city: ['New York', [Validators.required]],
      state: ['NY', [Validators.required]],
      zipCode: ['10001', [Validators.required]],
      country: ['US', [Validators.required]]
    });

    this.paymentForm = this.fb.group({
      cardNumber: [''],
      expiryDate: [''],
      cvv: [''],
      cardholderName: [''],
      billingFirstName: [''],
      billingLastName: [''],
      billingAddress: [''],
      billingCity: [''],
      billingZipCode: ['']
    });
  }

  private loadCartItems(): void {
    this.cartItems = [
      {
        id: 'cart-1',
        product: {
          id: 'prod-1',
          name: 'Hydrating Vitamin C Serum',
          brand: 'Luxe Beauty',
          price: 49.99,
          image: 'https://picsum.photos/300/300?random=1'
        },
        quantity: 2
      },
      {
        id: 'cart-2',
        product: {
          id: 'prod-2',
          name: 'Matte Liquid Lipstick',
          brand: 'Glow Co.',
          price: 24.99,
          image: 'https://picsum.photos/300/300?random=2'
        },
        quantity: 1
      },
      {
        id: 'cart-3',
        product: {
          id: 'prod-3',
          name: 'Radiant Foundation',
          brand: 'Perfect Glow',
          price: 34.99,
          image: 'https://picsum.photos/300/300?random=3'
        },
        quantity: 1
      }
    ];
  }

  private loadShippingOptions(): void {
    this.shippingOptions = [
      {
        id: 'standard',
        name: 'Standard Shipping',
        description: '5-7 business days',
        price: 0,
        estimatedDays: '5-7 days'
      },
      {
        id: 'express',
        name: 'Express Shipping',
        description: '2-3 business days',
        price: 9.99,
        estimatedDays: '2-3 days'
      },
      {
        id: 'overnight',
        name: 'Overnight Shipping',
        description: 'Next business day',
        price: 19.99,
        estimatedDays: '1 day'
      }
    ];

    this.selectedShippingOption = this.shippingOptions[0];
  }

  private loadPaymentMethods(): void {
    this.paymentMethods = [
      {
        id: 'card',
        name: 'Credit / Debit Card',
        icon: 'https://cdn-icons-png.flaticon.com/512/349/349221.png'
      },
      {
        id: 'paypal',
        name: 'PayPal',
        icon: 'https://cdn-icons-png.flaticon.com/512/174/174861.png'
      },
      {
        id: 'apple-pay',
        name: 'Apple Pay',
        icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968428.png'
      },
      {
        id: 'google-pay',
        name: 'Google Pay',
        icon: 'https://cdn-icons-png.flaticon.com/512/6124/6124998.png'
      }
    ];

    this.selectedPaymentMethod = this.paymentMethods[0];
    this.setCardValidators();
  }

  // Navigation Methods
  nextStep(): void {
    console.log('Current step:', this.currentStep);
    console.log('Shipping form valid:', this.shippingForm.valid);
    console.log('Payment valid:', this.isPaymentValid());

    if (this.currentStep === 1) {
      if (this.shippingForm.valid) {
        this.currentStep = 2;
      } else {
        console.log('Shipping form errors:', this.shippingForm.errors);
        this.markFormGroupTouched(this.shippingForm);
      }
    } else if (this.currentStep === 2) {
      if (this.isPaymentValid()) {
        this.currentStep = 3;
      } else {
        console.log('Payment invalid');
        this.markFormGroupTouched(this.paymentForm);
      }
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  // Shipping Options
  selectShippingOption(option: ShippingOption): void {
    this.selectedShippingOption = option;
  }

  // Payment Methods
  selectPaymentMethod(method: PaymentMethod): void {
    console.log('Selecting payment method:', method.id);
    this.selectedPaymentMethod = method;
    
    if (method.id === 'card') {
      this.setCardValidators();
      // Pre-fill with test data for easier testing
      this.paymentForm.patchValue({
        cardNumber: '4111 1111 1111 1111',
        expiryDate: '12 / 25',
        cvv: '123',
        cardholderName: 'John Doe'
      });
    } else {
      this.removeCardValidators();
      // Clear card fields for non-card payments
      this.paymentForm.patchValue({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardholderName: ''
      });
    }
  }

  private setCardValidators(): void {
    this.paymentForm.get('cardNumber')?.setValidators([Validators.required]);
    this.paymentForm.get('expiryDate')?.setValidators([Validators.required]);
    this.paymentForm.get('cvv')?.setValidators([Validators.required]);
    this.paymentForm.get('cardholderName')?.setValidators([Validators.required]);
    this.paymentForm.updateValueAndValidity();
  }

  private removeCardValidators(): void {
    this.paymentForm.get('cardNumber')?.clearValidators();
    this.paymentForm.get('expiryDate')?.clearValidators();
    this.paymentForm.get('cvv')?.clearValidators();
    this.paymentForm.get('cardholderName')?.clearValidators();
    this.paymentForm.updateValueAndValidity();
  }

  // Card Input Handling
  onCardNumberChange(event: any): void {
    const value = event.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
    const formatted = this.formatCardNumberValue(value);
    
    // Update the form control
    this.paymentForm.patchValue({ cardNumber: formatted });
    
    // Update the input field
    event.target.value = formatted;
    
    this.detectCardType(value);
  }

  onExpiryDateChange(event: any): void {
    let value = event.target.value.replace(/\D/g, '');
    
    if (value.length >= 2) {
      value = value.substring(0, 2) + ' / ' + value.substring(2, 4);
    }
    
    // Update the form control
    this.paymentForm.patchValue({ expiryDate: value });
    
    // Update the input field
    event.target.value = value;
  }

  private formatCardNumberValue(value: string): string {
    const matches = value.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    return parts.length ? parts.join(' ') : '';
  }

  private detectCardType(cardNumber: string): void {
    const number = cardNumber.replace(/\s/g, '');
    
    if (number.startsWith('4')) {
      this.detectedCardType = 'visa';
    } else if (number.startsWith('5') || number.startsWith('2')) {
      this.detectedCardType = 'mastercard';
    } else if (number.startsWith('3')) {
      this.detectedCardType = 'amex';
    } else if (number.startsWith('6')) {
      this.detectedCardType = 'discover';
    } else {
      this.detectedCardType = '';
    }
  }

  getCardTypeIcon(cardType: string): string {
    const icons: { [key: string]: string } = {
      'visa': 'https://cdn-icons-png.flaticon.com/512/349/349228.png',
      'mastercard': 'https://cdn-icons-png.flaticon.com/512/349/349221.png',
      'amex': 'https://cdn-icons-png.flaticon.com/512/349/349230.png',
      'discover': 'https://cdn-icons-png.flaticon.com/512/349/349236.png'
    };
    return icons[cardType] || '';
  }

  // Payment Validation
  isPaymentValid(): boolean {
    if (!this.selectedPaymentMethod) {
      return false;
    }

    console.log('Checking payment validity for:', this.selectedPaymentMethod.id);

    // For card payments, check if all required fields are filled
    if (this.selectedPaymentMethod.id === 'card') {
      const cardNumber = this.paymentForm.get('cardNumber')?.value?.trim();
      const expiryDate = this.paymentForm.get('expiryDate')?.value?.trim();
      const cvv = this.paymentForm.get('cvv')?.value?.trim();
      const cardholderName = this.paymentForm.get('cardholderName')?.value?.trim();

      console.log('Card validation:', {
        cardNumber: cardNumber ? 'has value' : 'empty',
        expiryDate: expiryDate ? 'has value' : 'empty',
        cvv: cvv ? 'has value' : 'empty',
        cardholderName: cardholderName ? 'has value' : 'empty'
      });

      const isValid = !!(cardNumber && cardNumber.length >= 15 && 
                        expiryDate && expiryDate.length >= 5 && 
                        cvv && cvv.length >= 3 && 
                        cardholderName && cardholderName.length >= 2);
      
      console.log('Card payment valid:', isValid);
      return isValid;
    }

    // For other payment methods (PayPal, Apple Pay, Google Pay), just check if one is selected
    console.log('Non-card payment valid: true');
    return true;
  }

  // Order Processing
  async placeOrder(): Promise<void> {
    this.isProcessingOrder = true;

    try {
      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Navigate to success page or show success message
      alert('Order placed successfully!');
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Order processing failed:', error);
      alert('Order failed. Please try again.');
    } finally {
      this.isProcessingOrder = false;
    }
  }

  // Calculations
  getSubtotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }

  getShippingCost(): number {
    return this.selectedShippingOption?.price || 0;
  }

  getTax(): number {
    return this.getSubtotal() * 0.08; // 8% tax
  }

  getTotal(): number {
    return this.getSubtotal() + this.getShippingCost() + this.getTax();
  }

  // Utility Methods
  getShippingFormValue(field: string): string {
    return this.shippingForm.get(field)?.value || '';
  }

  getPaymentFormValue(field: string): string {
    return this.paymentForm.get(field)?.value || '';
  }

  getCardLastFour(): string {
    const cardNumber = this.getPaymentFormValue('cardNumber').replace(/\s/g, '');
    return cardNumber.slice(-4);
  }

  // Debug Helper
  canProceedToNextStep(): boolean {
    if (this.currentStep === 1) {
      return this.shippingForm.valid;
    } else if (this.currentStep === 2) {
      return this.isPaymentValid();
    }
    return false;
  }
}