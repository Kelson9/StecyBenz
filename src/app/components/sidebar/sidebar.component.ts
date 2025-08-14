/* filepath: /Users/supremum/Desktop/CONTRACTS/stecy-benz/src/app/components/sidebar/sidebar.component.ts */
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Output() sidebarToggle = new EventEmitter<boolean>();

  isCollapsed = false;
  showProfileMenu = false;
  orderNotifications = 3;

  expandedItems = {
    products: false,
    events: false,
    customers: false
  };

  constructor(private router: Router) {}

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    this.sidebarToggle.emit(this.isCollapsed);
    
    // Close profile menu when collapsing
    if (this.isCollapsed) {
      this.showProfileMenu = false;
    }
  }

  toggleProfileMenu() {
    this.showProfileMenu = !this.showProfileMenu;
  }

  toggleSubmenu(item: keyof typeof this.expandedItems) {
    // Close other submenus when opening a new one
    Object.keys(this.expandedItems).forEach(key => {
      if (key !== item) {
        this.expandedItems[key as keyof typeof this.expandedItems] = false;
      }
    });
    
    this.expandedItems[item] = !this.expandedItems[item];
  }

  profileAction(action: string) {
    this.showProfileMenu = false;
    
    switch (action) {
      case 'profile':
        this.router.navigate(['/dashboard/profile']);
        break;
      case 'settings':
        this.router.navigate(['/dashboard/settings']);
        break;
      case 'logout':
        this.logout();
        break;
    }
  }

  private logout() {
    // Implement logout logic
    console.log('Logging out...');
    this.router.navigate(['/login']);
  }

  openSupport() {
    console.log('Opening support...');
    // Implement support functionality
  }

  showUpgradeModal() {
    console.log('Showing upgrade modal...');
    // Implement upgrade modal
  }

  quickAction(action: string) {
    switch (action) {
      case 'add':
        this.router.navigate(['/dashboard/products/create']);
        break;
      case 'search':
        console.log('Opening quick search...');
        break;
    }
  }
}