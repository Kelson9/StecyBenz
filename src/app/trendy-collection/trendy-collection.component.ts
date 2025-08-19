import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Collection {
  id: number;
  name: string;
  image: string;
  desc: string;
  itemCount?: number;
  rating?: number;
  priceRange?: string;
  isNew?: boolean;
  isTrending?: boolean;
  features?: { icon: string; text: string }[];
}

@Component({
  selector: 'app-trendy-collection',
  imports: [CommonModule],
  templateUrl: './trendy-collection.component.html',
  styleUrl: './trendy-collection.component.scss'
})
export class TrendyCollectionComponent {
  constructor(private router: Router) {}

  collections: Collection[] = [
    {
      id: 1,
      name: 'Luxury Hair Care',
      image: 'images/hair1.jpeg',
      desc: 'Premium collection featuring the finest hair care products with natural ingredients and advanced formulas.',
      itemCount: 25,
      rating: 4.9,
      priceRange: '$29.99',
      isNew: true,
      features: [
        { icon: '🌿', text: 'Natural' },
        { icon: '✨', text: 'Premium' },
        { icon: '🏆', text: 'Award Winning' }
      ]
    },
    {
      id: 2,
      name: 'Professional Styling',
      image: 'images/hair2.webp',
      desc: 'Salon-grade styling products designed by professionals for exceptional results and long-lasting hold.',
      itemCount: 18,
      rating: 4.8,
      priceRange: '$34.99',
      isTrending: true,
      features: [
        { icon: '💇‍♀️', text: 'Salon Grade' },
        { icon: '⏰', text: 'Long Lasting' },
        { icon: '🎯', text: 'Precision' }
      ]
    },
    {
      id: 3,
      name: 'Hair Growth Essentials',
      image: 'images/hair3.jpeg',
      desc: 'Scientifically formulated products to promote healthy hair growth and strengthen your hair from roots to tips.',
      itemCount: 12,
      rating: 4.7,
      priceRange: '$42.99',
      isNew: true,
      isTrending: true,
      features: [
        { icon: '🧬', text: 'Scientific' },
        { icon: '💪', text: 'Strengthening' },
        { icon: '📈', text: 'Growth Boost' }
      ]
    }
  ];

  onCardHover(index: number) {
    console.log('Card hovered:', index);
    // Add any hover logic here
  }

  onCardLeave(index: number) {
    console.log('Card left:', index);
    // Add any leave logic here
  }

  onExploreCollection(collection: Collection) {
    console.log('Exploring collection:', collection);
    // Add navigation logic here
  }

  onShopNow(collection: Collection) {
    console.log('Shopping collection:', collection);
    // Add cart/shopping logic here
  }

  onViewDetails(collection: Collection) {
    console.log('View collection details:', collection);
    // Add details view logic here
  }

  onViewAllCollections() {
    console.log('View all collections');
    this.router.navigate(['/collections']);
    // Add navigation to all collections page
  }
}