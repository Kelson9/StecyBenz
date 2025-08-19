import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';

interface Product {
  id: string;
  category: string;
  name: string;
  price: number;
  rating: number;
  image: string;
  description: string;
  status: 'active' | 'inactive' | 'draft';
  createdAt: string;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class ProductsComponent implements OnInit {

  trackByProductId(index: number, product: Product): string {
    return product.id;
  }

   Math = Math;
  products: Product[] = [];
  filteredProducts: Product[] = [];
  
  // Filter and search
  searchTerm = '';
  selectedCategory = '';
  selectedStatus = '';
  sortBy = 'name';
  sortDirection: 'asc' | 'desc' = 'asc';
  
  // Pagination
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 0;
  
  // View options
  viewMode: 'table' | 'grid' = 'table';
  isLoading = false;

  categories = [
    'Skincare',
    'Makeup',
    'Fragrance',
    'Hair Care',
    'Beauty Tools',
    'Wellness'
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  private loadProducts(): void {
    this.isLoading = true;
    
    // Simulate API call with sample data
    setTimeout(() => {
      this.products = [
        {
          id: '1',
          category: 'Skincare',
          name: 'Hydrating Vitamin C Serum',
          price: 49.99,
          rating: 4.8,
          image: 'https://picsum.photos/300/300?random=1',
          description: 'Brightening serum with vitamin C and hyaluronic acid',
          status: 'active',
          createdAt: '2024-01-15'
        },
        {
          id: '2',
          category: 'Makeup',
          name: 'Matte Liquid Lipstick',
          price: 24.99,
          rating: 4.5,
          image: 'https://picsum.photos/300/300?random=2',
          description: 'Long-lasting matte finish lipstick',
          status: 'active',
          createdAt: '2024-01-10'
        },
        {
          id: '3',
          category: 'Skincare',
          name: 'Radiant Foundation',
          price: 34.99,
          rating: 4.7,
          image: 'https://picsum.photos/300/300?random=3',
          description: 'Full coverage foundation for all skin types',
          status: 'active',
          createdAt: '2024-01-08'
        },
        {
          id: '4',
          category: 'Fragrance',
          name: 'Elegant Rose Perfume',
          price: 89.99,
          rating: 4.9,
          image: 'https://picsum.photos/300/300?random=4',
          description: 'Luxury rose-scented perfume',
          status: 'active',
          createdAt: '2024-01-05'
        },
        {
          id: '5',
          category: 'Hair Care',
          name: 'Nourishing Hair Oil',
          price: 19.99,
          rating: 4.3,
          image: 'https://picsum.photos/300/300?random=5',
          description: 'Natural hair oil for dry and damaged hair',
          status: 'draft',
          createdAt: '2024-01-03'
        },
        {
          id: '6',
          category: 'Beauty Tools',
          name: 'Professional Makeup Brushes Set',
          price: 59.99,
          rating: 4.6,
          image: 'https://picsum.photos/300/300?random=6',
          description: 'Complete set of professional makeup brushes',
          status: 'active',
          createdAt: '2024-01-01'
        },
        {
          id: '7',
          category: 'Wellness',
          name: 'Collagen Beauty Supplement',
          price: 39.99,
          rating: 4.4,
          image: 'https://picsum.photos/300/300?random=7',
          description: 'Daily collagen supplement for skin health',
          status: 'inactive',
          createdAt: '2023-12-28'
        },
        {
          id: '8',
          category: 'Makeup',
          name: 'Waterproof Mascara',
          price: 18.99,
          rating: 4.2,
          image: 'https://picsum.photos/300/300?random=8',
          description: 'Long-lasting waterproof mascara',
          status: 'active',
          createdAt: '2023-12-25'
        }
      ];
      
      this.applyFilters();
      this.isLoading = false;
    }, 1000);
  }

  // Search and filter
  onSearch(): void {
    this.currentPage = 1;
    this.applyFilters();
  }

  onCategoryChange(): void {
    this.currentPage = 1;
    this.applyFilters();
  }

  onStatusChange(): void {
    this.currentPage = 1;
    this.applyFilters();
  }

  private applyFilters(): void {
    let filtered = [...this.products];

    // Search filter
    if (this.searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (this.selectedCategory) {
      filtered = filtered.filter(product => product.category === this.selectedCategory);
    }

    // Status filter
    if (this.selectedStatus) {
      filtered = filtered.filter(product => product.status === this.selectedStatus);
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue: any = a[this.sortBy as keyof Product];
      let bValue: any = b[this.sortBy as keyof Product];

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (this.sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    this.filteredProducts = filtered;
    this.totalPages = Math.ceil(filtered.length / this.itemsPerPage);
  }

  // Sorting
  sort(column: string): void {
    if (this.sortBy === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = column;
      this.sortDirection = 'asc';
    }
    this.applyFilters();
  }

  // Pagination
  get paginatedProducts(): Product[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredProducts.slice(start, end);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  get pageNumbers(): number[] {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(this.totalPages, start + maxVisible - 1);
    
    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }

  // Actions
  editProduct(product: Product): void {
    this.router.navigate(['/edit-product', product.id]);
  }

  viewProduct(product: Product): void {
    this.router.navigate(['/product', product.id]);
  }

  deleteProduct(product: Product): void {
    if (confirm(`Are you sure you want to delete "${product.name}"?`)) {
      this.products = this.products.filter(p => p.id !== product.id);
      this.applyFilters();
    }
  }

  toggleStatus(product: Product): void {
    product.status = product.status === 'active' ? 'inactive' : 'active';
  }

  createNewProduct(): void {
    this.router.navigate(['/create-product']);
  }

  // Utilities
  getStarArray(rating: number): boolean[] {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= Math.floor(rating));
    }
    return stars;
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'active': return 'success';
      case 'inactive': return 'danger';
      case 'draft': return 'warning';
      default: return 'secondary';
    }
  }

  getCategoryIcon(category: string): string {
    const icons: { [key: string]: string } = {
      'Skincare': '🧴',
      'Makeup': '💄',
      'Fragrance': '🌸',
      'Hair Care': '💇‍♀️',
      'Beauty Tools': '🪞',
      'Wellness': '🧘‍♀️'
    };
    return icons[category] || '📦';
  }
}