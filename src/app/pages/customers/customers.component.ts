import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Address {
  type: 'shipping' | 'billing';
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface CustomerOrder {
  orderNumber: string;
  date: string;
  total: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
}

interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar?: string;
  dateJoined: string;
  lastLoginDate?: string;
  lastOrder?: string;
  status: 'active' | 'inactive' | 'blocked';
  customerType: 'regular' | 'vip' | 'wholesale';
  totalOrders: number;
  totalSpent: number;
  averageOrderValue: number;
  loyaltyPoints: number;
  preferredContactMethod: 'email' | 'phone' | 'sms';
  marketingConsent: boolean;
  addresses: Address[];
  notes?: string;
  orders: CustomerOrder[];
}

interface CustomerStats {
  totalCustomers: number;
  activeCustomers: number;
  totalRevenue: number;
  vipCustomers: number;
}

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})
export class CustomersComponent implements OnInit {
  Math = Math;

  // Data
  customers: Customer[] = [
    {
      id: 'cust-001',
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+1 (555) 123-4567',
      avatar: 'https://i.pravatar.cc/150?u=sarah',
      dateJoined: '2024-03-15T10:30:00Z',
      lastLoginDate: '2025-08-14T14:20:00Z',
      lastOrder: '2025-08-10T10:30:00Z',
      status: 'active',
      customerType: 'vip',
      totalOrders: 12,
      totalSpent: 1250.75,
      averageOrderValue: 104.23,
      loyaltyPoints: 2450,
      preferredContactMethod: 'email',
      marketingConsent: true,
      addresses: [
        {
          type: 'shipping',
          street: '123 Main Street, Apt 4B',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'United States'
        }
      ],
      notes: 'Prefers premium products. Excellent customer.',
      orders: [
        {
          orderNumber: 'ORD-2025-001',
          date: '2025-08-10T10:30:00Z',
          total: 215.16,
          status: 'delivered'
        },
        {
          orderNumber: 'ORD-2025-045',
          date: '2025-07-28T15:45:00Z',
          total: 89.99,
          status: 'delivered'
        }
      ]
    },
    {
      id: 'cust-002',
      firstName: 'Michael',
      lastName: 'Chen',
      email: 'michael.chen@email.com',
      phone: '+1 (555) 234-5678',
      dateJoined: '2024-05-20T14:15:00Z',
      lastLoginDate: '2025-08-12T09:30:00Z',
      lastOrder: '2025-08-12T14:15:00Z',
      status: 'active',
      customerType: 'regular',
      totalOrders: 8,
      totalSpent: 675.40,
      averageOrderValue: 84.43,
      loyaltyPoints: 1350,
      preferredContactMethod: 'phone',
      marketingConsent: false,
      addresses: [
        {
          type: 'shipping',
          street: '456 Oak Avenue',
          city: 'Los Angeles',
          state: 'CA',
          zipCode: '90210',
          country: 'United States'
        }
      ],
      orders: [
        {
          orderNumber: 'ORD-2025-002',
          date: '2025-08-12T14:15:00Z',
          total: 86.38,
          status: 'processing'
        }
      ]
    },
    {
      id: 'cust-003',
      firstName: 'Emily',
      lastName: 'Rodriguez',
      email: 'emily.rodriguez@email.com',
      phone: '+1 (555) 345-6789',
      avatar: 'https://i.pravatar.cc/150?u=emily',
      dateJoined: '2024-01-10T09:45:00Z',
      lastLoginDate: '2025-08-13T11:15:00Z',
      lastOrder: '2025-08-08T09:45:00Z',
      status: 'active',
      customerType: 'vip',
      totalOrders: 25,
      totalSpent: 2890.50,
      averageOrderValue: 115.62,
      loyaltyPoints: 5780,
      preferredContactMethod: 'email',
      marketingConsent: true,
      addresses: [
        {
          type: 'shipping',
          street: '789 Pine Street',
          city: 'Chicago',
          state: 'IL',
          zipCode: '60601',
          country: 'United States'
        },
        {
          type: 'billing',
          street: '789 Pine Street',
          city: 'Chicago',
          state: 'IL',
          zipCode: '60601',
          country: 'United States'
        }
      ],
      notes: 'Long-time customer, very loyal. Always leaves positive reviews.',
      orders: [
        {
          orderNumber: 'ORD-2025-003',
          date: '2025-08-08T09:45:00Z',
          total: 161.85,
          status: 'delivered'
        }
      ]
    },
    {
      id: 'cust-004',
      firstName: 'David',
      lastName: 'Wilson',
      email: 'david.wilson@email.com',
      phone: '+1 (555) 456-7890',
      dateJoined: '2024-11-05T16:20:00Z',
      lastLoginDate: '2025-08-01T08:45:00Z',
      lastOrder: '2025-07-20T12:30:00Z',
      status: 'inactive',
      customerType: 'regular',
      totalOrders: 3,
      totalSpent: 245.80,
      averageOrderValue: 81.93,
      loyaltyPoints: 490,
      preferredContactMethod: 'sms',
      marketingConsent: true,
      addresses: [
        {
          type: 'shipping',
          street: '321 Elm Drive',
          city: 'Miami',
          state: 'FL',
          zipCode: '33101',
          country: 'United States'
        }
      ],
      orders: [
        {
          orderNumber: 'ORD-2025-067',
          date: '2025-07-20T12:30:00Z',
          total: 74.78,
          status: 'delivered'
        }
      ]
    },
    {
      id: 'cust-005',
      firstName: 'Jessica',
      lastName: 'Brown',
      email: 'jessica.brown@email.com',
      phone: '+1 (555) 567-8901',
      avatar: 'https://i.pravatar.cc/150?u=jessica',
      dateJoined: '2024-08-22T13:10:00Z',
      lastLoginDate: '2025-08-15T16:30:00Z',
      lastOrder: '2025-08-14T11:20:00Z',
      status: 'active',
      customerType: 'wholesale',
      totalOrders: 35,
      totalSpent: 8950.25,
      averageOrderValue: 255.72,
      loyaltyPoints: 17900,
      preferredContactMethod: 'email',
      marketingConsent: true,
      addresses: [
        {
          type: 'shipping',
          street: '555 Business Plaza, Suite 200',
          city: 'Seattle',
          state: 'WA',
          zipCode: '98101',
          country: 'United States'
        }
      ],
      notes: 'Wholesale customer - bulk orders for salon business.',
      orders: [
        {
          orderNumber: 'ORD-2025-089',
          date: '2025-08-14T11:20:00Z',
          total: 1250.00,
          status: 'shipped'
        }
      ]
    }
  ];

  stats: CustomerStats = {
    totalCustomers: 1247,
    activeCustomers: 1089,
    totalRevenue: 156780.50,
    vipCustomers: 89
  };

  // View state
  currentView: 'list' | 'details' = 'list';
  selectedCustomer: Customer | null = null;

  // Filters
  searchTerm = '';
  selectedStatus = '';
  selectedType = '';
  selectedDateRange = '30';
  sortBy = 'newest';

  // Pagination
  currentPage = 1;
  itemsPerPage = 10;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    // Simulate API call
    console.log('Loading customers...');
  }

  // Filtering and sorting
  get filteredCustomers(): Customer[] {
    let filtered = [...this.customers];

    // Search filter
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(customer =>
        customer.firstName.toLowerCase().includes(term) ||
        customer.lastName.toLowerCase().includes(term) ||
        customer.email.toLowerCase().includes(term) ||
        customer.phone.includes(term)
      );
    }

    // Status filter
    if (this.selectedStatus) {
      filtered = filtered.filter(customer => customer.status === this.selectedStatus);
    }

    // Type filter
    if (this.selectedType) {
      filtered = filtered.filter(customer => customer.customerType === this.selectedType);
    }

    // Date range filter
    if (this.selectedDateRange !== 'all') {
      const days = parseInt(this.selectedDateRange);
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - days);
      filtered = filtered.filter(customer => new Date(customer.dateJoined) >= cutoffDate);
    }

    // Sort customers
    filtered.sort((a, b) => {
      switch (this.sortBy) {
        case 'newest':
          return new Date(b.dateJoined).getTime() - new Date(a.dateJoined).getTime();
        case 'oldest':
          return new Date(a.dateJoined).getTime() - new Date(b.dateJoined).getTime();
        case 'name':
          return (a.firstName + ' ' + a.lastName).localeCompare(b.firstName + ' ' + b.lastName);
        case 'spent-high':
          return b.totalSpent - a.totalSpent;
        case 'spent-low':
          return a.totalSpent - b.totalSpent;
        case 'orders-high':
          return b.totalOrders - a.totalOrders;
        case 'orders-low':
          return a.totalOrders - b.totalOrders;
        default:
          return 0;
      }
    });

    return filtered;
  }

  get paginatedCustomers(): Customer[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredCustomers.slice(start, start + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredCustomers.length / this.itemsPerPage);
  }

  // Navigation
  selectCustomer(customer: Customer): void {
    this.selectedCustomer = customer;
    this.currentView = 'details';
  }

  backToList(): void {
    this.currentView = 'list';
    this.selectedCustomer = null;
  }

  // Pagination
  goToPage(page: number): void {
    this.currentPage = page;
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  // Actions
  onCreateCustomer(): void {
    this.router.navigate(['/admin/customers/create']);
  }

  onEditCustomer(customer: Customer): void {
    this.router.navigate(['/admin/customers/edit', customer.id]);
  }

  onViewOrders(customer: Customer): void {
    this.router.navigate(['/admin/orders'], { queryParams: { customer: customer.id } });
  }

  onSendEmail(customer: Customer): void {
    console.log('Sending email to:', customer.email);
    // Implement email functionality
  }

  onAddNote(customer: Customer): void {
    const note = prompt('Add a note for this customer:');
    if (note) {
      customer.notes = note;
      console.log('Added note for:', customer.firstName, customer.lastName);
    }
  }

  onExportCustomers(): void {
    console.log('Exporting customers...');
    // Implement export functionality
  }

  onBlockCustomer(customer: Customer): void {
    if (confirm(`Are you sure you want to block ${customer.firstName} ${customer.lastName}?`)) {
      customer.status = 'blocked';
      console.log('Customer blocked:', customer.firstName, customer.lastName);
    }
  }

  onDeleteCustomer(customer: Customer): void {
    if (confirm(`Are you sure you want to delete ${customer.firstName} ${customer.lastName}? This action cannot be undone.`)) {
      const index = this.customers.findIndex(c => c.id === customer.id);
      if (index > -1) {
        this.customers.splice(index, 1);
        console.log('Customer deleted:', customer.firstName, customer.lastName);
      }
    }
  }

  // Utility methods
  clearFilters(): void {
    this.searchTerm = '';
    this.selectedStatus = '';
    this.selectedType = '';
    this.selectedDateRange = '30';
    this.sortBy = 'newest';
    this.currentPage = 1;
  }

  trackByCustomerId(index: number, customer: Customer): string {
    return customer.id;
  }

  getCustomerName(customer: Customer): string {
    return `${customer.firstName} ${customer.lastName}`;
  }

  getInitials(firstName: string, lastName: string): string {
    return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
  }

  getStatusBadgeClass(status: string): string {
    const classes = {
      'active': 'badge-success',
      'inactive': 'badge-warning',
      'blocked': 'badge-danger',
      'pending': 'badge-warning',
      'confirmed': 'badge-info',
      'processing': 'badge-primary',
      'shipped': 'badge-info',
      'delivered': 'badge-success',
      'cancelled': 'badge-danger',
      'refunded': 'badge-secondary'
    };
    return classes[status as keyof typeof classes] || 'badge-secondary';
  }

  getCustomerTypeBadgeClass(type: string): string {
    const classes = {
      'regular': 'badge-secondary',
      'vip': 'badge-warning',
      'wholesale': 'badge-primary'
    };
    return classes[type as keyof typeof classes] || 'badge-secondary';
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  formatShortDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  getDaysSinceJoined(customer: Customer): number {
    const joinDate = new Date(customer.dateJoined);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - joinDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  getDaysSinceLastOrder(customer: Customer): number {
    if (!customer.lastOrder) return 0;
    const lastOrderDate = new Date(customer.lastOrder);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - lastOrderDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
}