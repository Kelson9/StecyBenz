
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Subject, takeUntil, debounceTime, distinctUntilChanged } from 'rxjs';
import { trigger, transition, style, animate, stagger, query } from '@angular/animations';
import { HeaderComponent } from '../../header/header.component';
import { CartService } from '../../shared/cart.service';

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  description: string;
  category: string;
  categoryId: string;
  brandId: string;
  stock: number;
  isNew: boolean;
  onSale: boolean;
  isBestseller: boolean;
  isFavorite: boolean;
  discountPercentage?: number;
  createdAt: Date;
}

interface Category {
  id: string;
  name: string;
  count: number;
}

interface Brand {
  id: string;
  name: string;
  logo: string;
}

interface Filters {
  search: string;
  categories: string[];
  brands: string[];
  priceRange: { min: number | null; max: number | null };
  minRating: number;
  inStock: boolean;
  onSale: boolean;
  newArrivals: boolean;
}

@Component({
  standalone: true,
  selector: 'app-all-products',
  imports: [CommonModule, FormsModule, RouterModule,HeaderComponent],
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.scss',
  animations: [
    trigger('cardAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})


export class AllProductsComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  // Data
  products: Product[] = [];
  filteredProducts: Product[] = [];
  paginatedProducts: Product[] = [];
  categories: Category[] = [];
  brands: Brand[] = [];
  featuredItems: any[] = [];

  // Filters
  filters: Filters = {
    search: '',
    categories: [],
    brands: [],
    priceRange: { min: null, max: null },
    minRating: 0,
    inStock: false,
    onSale: false,
    newArrivals: false
  };

  // UI State
  filtersOpen = false;
  viewMode: 'grid' | 'list' = 'grid';
  sortBy = 'featured';
  isLoading = true;
  showQuickView = false;
  selectedProduct: Product | null = null;

  // Pagination
  currentPage = 1;
  itemsPerPage = 12;
  totalPages = 1;

  // Rating options
  ratingOptions = [
    { value: 4, label: '4+ Stars' },
    { value: 3, label: '3+ Stars' },
    { value: 2, label: '2+ Stars' },
    { value: 1, label: '1+ Stars' }
  ];

  constructor(private cartService: CartService) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (event.target.innerWidth > 768 && this.filtersOpen) {
      this.filtersOpen = false;
    }
  }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadData(): void {
    this.isLoading = true;
    
    // Simulate API loading
    setTimeout(() => {
      this.products = this.generateMockProducts();
      this.categories = this.generateCategories();
      this.brands = this.generateBrands();
      this.featuredItems = this.products.slice(0, 6);
      
      this.applyFilters();
      this.isLoading = false;
    }, 1500);
  }

  private generateMockProducts(): Product[] {
    const categories = ['skincare', 'makeup', 'haircare', 'fragrance', 'bodycare', 'tools'];
    const brands = ['Luxe Beauty', 'Glow Co.', 'Pure Essence', 'Radiant Skin', 'Beauty Bar', 'Stellar Cosmetics'];
    const productNames = [
      'Hydrating Vitamin C Serum', 'Matte Liquid Lipstick', 'Nourishing Hair Oil', 'Floral Eau de Parfum',
      'Exfoliating Body Scrub', 'Professional Makeup Brush Set', 'Anti-Aging Night Cream', 'Color Correcting Primer',
      'Volumizing Mascara', 'Brightening Face Mask', 'Heat Protection Spray', 'Refreshing Micellar Water',
      'Contouring Palette', 'Moisturizing Shampoo', 'Long-Lasting Foundation', 'Lip Scrub Treatment',
      'Eye Cream with Retinol', 'Waterproof Eyeliner', 'Deep Conditioning Mask', 'Setting Spray',
      'Illuminating Highlighter', 'Gentle Cleanser', 'Hair Growth Serum', 'Tinted Moisturizer',
      'Brow Gel', 'Face Toner', 'Leave-in Conditioner', 'Bronzing Powder',
      'Nail Polish Collection', 'Facial Oil Blend', 'Curl Enhancing Cream', 'Blush Palette'
    ];

    return Array.from({ length: 48 }, (_, index) => {
      const categoryId = categories[index % categories.length];
      const brandId = brands[index % brands.length];
      const basePrice = Math.random() * 100 + 15;
      const isOnSale = Math.random() > 0.7;
      const originalPrice = isOnSale ? basePrice + (Math.random() * 50) : undefined;

      return {
        id: `product-${index + 1}`,
        name: productNames[index] || `Beauty Product ${index + 1}`,
        brand: brandId,
        price: 2000,
        originalPrice: 5000,
        image: `https://picsum.photos/400/500?random=${index + 1}`,
        rating: Math.round((Math.random() * 2 + 3) * 10) / 10,
        reviewCount: Math.floor(Math.random() * 500) + 10,
        description: `Premium beauty product crafted with the finest ingredients to enhance your natural beauty and provide long-lasting results.`,
        category: categoryId.charAt(0).toUpperCase() + categoryId.slice(1),
        categoryId,
        brandId,
        stock: Math.floor(Math.random() * 100),
        isNew: Math.random() > 0.8,
        onSale: isOnSale,
        isBestseller: Math.random() > 0.85,
        isFavorite: Math.random() > 0.9,
        discountPercentage: isOnSale && originalPrice ? Math.round(((originalPrice - basePrice) / originalPrice) * 100) : undefined,
        createdAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000)
      };
    });
  }

  private generateCategories(): Category[] {
    const categoryNames = ['Skincare', 'Makeup', 'Haircare', 'Fragrance', 'Bodycare', 'Tools'];
    return categoryNames.map(name => ({
      id: name.toLowerCase(),
      name,
      count: this.products.filter(p => p.categoryId === name.toLowerCase()).length
    }));
  }

  private generateBrands(): Brand[] {
    const brandNames = ['Luxe Beauty', 'Glow Co.', 'Pure Essence', 'Radiant Skin', 'Beauty Bar', 'Stellar Cosmetics'];
    return brandNames.map(name => ({
      id: name,
      name,
      logo: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=f8f9fa&color=6c757d&size=32`
    }));
  }

  // Filter Methods
  applyFilters(): void {
    let filtered = [...this.products];

    // Search filter
    if (this.filters.search.trim()) {
      const searchTerm = this.filters.search.toLowerCase().trim();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.brand.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
      );
    }

    // Category filter
    if (this.filters.categories.length > 0) {
      filtered = filtered.filter(product =>
        this.filters.categories.includes(product.categoryId)
      );
    }

    // Brand filter
    if (this.filters.brands.length > 0) {
      filtered = filtered.filter(product =>
        this.filters.brands.includes(product.brandId)
      );
    }

    // Price range filter
    if (this.filters.priceRange.min !== null || this.filters.priceRange.max !== null) {
      filtered = filtered.filter(product => {
        const price = product.price;
        const minMatch = this.filters.priceRange.min === null || price >= this.filters.priceRange.min;
        const maxMatch = this.filters.priceRange.max === null || price <= this.filters.priceRange.max;
        return minMatch && maxMatch;
      });
    }

    // Rating filter
    if (this.filters.minRating > 0) {
      filtered = filtered.filter(product => product.rating >= this.filters.minRating);
    }

    // Availability filters
    if (this.filters.inStock) {
      filtered = filtered.filter(product => product.stock > 0);
    }

    if (this.filters.onSale) {
      filtered = filtered.filter(product => product.onSale);
    }

    if (this.filters.newArrivals) {
      filtered = filtered.filter(product => product.isNew);
    }

    this.filteredProducts = filtered;
    this.applySorting();
    this.updatePagination();
  }

  applySorting(): void {
    this.filteredProducts.sort((a, b) => {
      switch (this.sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        default: // featured
          return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
      }
    });

    this.updatePaginatedProducts();
  }

  private updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    this.currentPage = Math.min(this.currentPage, this.totalPages || 1);
    this.updatePaginatedProducts();
  }

  private updatePaginatedProducts(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedProducts = this.filteredProducts.slice(startIndex, endIndex);
  }

  // Category Methods
  onCategoryChange(categoryId: string, event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.checked) {
      this.filters.categories.push(categoryId);
    } else {
      this.filters.categories = this.filters.categories.filter(id => id !== categoryId);
    }
    this.applyFilters();
  }

  // Brand Methods
  toggleBrand(brandId: string): void {
    const index = this.filters.brands.indexOf(brandId);
    if (index > -1) {
      this.filters.brands.splice(index, 1);
    } else {
      this.filters.brands.push(brandId);
    }
    this.applyFilters();
  }

  // Rating Methods
  setMinRating(rating: number): void {
    this.filters.minRating = this.filters.minRating === rating ? 0 : rating;
    this.applyFilters();
  }

  // Filter Management
  clearFilters(): void {
    this.filters = {
      search: '',
      categories: [],
      brands: [],
      priceRange: { min: null, max: null },
      minRating: 0,
      inStock: false,
      onSale: false,
      newArrivals: false
    };
    this.currentPage = 1;
    this.applyFilters();
  }

  hasActiveFilters(): boolean {
    return this.filters.search !== '' ||
           this.filters.categories.length > 0 ||
           this.filters.brands.length > 0 ||
           this.filters.priceRange.min !== null ||
           this.filters.priceRange.max !== null ||
           this.filters.minRating > 0 ||
           this.filters.inStock ||
           this.filters.onSale ||
           this.filters.newArrivals;
  }

  getSelectedCategories(): Category[] {
    return this.categories.filter(cat => this.filters.categories.includes(cat.id));
  }

  getSelectedBrands(): Brand[] {
    return this.brands.filter(brand => this.filters.brands.includes(brand.id));
  }

  removeCategory(categoryId: string): void {
    this.filters.categories = this.filters.categories.filter(id => id !== categoryId);
    this.applyFilters();
  }

  removeBrand(brandId: string): void {
    this.filters.brands = this.filters.brands.filter(id => id !== brandId);
    this.applyFilters();
  }

  clearPriceRange(): void {
    this.filters.priceRange = { min: null, max: null };
    this.applyFilters();
  }

  // UI Methods
  toggleFilters(): void {
    this.filtersOpen = !this.filtersOpen;
  }

  setViewMode(mode: 'grid' | 'list'): void {
    this.viewMode = mode;
  }

  // Pagination Methods
  goToPage(page: number | string): void {
    if (typeof page === 'number' && page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedProducts();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedProducts();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedProducts();
    }
  }

  getPageNumbers(): (number | string)[] {
    const pages: (number | string)[] = [];
    const totalPages = this.totalPages;
    const currentPage = this.currentPage;

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      
      if (currentPage > 4) {
        pages.push('...');
      }
      
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (currentPage < totalPages - 3) {
        pages.push('...');
      }
      
      pages.push(totalPages);
    }

    return pages;
  }

  // Product Actions
  quickView(product: Product): void {
    this.selectedProduct = product;
    this.showQuickView = true;
  }

  closeQuickView(): void {
    this.showQuickView = false;
    this.selectedProduct = null;
  }

  toggleWishlist(product: Product): void {
    product.isFavorite = !product.isFavorite;
    // Here you would typically make an API call
    console.log(`${product.name} ${product.isFavorite ? 'added to' : 'removed from'} wishlist`);
  }

  addToCart(product: Product): void {
        this.cartService.addToCart(product);      
    }

  // Utility Methods
  trackProduct(index: number, product: Product): string {
    return product.id;
  }

  onImageLoad(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.classList.add('loaded');
  }
}