import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

interface TimeSeriesData {
  date: string;
  value: number;
}

interface PaymentMethod {
  method: string;
  amount: number;
  percentage: number;
  transactions: number;
}

interface ProductPerformance {
  id: string;
  name: string;
  category: string;
  sales: number;
  revenue: number;
  units: number;
  growth: number;
}

interface CustomerSegment {
  segment: string;
  customers: number;
  revenue: number;
  averageOrder: number;
  percentage: number;
}

interface AnalyticsData {
  revenue: {
    total: number;
    growth: number;
    target: number;
    monthly: TimeSeriesData[];
  };
  orders: {
    total: number;
    growth: number;
    pending: number;
    completed: number;
    cancelled: number;
    monthly: TimeSeriesData[];
  };
  payments: {
    totalProcessed: number;
    successRate: number;
    averageValue: number;
    methods: PaymentMethod[];
    daily: TimeSeriesData[];
  };
  customers: {
    total: number;
    newCustomers: number;
    returningRate: number;
    segments: CustomerSegment[];
  };
  products: {
    topPerforming: ProductPerformance[];
    categories: ChartDataPoint[];
  };
  conversion: {
    rate: number;
    visitors: number;
    sessions: number;
    bounceRate: number;
  };
}

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss'
})
export class AnalyticsComponent implements OnInit {
  Math = Math;

  // Date range options
  dateRanges = [
    { value: '7', label: 'Last 7 days' },
    { value: '30', label: 'Last 30 days' },
    { value: '90', label: 'Last 3 months' },
    { value: '365', label: 'Last year' },
    { value: 'custom', label: 'Custom range' }
  ];

  selectedDateRange = '30';
  customStartDate = '';
  customEndDate = '';

  // Analytics data
  analyticsData: AnalyticsData = {
    revenue: {
      total: 156780.50,
      growth: 18.5,
      target: 180000,
      monthly: [
        { date: '2025-01', value: 42500 },
        { date: '2025-02', value: 48200 },
        { date: '2025-03', value: 52100 },
        { date: '2025-04', value: 58900 },
        { date: '2025-05', value: 61200 },
        { date: '2025-06', value: 67400 },
        { date: '2025-07', value: 72800 },
        { date: '2025-08', value: 78900 }
      ]
    },
    orders: {
      total: 1247,
      growth: 12.3,
      pending: 23,
      completed: 1156,
      cancelled: 68,
      monthly: [
        { date: '2025-01', value: 142 },
        { date: '2025-02', value: 156 },
        { date: '2025-03', value: 168 },
        { date: '2025-04', value: 189 },
        { date: '2025-05', value: 195 },
        { date: '2025-06', value: 210 },
        { date: '2025-07', value: 225 },
        { date: '2025-08', value: 234 }
      ]
    },
    payments: {
      totalProcessed: 1678950.75,
      successRate: 97.8,
      averageValue: 125.75,
      methods: [
        { method: 'Credit Card', amount: 1006970.45, percentage: 60, transactions: 748 },
        { method: 'PayPal', amount: 419735.19, percentage: 25, transactions: 312 },
        { method: 'Bank Transfer', amount: 167895.08, percentage: 10, transactions: 125 },
        { method: 'Apple Pay', amount: 84350.03, percentage: 5, transactions: 62 }
      ],
      daily: [
        { date: '2025-08-01', value: 4200 },
        { date: '2025-08-02', value: 3850 },
        { date: '2025-08-03', value: 4600 },
        { date: '2025-08-04', value: 3200 },
        { date: '2025-08-05', value: 5100 },
        { date: '2025-08-06', value: 4800 },
        { date: '2025-08-07', value: 5400 }
      ]
    },
    customers: {
      total: 2847,
      newCustomers: 156,
      returningRate: 68.5,
      segments: [
        { segment: 'New Customers', customers: 856, revenue: 42800, averageOrder: 50, percentage: 30 },
        { segment: 'Regular Customers', customers: 1421, revenue: 78900, averageOrder: 55.5, percentage: 50 },
        { segment: 'VIP Customers', customers: 398, revenue: 89600, averageOrder: 225, percentage: 14 },
        { segment: 'Wholesale', customers: 172, revenue: 145400, averageOrder: 845, percentage: 6 }
      ]
    },
    products: {
      topPerforming: [
        { id: 'prod-001', name: 'Premium Hair Serum', category: 'Hair Care', sales: 234, revenue: 11696, units: 234, growth: 15.2 },
        { id: 'prod-002', name: 'Luxury Shampoo Set', category: 'Hair Care', sales: 189, revenue: 16998, units: 189, growth: 22.1 },
        { id: 'prod-003', name: 'Vitamin C Face Serum', category: 'Skincare', sales: 298, revenue: 10423, units: 298, growth: 8.7 },
        { id: 'prod-004', name: 'Anti-Aging Night Cream', category: 'Skincare', sales: 156, revenue: 9354, units: 156, growth: 28.3 },
        { id: 'prod-005', name: 'Hair Growth Treatment', category: 'Hair Care', sales: 142, revenue: 11358, units: 142, growth: -3.2 }
      ],
      categories: [
        { label: 'Hair Care', value: 45.2, color: '#6366f1' },
        { label: 'Skincare', value: 32.8, color: '#10b981' },
        { label: 'Makeup', value: 15.6, color: '#f59e0b' },
        { label: 'Accessories', value: 6.4, color: '#ef4444' }
      ]
    },
    conversion: {
      rate: 3.2,
      visitors: 15670,
      sessions: 12450,
      bounceRate: 42.3
    }
  };

  // Chart configurations
  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#f3f4f6'
        }
      },
      x: {
        grid: {
          color: '#f3f4f6'
        }
      }
    },
    plugins: {
      legend: {
        display: false
      }
    }
  };

  constructor() {}

  ngOnInit(): void {
    this.loadAnalyticsData();
  }

  loadAnalyticsData(): void {
    // Simulate API call based on selected date range
    console.log('Loading analytics data for:', this.selectedDateRange);
  }

  onDateRangeChange(): void {
    this.loadAnalyticsData();
  }

  onCustomDateChange(): void {
    if (this.customStartDate && this.customEndDate) {
      this.loadAnalyticsData();
    }
  }

  onExportReport(): void {
    console.log('Exporting analytics report...');
    // Implement export functionality
  }

  onRefreshData(): void {
    console.log('Refreshing analytics data...');
    this.loadAnalyticsData();
  }

  // Utility methods
  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  }

  formatCurrencyDetailed(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }

  formatPercentage(value: number): string {
    return `${value.toFixed(1)}%`;
  }

  formatNumber(value: number): string {
    return new Intl.NumberFormat('en-US').format(value);
  }

  formatCompactNumber(value: number): string {
    return new Intl.NumberFormat('en-US', {
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(value);
  }

  getGrowthClass(growth: number): string {
    if (growth > 0) return 'positive';
    if (growth < 0) return 'negative';
    return 'neutral';
  }

  getGrowthIcon(growth: number): string {
    if (growth > 0) return '↗';
    if (growth < 0) return '↘';
    return '→';
  }

  getProgressPercentage(current: number, target: number): number {
    return Math.min((current / target) * 100, 100);
  }

  getPaymentMethodIcon(method: string): string {
    const icons = {
      'Credit Card': '💳',
      'PayPal': '🅿️',
      'Bank Transfer': '🏦',
      'Apple Pay': '📱'
    };
    return icons[method as keyof typeof icons] || '💰';
  }

  getTopPerformingProducts(limit: number = 5): ProductPerformance[] {
    return this.analyticsData.products.topPerforming
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, limit);
  }

  getOrderStatusPercentage(status: 'pending' | 'completed' | 'cancelled'): number {
    const total = this.analyticsData.orders.total;
    return (this.analyticsData.orders[status] / total) * 100;
  }

  getTotalRevenueForPeriod(): number {
    return this.analyticsData.revenue.monthly.reduce((sum, item) => sum + item.value, 0);
  }

  getAverageOrderValue(): number {
    return this.analyticsData.revenue.total / this.analyticsData.orders.total;
  }

getConversionFunnelData() {
    const { visitors, sessions } = this.analyticsData.conversion;
    const totalOrders = this.analyticsData.orders.total;
    
    return [
      { stage: 'Visitors', count: visitors, percentage: 100 },
      { stage: 'Sessions', count: sessions, percentage: (sessions / visitors) * 100 },
      { stage: 'Orders', count: totalOrders, percentage: (totalOrders / sessions) * 100 }
    ];
  }
}