/* filepath: /Users/supremum/Desktop/CONTRACTS/stecy-benz/src/app/components/navbar/navbar.component.ts */
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs/operators';

interface Breadcrumb {
  label: string;
  url?: string;
}

interface SearchResult {
  title: string;
  subtitle: string;
  url: string;
  icon: string;
  category: string;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'warning' | 'error' | 'info';
  timestamp: Date;
  read: boolean;
}

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  @Input() sidebarCollapsed = false;

  currentPageTitle = 'Dashboard';
  breadcrumbs: Breadcrumb[] = [];
  searchQuery = '';
  searchFocused = false;
  searchResults: SearchResult[] = [];
  mobileMenuOpen = false;
  showNotifications = false;
  showUserMenu = false;
  isDarkMode = false;
  isLoading = false;

  unreadNotifications = 3;
  notifications: Notification[] = [
    {
      id: '1',
      title: 'New Order Received',
      message: 'Order #12345 has been placed by John Doe',
      type: 'success',
      timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
      read: false
    },
    {
      id: '2',
      title: 'Low Stock Alert',
      message: 'Hair Serum Premium is running low (5 items left)',
      type: 'warning',
      timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
      read: false
    },
    {
      id: '3',
      title: 'Payment Failed',
      message: 'Payment for order #12344 could not be processed',
      type: 'error',
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      read: false
    },
    {
      id: '4',
      title: 'New Customer Registered',
      message: 'Jane Smith has created a new account',
      type: 'info',
      timestamp: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
      read: true
    }
  ];

  searchCategories = [
    { key: 'products', name: 'Products' },
    { key: 'orders', name: 'Orders' },
    { key: 'customers', name: 'Customers' }
  ];

  private allSearchResults: SearchResult[] = [
    {
      title: 'Hair Serum Premium',
      subtitle: 'Hair Care • In Stock',
      url: '/dashboard/products/1',
      icon: 'M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z',
      category: 'products'
    },
    {
      title: 'Moisturizing Shampoo',
      subtitle: 'Hair Care • Low Stock',
      url: '/dashboard/products/2',
      icon: 'M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z',
      category: 'products'
    },
    {
      title: 'Order #12345',
      subtitle: 'John Doe • $125.99 • Pending',
      url: '/dashboard/orders/12345',
      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
      category: 'orders'
    },
    {
      title: 'John Doe',
      subtitle: 'john@example.com • VIP Customer',
      url: '/dashboard/customers/1',
      icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
      category: 'customers'
    }
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    this.updatePageInfo();
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updatePageInfo();
      });

    // Check for saved theme preference
    this.isDarkMode = localStorage.getItem('theme') === 'dark';
    this.applyTheme();

    // Close dropdowns when clicking outside
    document.addEventListener('click', (event) => {
      if (!event.target) return;
      
      const target = event.target as Element;
      if (!target.closest('.notification-container')) {
        this.showNotifications = false;
      }
      if (!target.closest('.user-profile-container')) {
        this.showUserMenu = false;
      }
      if (!target.closest('.search-container')) {
        this.searchFocused = false;
      }
    });
  }

  private updatePageInfo() {
    const url = this.router.url;
    const segments = url.split('/').filter(segment => segment);

    // Update page title and breadcrumbs based on route
    if (url === '/dashboard' || url === '/') {
      this.currentPageTitle = 'Dashboard';
      this.breadcrumbs = [];
    } else if (url.includes('/products')) {
      this.currentPageTitle = 'Products';
      this.breadcrumbs = [
        { label: 'Dashboard', url: '/dashboard' },
        { label: 'Products' }
      ];
    } else if (url.includes('/orders')) {
      this.currentPageTitle = 'Orders';
      this.breadcrumbs = [
        { label: 'Dashboard', url: '/dashboard' },
        { label: 'Orders' }
      ];
    } else if (url.includes('/customers')) {
      this.currentPageTitle = 'Customers';
      this.breadcrumbs = [
        { label: 'Dashboard', url: '/dashboard' },
        { label: 'Customers' }
      ];
    } else if (url.includes('/analytics')) {
      this.currentPageTitle = 'Analytics';
      this.breadcrumbs = [
        { label: 'Dashboard', url: '/dashboard' },
        { label: 'Analytics' }
      ];
    } else if (url.includes('/events')) {
      this.currentPageTitle = 'Events';
      this.breadcrumbs = [
        { label: 'Dashboard', url: '/dashboard' },
        { label: 'Events' }
      ];
    } else if (url.includes('/settings')) {
      this.currentPageTitle = 'Settings';
      this.breadcrumbs = [
        { label: 'Dashboard', url: '/dashboard' },
        { label: 'Settings' }
      ];
    }
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  onSearch(event: KeyboardEvent) {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    
    if (query.length === 0) {
      this.searchResults = [];
      return;
    }

    if (query.length >= 2) {
      this.searchResults = this.allSearchResults.filter(result =>
        result.title.toLowerCase().includes(query) ||
        result.subtitle.toLowerCase().includes(query)
      );
    }
  }

  onSearchBlur() {
    // Delay hiding results to allow for clicks
    setTimeout(() => {
      this.searchFocused = false;
    }, 200);
  }

  getResultsByCategory(category: string): SearchResult[] {
    return this.searchResults.filter(result => result.category === category);
  }

  selectSearchResult(result: SearchResult) {
    this.searchQuery = result.title;
    this.searchFocused = false;
    this.router.navigate([result.url]);
  }

  toggleSearchFilters() {
    console.log('Toggle search filters');
    // Implement search filters functionality
  }

  quickAction(action: string) {
    switch (action) {
      case 'add':
        this.router.navigate(['/dashboard/products/create']);
        break;
      case 'scan':
        console.log('Open scanner');
        // Implement QR/Barcode scanner
        break;
    }
  }

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
    this.showUserMenu = false; // Close other dropdowns
  }

  markAsRead(notification: Notification) {
    if (!notification.read) {
      notification.read = true;
      this.unreadNotifications = Math.max(0, this.unreadNotifications - 1);
    }
  }

  markAllAsRead() {
    this.notifications.forEach(notification => {
      notification.read = true;
    });
    this.unreadNotifications = 0;
  }

  getNotificationIcon(type: string): string {
    const icons = {
      success: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
      warning: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z',
      error: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z',
      info: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
    };
    return icons[type as keyof typeof icons] || icons.info;
  }

  getTimeAgo(timestamp: Date): string {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  }

  trackNotification(index: number, notification: Notification): string {
    return notification.id;
  }

  openSettings() {
    this.router.navigate(['/dashboard/settings']);
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    this.applyTheme();
  }

  private applyTheme() {
    if (this.isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }

  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
    this.showNotifications = false; // Close other dropdowns
  }

  logout() {
    console.log('Logging out...');
    this.showUserMenu = false;
    // Implement logout logic
    this.router.navigate(['/login']);
  }
}