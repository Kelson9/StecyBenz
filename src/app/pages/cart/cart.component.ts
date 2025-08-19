import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService, CartItem } from '../../shared/cart.service';
import { Subscription } from 'rxjs';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, HeaderComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit, OnDestroy {
  cartItems: CartItem[] = [];
  cartTotal = 0;
  cartSubtotal = 0;
  shipping = 0;
  tax = 0;
  discount = 0;
  promoCode = '';
  
  // WhatsApp Configuration
  whatsappNumber = '+8613197868201'; // Replace with your business WhatsApp number
  businessName = 'STECY BENZ';
  
  private subscriptions = new Subscription();

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.cartService.cartItems$.subscribe(items => {
        this.cartItems = items;
        this.calculateTotals();
      })
    );

    this.subscriptions.add(
      this.cartService.cartTotal$.subscribe(total => {
        this.cartTotal = total;
        this.calculateTotals();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  calculateTotals(): void {
    this.cartSubtotal = this.cartTotal;
    this.shipping = this.cartSubtotal > 75 ? 0 : 9.99;
    this.tax = this.cartSubtotal * 0.08;
    this.cartTotal = this.cartSubtotal + this.shipping + this.tax - this.discount;
  }

  updateQuantity(productId: string, quantity: number): void {
    if (quantity < 1) {
      this.removeItem(productId);
    } else {
      this.cartService.updateQuantity(productId, quantity);
    }
  }

  onQuantityChange(event: Event, productId: string): void {
    const target = event.target as HTMLInputElement;
    const quantity = parseInt(target.value, 10);
    if (!isNaN(quantity)) {
      this.updateQuantity(productId, quantity);
    }
  }

  removeItem(productId: string): void {
    this.cartService.removeFromCart(productId);
  }

  clearCart(): void {
    if (confirm('Are you sure you want to clear your cart?')) {
      this.cartService.clearCart();
    }
  }

  applyPromoCode(): void {
    if (this.promoCode.toLowerCase() === 'save10') {
      this.discount = this.cartSubtotal * 0.1;
      this.calculateTotals();
      this.showMessage('Promo code applied! 10% discount added.', 'success');
    } else if (this.promoCode.toLowerCase() === 'freeship') {
      this.shipping = 0;
      this.calculateTotals();
      this.showMessage('Free shipping applied!', 'success');
    } else {
      this.showMessage('Invalid promo code. Try SAVE10 or FREESHIP', 'error');
    }
  }

  proceedToCheckout(): void {
    if (this.cartItems.length === 0) {
      this.showMessage('Your cart is empty!', 'error');
      return;
    }
    this.router.navigate(['/checkout']);
  }

  continueShopping(): void {
    this.router.navigate(['/home']);
  }

  // WhatsApp Order Functionality
  orderViaWhatsApp(): void {
    if (this.cartItems.length === 0) {
      this.showMessage('Your cart is empty! Add some products first.', 'error');
      return;
    }

    const message = this.generateWhatsAppMessage();
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${this.whatsappNumber.replace(/[^\d]/g, '')}?text=${encodedMessage}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
    
    this.showMessage('Opening WhatsApp to place your order!', 'success');
  }

  private generateWhatsAppMessage(): string {
    const now = new Date();
    const orderDate = now.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    const orderTime = now.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });

    let message = `🛍️ *NEW ORDER FROM ${this.businessName.toUpperCase()}* 🛍️\n\n`;
    message += `📅 *Date:* ${orderDate}\n`;
    message += `⏰ *Time:* ${orderTime}\n`;
    message += `🆔 *Order ID:* ORD-${Date.now()}\n\n`;
    
    message += `📦 *ORDERED ITEMS:*\n`;
    message += `${'─'.repeat(30)}\n\n`;

    this.cartItems.forEach((item, index) => {
      const itemTotal = this.getItemTotal(item);
      const savings = this.getSavings(item);
      
      message += `${index + 1}. *${item.name}*\n`;
      
      if (item.category) {
        message += `   📂 Category: ${item.category}\n`;
      }
      
      if (item.variant) {
        message += `   🎨 Variant: ${item.variant}\n`;
      }
      
      message += `   💰 Price: ${this.formatCurrency(item.price)}`;
      
      if (item.originalPrice && savings > 0) {
        message += ` ~~${this.formatCurrency(item.originalPrice)}~~ 🔥\n`;
        message += `   💚 You Save: ${this.formatCurrency(savings)}\n`;
      } else {
        message += `\n`;
      }
      
      message += `   📊 Quantity: ${item.quantity}\n`;
      message += `   💵 Subtotal: *${this.formatCurrency(itemTotal)}*\n\n`;
    });

    message += `${'═'.repeat(30)}\n\n`;
    
    // Order Summary
    message += `📋 *ORDER SUMMARY:*\n`;
    message += `${'─'.repeat(20)}\n`;
    message += `🛒 Items (${this.cartItems.length}): ${this.formatCurrency(this.cartSubtotal)}\n`;
    
    if (this.discount > 0) {
      message += `🎟️ Discount: -${this.formatCurrency(this.discount)}\n`;
    }
    
    message += `🚚 Shipping: ${this.shipping === 0 ? 'FREE 🎉' : this.formatCurrency(this.shipping)}\n`;
    message += `🧾 Tax: ${this.formatCurrency(this.tax)}\n`;
    message += `${'─'.repeat(20)}\n`;
    message += `💰 *TOTAL: ${this.formatCurrency(this.cartTotal)}*\n\n`;

    // Special offers message
    if (this.shipping === 0 && this.cartSubtotal >= 75) {
      message += `🎉 *Congratulations!* You qualified for FREE shipping!\n\n`;
    } else if (this.cartSubtotal < 75) {
      const remaining = 75 - this.cartSubtotal;
      message += `💡 *Tip:* Add ${this.formatCurrency(remaining)} more to get FREE shipping!\n\n`;
    }

    // Customer instructions
    message += `📝 *NEXT STEPS:*\n`;
    message += `1️⃣ Confirm your order by replying "CONFIRMED"\n`;
    message += `2️⃣ Share your delivery address\n`;
    message += `3️⃣ Choose payment method (Cash/Card/Transfer)\n`;
    message += `4️⃣ We'll process your order within 24 hours\n\n`;

    // Contact information
    message += `📞 *CONTACT INFO:*\n`;
    message += `🌐 Website: www.stecybenz.com\n`;
    message += `📧 Email: orders@stecybenz.com\n`;
    message += `📱 WhatsApp: ${this.whatsappNumber}\n\n`;

    // Footer
    message += `✨ *Thank you for choosing ${this.businessName}!* ✨\n`;
    message += `We appreciate your business and look forward to serving you! 🙏\n\n`;
    message += `#StecyBenz #BeautyProducts #OnlineOrder #QualityProducts`;

    return message;
  }

  saveForLater(productId: string): void {
    console.log('Saving item for later:', productId);
    this.showMessage('Item saved for later!', 'success');
  }

  moveToWishlist(productId: string): void {
    console.log('Moving to wishlist:', productId);
    this.showMessage('Item moved to wishlist!', 'success');
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }

  getItemTotal(item: CartItem): number {
    return item.price * item.quantity;
  }

  getSavings(item: CartItem): number {
    if (item.originalPrice) {
      return (item.originalPrice - item.price) * item.quantity;
    }
    return 0;
  }

  trackByItemId(index: number, item: CartItem): string {
    return item.id;
  }

  private showMessage(message: string, type: 'success' | 'error'): void {
    const toast = document.createElement('div');
    toast.className = `cart-toast ${type}`;
    toast.innerHTML = `
      <div class="toast-content">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          ${type === 'success' 
            ? '<path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22,4 12,14.01 9,11.01"/>'
            : '<circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>'
          }
        </svg>
        <span>${message}</span>
      </div>
    `;
    
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === 'success' ? '#10b981' : '#ef4444'};
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 10000;
      animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'slideIn 0.3s ease reverse';
      setTimeout(() => {
        if (document.body.contains(toast)) {
          document.body.removeChild(toast);
        }
      }, 300);
    }, 3000);
  }
}