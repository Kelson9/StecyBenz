import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  id: string;
  name: string;
  price?: number;
  originalPrice?: number;
  image: string;
  quantity: number;
  category?: string;
  variant?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  private cartCountSubject = new BehaviorSubject<number>(0);
  private cartTotalSubject = new BehaviorSubject<number>(0);

  // Observables for components to subscribe to
  cartItems$ = this.cartItemsSubject.asObservable();
  cartCount$ = this.cartCountSubject.asObservable();
  cartTotal$ = this.cartTotalSubject.asObservable();

  constructor() {
    this.loadCartFromStorage();
  }

  addToCart(product: any): void {
    const existingItemIndex = this.cartItems.findIndex(item => item.id === product.id);
    
    if (existingItemIndex > -1) {
      // Item already exists, increase quantity
      this.cartItems[existingItemIndex].quantity++;
    } else {
      // New item, add to cart
      const cartItem: CartItem = {
        id: product.id,
        name: product.name,
        price: this.parsePrice(product.price),
        originalPrice: product.originalPrice ? this.parsePrice(product.originalPrice) : undefined,
        image: product.image,
        quantity: 1,
        category: product.category
      };
      this.cartItems.push(cartItem);
    }

    this.updateCart();
    this.saveCartToStorage();
    
    // Show success message
    this.showSuccessMessage(product.name);
  }

  removeFromCart(productId: string): void {
    this.cartItems = this.cartItems.filter(item => item.id !== productId);
    this.updateCart();
    this.saveCartToStorage();
  }

  updateQuantity(productId: string, quantity: number): void {
    const itemIndex = this.cartItems.findIndex(item => item.id === productId);
    if (itemIndex > -1) {
      if (quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        this.cartItems[itemIndex].quantity = quantity;
        this.updateCart();
        this.saveCartToStorage();
      }
    }
  }

  clearCart(): void {
    this.cartItems = [];
    this.updateCart();
    this.saveCartToStorage();
  }

  getCartItems(): CartItem[] {
    return [...this.cartItems];
  }

  getCartCount(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  getCartTotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  private updateCart(): void {
    this.cartItemsSubject.next([...this.cartItems]);
    this.cartCountSubject.next(this.getCartCount());
    this.cartTotalSubject.next(this.getCartTotal());
  }

  private saveCartToStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  private loadCartFromStorage(): void {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cartItems = JSON.parse(savedCart);
      this.updateCart();
    }
  }

  // Fixed parsePrice method - this is the key fix!
  private parsePrice(price: any): number {
    // Handle null or undefined
    if (price == null) {
      return 0;
    }

    // If price is already a number, return it
    if (typeof price === 'number') {
      return price;
    }
    
    // If price is a string, parse it
    if (typeof price === 'string') {
      // Remove currency symbols, commas, and spaces, then parse
      const cleanPrice = price.replace(/[$,\s₹€£¥]/g, '');
      const parsedPrice = parseFloat(cleanPrice);
      return isNaN(parsedPrice) ? 0 : parsedPrice;
    }
    
    // Try to convert to number for other types
    const numPrice = Number(price);
    return isNaN(numPrice) ? 0 : numPrice;
  }

  private showSuccessMessage(productName: string): void {
    // Create a simple toast notification
    const toast = document.createElement('div');
    toast.className = 'cart-toast';
    toast.innerHTML = `
      <div class="toast-content">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
          <polyline points="22,4 12,14.01 9,11.01"/>
        </svg>
        <span>${productName} added to cart!</span>
      </div>
    `;
    
    // Add styles
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #10b981;
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 10000;
      animation: slideIn 0.3s ease;
    `;

    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      .toast-content {
        display: flex;
        align-items: center;
        gap: 8px;
      }
    `;
    document.head.appendChild(style);

    document.body.appendChild(toast);

    // Remove after 3 seconds
    setTimeout(() => {
      toast.style.animation = 'slideIn 0.3s ease reverse';
      setTimeout(() => {
        document.body.removeChild(toast);
        document.head.removeChild(style);
      }, 300);
    }, 3000);
  }
}