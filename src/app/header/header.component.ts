/* filepath: /Users/supremum/Desktop/CONTRACTS/stecy-benz/src/app/header/header.component.ts */
import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from '../shared/cart.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  isScrolled = false;
  isMobileMenuOpen = false;
  isSearchOpen = false;
  activeDropdown: string | null = null;
  wishlistCount = 0;
  cartTotal = 0;
  cartCount = 0;
  private subscriptions = new Subscription();


  ngOnInit() {
    this.checkScrollPosition();
        // Subscribe to cart updates
    this.subscriptions.add(
      this.cartService.cartCount$.subscribe(count => {
        this.cartCount = count;
      })
    );

    this.subscriptions.add(
      this.cartService.cartTotal$.subscribe(total => {
        this.cartTotal = total;
      })
    );
  }

    ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }


    constructor(private router: Router, private cartService: CartService) {}


  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.checkScrollPosition();
  }

  @HostListener('window:resize', [])
  onWindowResize() {
    if (window.innerWidth > 1024 && this.isMobileMenuOpen) {
      this.isMobileMenuOpen = false;
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown') && this.activeDropdown) {
      this.activeDropdown = null;
    }
  }

  private checkScrollPosition() {
    this.isScrolled = window.pageYOffset > 50;
  }

  setActiveLink(section: string) {
    console.log(`Active link set to: ${section}`);
    // Add your navigation logic here
  }

  showDropdown(dropdown: string) {
    this.activeDropdown = dropdown;
  }

  hideDropdown() {
    setTimeout(() => {
      this.activeDropdown = null;
    }, 200);
  }

  toggleSearch() {
    this.isSearchOpen = !this.isSearchOpen;
    if (this.isSearchOpen) {
      setTimeout(() => {
        const searchInput = document.querySelector('.search-input') as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
        }
      }, 100);
    }
  }

  toggleWishlist() {
    console.log('Wishlist toggled');
    // Add your wishlist logic here
  }

  toggleCart() {
    console.log('Cart toggled');
    // Add your cart logic here
  }

  openConsultation() {
    console.log('Opening consultation booking');
    // Add your consultation booking logic here
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    
    // Prevent body scroll when menu is open
    if (this.isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
    document.body.style.overflow = '';
  }

  goToCart(): void {
  this.toggleCart(); 
  
  this.router.navigate(['/cart']);
}
}