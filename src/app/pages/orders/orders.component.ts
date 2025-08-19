import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
}

interface OrderItem {
  id: string;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
  total: number;
}

interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface Order {
  id: string;
  orderNumber: string;
  customer: Customer;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentMethod: string;
  orderDate: string;
  estimatedDelivery?: string;
  trackingNumber?: string;
  shippingAddress: ShippingAddress;
  notes?: string;
}

interface OrderStats {
  totalOrders: number;
  pendingOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
}

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
  Math = Math;

  // Data
  orders: Order[] = [
    {
      id: '1',
      orderNumber: 'ORD-2025-001',
      customer: {
        id: 'cust-001',
        name: 'Sarah Johnson',
        email: 'sarah.johnson@email.com',
        phone: '+1 (555) 123-4567',
        avatar: 'https://i.pravatar.cc/150?u=sarah'
      },
      items: [
        {
          id: 'prod-001',
          productName: 'Premium Hair Serum',
          productImage: 'images/hair1.jpeg',
          quantity: 2,
          price: 49.99,
          total: 99.98
        },
        {
          id: 'prod-002',
          productName: 'Luxury Shampoo Set',
          productImage: 'images/hair2.webp',
          quantity: 1,
          price: 89.99,
          total: 89.99
        }
      ],
      subtotal: 189.97,
      tax: 15.20,
      shipping: 9.99,
      discount: 0,
      total: 215.16,
      status: 'shipped',
      paymentStatus: 'paid',
      paymentMethod: 'Credit Card',
      orderDate: '2025-08-10T10:30:00Z',
      estimatedDelivery: '2025-08-18T00:00:00Z',
      trackingNumber: 'TRK123456789',
      shippingAddress: {
        street: '123 Main Street, Apt 4B',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'United States'
      },
      notes: 'Please leave at front door if no answer.'
    },
    {
      id: '2',
      orderNumber: 'ORD-2025-002',
      customer: {
        id: 'cust-002',
        name: 'Michael Chen',
        email: 'michael.chen@email.com',
        phone: '+1 (555) 234-5678'
      },
      items: [
        {
          id: 'prod-003',
          productName: 'Hair Growth Treatment',
          productImage: 'images/hair3.jpeg',
          quantity: 1,
          price: 79.99,
          total: 79.99
        }
      ],
      subtotal: 79.99,
      tax: 6.40,
      shipping: 9.99,
      discount: 10.00,
      total: 86.38,
      status: 'processing',
      paymentStatus: 'paid',
      paymentMethod: 'PayPal',
      orderDate: '2025-08-12T14:15:00Z',
      estimatedDelivery: '2025-08-20T00:00:00Z',
      shippingAddress: {
        street: '456 Oak Avenue',
        city: 'Los Angeles',
        state: 'CA',
        zipCode: '90210',
        country: 'United States'
      }
    },
    {
      id: '3',
      orderNumber: 'ORD-2025-003',
      customer: {
        id: 'cust-003',
        name: 'Emily Rodriguez',
        email: 'emily.rodriguez@email.com',
        phone: '+1 (555) 345-6789',
        avatar: 'https://i.pravatar.cc/150?u=emily'
      },
      items: [
        {
          id: 'prod-004',
          productName: 'Vitamin C Face Serum',
          productImage: 'https://picsum.photos/300/300?random=4',
          quantity: 3,
          price: 34.99,
          total: 104.97
        },
        {
          id: 'prod-005',
          productName: 'Hydrating Face Mask',
          productImage: 'https://picsum.photos/300/300?random=5',
          quantity: 2,
          price: 24.99,
          total: 49.98
        }
      ],
      subtotal: 154.95,
      tax: 12.40,
      shipping: 9.99,
      discount: 15.49,
      total: 161.85,
      status: 'delivered',
      paymentStatus: 'paid',
      paymentMethod: 'Credit Card',
      orderDate: '2025-08-08T09:45:00Z',
      estimatedDelivery: '2025-08-15T00:00:00Z',
      trackingNumber: 'TRK987654321',
      shippingAddress: {
        street: '789 Pine Street',
        city: 'Chicago',
        state: 'IL',
        zipCode: '60601',
        country: 'United States'
      }
    },
    {
      id: '4',
      orderNumber: 'ORD-2025-004',
      customer: {
        id: 'cust-004',
        name: 'David Wilson',
        email: 'david.wilson@email.com',
        phone: '+1 (555) 456-7890'
      },
      items: [
        {
          id: 'prod-006',
          productName: 'Anti-Aging Night Cream',
          productImage: 'https://picsum.photos/300/300?random=6',
          quantity: 1,
          price: 59.99,
          total: 59.99
        }
      ],
      subtotal: 59.99,
      tax: 4.80,
      shipping: 9.99,
      discount: 0,
      total: 74.78,
      status: 'pending',
      paymentStatus: 'pending',
      paymentMethod: 'Bank Transfer',
      orderDate: '2025-08-14T16:20:00Z',
      estimatedDelivery: '2025-08-22T00:00:00Z',
      shippingAddress: {
        street: '321 Elm Drive',
        city: 'Miami',
        state: 'FL',
        zipCode: '33101',
        country: 'United States'
      }
    }
  ];

  stats: OrderStats = {
    totalOrders: 156,
    pendingOrders: 23,
    totalRevenue: 45680.50,
    averageOrderValue: 125.75
  };

  // View state
  currentView: 'list' | 'details' = 'list';
  selectedOrder: Order | null = null;

  // Filters
  searchTerm = '';
  selectedStatus = '';
  selectedPaymentStatus = '';
  selectedDateRange = '30';
  sortBy = 'newest';

  // Pagination
  currentPage = 1;
  itemsPerPage = 10;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    // Simulate API call
    console.log('Loading orders...');
  }

  // Add this method after the existing methods
  trackByOrderId(index: number, order: Order): string {
    return order.id;
  }


  // Filtering and sorting
  get filteredOrders(): Order[] {
    let filtered = [...this.orders];

    // Search filter
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(order =>
        order.orderNumber.toLowerCase().includes(term) ||
        order.customer.name.toLowerCase().includes(term) ||
        order.customer.email.toLowerCase().includes(term) ||
        order.items.some(item => item.productName.toLowerCase().includes(term))
      );
    }

    // Status filter
    if (this.selectedStatus) {
      filtered = filtered.filter(order => order.status === this.selectedStatus);
    }

    // Payment status filter
    if (this.selectedPaymentStatus) {
      filtered = filtered.filter(order => order.paymentStatus === this.selectedPaymentStatus);
    }

    // Date range filter
    if (this.selectedDateRange !== 'all') {
      const days = parseInt(this.selectedDateRange);
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - days);
      filtered = filtered.filter(order => new Date(order.orderDate) >= cutoffDate);
    }

    // Sort orders
    filtered.sort((a, b) => {
      switch (this.sortBy) {
        case 'newest':
          return new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime();
        case 'oldest':
          return new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime();
        case 'amount-high':
          return b.total - a.total;
        case 'amount-low':
          return a.total - b.total;
        case 'customer':
          return a.customer.name.localeCompare(b.customer.name);
        default:
          return 0;
      }
    });

    return filtered;
  }

  get paginatedOrders(): Order[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredOrders.slice(start, start + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredOrders.length / this.itemsPerPage);
  }

  // Navigation
  selectOrder(order: Order): void {
    this.selectedOrder = order;
    this.currentView = 'details';
  }

  backToList(): void {
    this.currentView = 'list';
    this.selectedOrder = null;
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
  onUpdateStatus(order: Order, event: Event): void {
    const target = event.target as HTMLSelectElement;
    const newStatus = target.value;
    order.status = newStatus as Order['status'];
    console.log(`Updated order ${order.orderNumber} status to ${newStatus}`);
    // Add API call here
  }

  onExportOrders(): void {
    console.log('Exporting orders...');
    // Implement export functionality
  }

  onPrintOrder(order: Order): void {
    console.log('Printing order:', order.orderNumber);
    // Implement print functionality
  }

  onAddTrackingNumber(order: Order): void {
    const tracking = prompt('Enter tracking number:');
    if (tracking) {
      order.trackingNumber = tracking;
      console.log(`Added tracking ${tracking} to order ${order.orderNumber}`);
    }
  }

  onSendStatusUpdate(order: Order): void {
    console.log('Sending status update for order:', order.orderNumber);
    // Implement email notification
  }

  onRefundOrder(order: Order): void {
    if (confirm(`Are you sure you want to refund order ${order.orderNumber}?`)) {
      order.status = 'refunded';
      order.paymentStatus = 'refunded';
      console.log('Order refunded:', order.orderNumber);
    }
  }

  onCancelOrder(order: Order): void {
    if (confirm(`Are you sure you want to cancel order ${order.orderNumber}?`)) {
      order.status = 'cancelled';
      console.log('Order cancelled:', order.orderNumber);
    }
  }

  onViewCustomer(customerId: string): void {
    this.router.navigate(['/admin/customers', customerId]);
  }

  onViewProduct(productId: string): void {
    this.router.navigate(['/admin/products', productId]);
  }

  // Utility methods
  clearFilters(): void {
    this.searchTerm = '';
    this.selectedStatus = '';
    this.selectedPaymentStatus = '';
    this.selectedDateRange = '30';
    this.sortBy = 'newest';
    this.currentPage = 1;
  }

  getStatusBadgeClass(status: string): string {
    const classes = {
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

  getPaymentStatusClass(status: string): string {
    const classes = {
      'pending': 'badge-warning',
      'paid': 'badge-success',
      'failed': 'badge-danger',
      'refunded': 'badge-secondary'
    };
    return classes[status as keyof typeof classes] || 'badge-secondary';
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

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('')
      .substring(0, 2);
  }
}