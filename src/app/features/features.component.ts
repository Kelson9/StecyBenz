import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Feature {
  id: number;
  title: string;
  description: string;
  iconSvg: string;
  stats?: { value: string; label: string }[];
}

@Component({
  selector: 'app-features',
  imports: [CommonModule],
  templateUrl: './features.component.html',
  styleUrl: './features.component.scss'
})
export class FeaturesComponent {
  features: Feature[] = [
    {
      id: 1,
      title: 'Premium Quality Products',
      description: 'Hand-selected premium hair care products sourced from the finest ingredients worldwide. Each product undergoes rigorous quality testing to ensure exceptional results.',
      iconSvg: '<path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 22L10.91 9.74L2 9L10.91 8.26L12 2Z" stroke="currentColor" stroke-width="2" fill="currentColor"/>',
      stats: [
        { value: '100%', label: 'Natural' },
        { value: '5★', label: 'Rated' }
      ]
    },
    {
      id: 2,
      title: 'Expert Consultation',
      description: 'Get personalized hair care advice from our certified stylists and trichologists. We analyze your hair type and lifestyle to recommend the perfect products.',
      iconSvg: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2" fill="none"/>',
      stats: [
        { value: '10+', label: 'Years Exp' },
        { value: '1K+', label: 'Clients' }
      ]
    },
    {
      id: 3,
      title: 'Fast & Secure Delivery',
      description: 'Experience lightning-fast delivery with our premium shipping partners. All orders are securely packaged and tracked from warehouse to your doorstep.',
      iconSvg: '<path d="M1 3h16l-1 10H4L1 3zM1 3l-1 1" stroke="currentColor" stroke-width="2" fill="none"/><path d="M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6.01" stroke="currentColor" stroke-width="2" fill="none"/>',
      stats: [
        { value: '24H', label: 'Delivery' },
        { value: '100%', label: 'Secure' }
      ]
    },
    {
      id: 4,
      title: 'Money-Back Guarantee',
      description: 'Shop with confidence knowing that every purchase is backed by our 30-day satisfaction guarantee. Not happy? Get your money back, no questions asked.',
      iconSvg: '<path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="2" fill="none"/><path d="M3 12a9 9 0 1 0 18 0 9 9 0 1 0-18 0" stroke="currentColor" stroke-width="2" fill="none"/>',
      stats: [
        { value: '30', label: 'Days' },
        { value: '100%', label: 'Refund' }
      ]
    },
    {
      id: 5,
      title: '24/7 Customer Support',
      description: 'Our dedicated support team is available round the clock to assist you with any questions, concerns, or product recommendations you might need.',
      iconSvg: '<path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="currentColor" stroke-width="2" fill="none"/>',
      stats: [
        { value: '24/7', label: 'Available' },
        { value: '<1min', label: 'Response' }
      ]
    },
    {
      id: 6,
      title: 'Loyalty Rewards Program',
      description: 'Earn points with every purchase and unlock exclusive rewards, discounts, and early access to new products. The more you shop, the more you save.',
      iconSvg: '<path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" stroke="currentColor" stroke-width="2" fill="none"/><line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" stroke-width="2"/><path d="m16 10-4 4-4-4" stroke="currentColor" stroke-width="2" fill="none"/>',
      stats: [
        { value: '5%', label: 'Cashback' },
        { value: 'VIP', label: 'Access' }
      ]
    }
  ];

  onFeatureHover(index: number) {
    console.log('Feature hovered:', index);
  }

  onFeatureLeave(index: number) {
    console.log('Feature left:', index);
  }

  onLearnMore(feature: Feature) {
    console.log('Learn more about:', feature.title);
    // Add navigation or modal logic here
  }

  onGetStarted() {
    console.log('Get started clicked');
    // Add navigation to products or signup
  }

  onContactUs() {
    console.log('Contact us clicked');
    // Add navigation to contact page
  }
}