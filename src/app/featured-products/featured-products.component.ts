import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Product {
  id: number;
  name: string;
  image: string;
  price: string;
  originalPrice?: string;
  desc: string;
  rating?: number;
  reviewCount?: number;
  isNew?: boolean;
  onSale?: boolean;
  isFeatured?: boolean;
}

@Component({
  selector: 'app-featured-products',
  imports: [CommonModule],
  templateUrl: './featured-products.component.html',
  styleUrl: './featured-products.component.scss'
})
export class FeaturedProductsComponent {
  products: Product[] = [
    {
      id: 1,
      name: 'Premium Hair Serum',
      image: 'images/hair1.jpeg',
      price: '$49.99',
      originalPrice: '$69.99',
      desc: 'Nourishing serum for all hair types with natural ingredients',
      rating: 4.8,
      reviewCount: 124,
      isNew: true,
      onSale: true
    },
    {
      id: 2,
      name: 'Luxury Shampoo Set',
      image: 'images/hair2.webp',
      price: '$89.99',
      desc: 'Professional-grade shampoo and conditioner bundle',
      rating: 4.9,
      reviewCount: 89,
      isFeatured: true
    },
    {
      id: 3,
      name: 'Hair Growth Treatment',
      image: 'images/hair3.jpeg',
      price: '$79.99',
      originalPrice: '$99.99',
      desc: 'Advanced formula for stronger, healthier hair growth',
      rating: 4.7,
      reviewCount: 156,
      onSale: true
    }
  ];

  onAddToCart(product: Product) {
    console.log('Added to cart:', product);
    // Add your cart logic here
  }

  onViewProduct(product: Product) {
    console.log('View product:', product);
    // Add your navigation logic here
  }

  onQuickView(product: Product) {
    console.log('Quick view:', product);
    // Add your quick view modal logic here
  }

  onAddToWishlist(product: Product) {
    console.log('Added to wishlist:', product);
    // Add your wishlist logic here
  }

  onViewAll() {
    console.log('View all products');
    // Add your navigation logic here
  }
}