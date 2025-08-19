import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { HeaderComponent } from "../../header/header.component";

interface Collection {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  productCount: number;
  priceRange: { min: number; max: number };
  previewProducts: Array<{ id: string; name: string; image: string }>;
  category: string;
  featured: boolean;
}

@Component({
  selector: 'app-collections',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent],
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss'],
  animations: [
    trigger('cardAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class CollectionsComponent implements OnInit {
  collections: Collection[] = [];
  isLoading = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadCollections();
  }

  private loadCollections(): void {
    this.isLoading = true;
    
    // Simulate API call
    setTimeout(() => {
      this.collections = this.generateMockCollections();
      this.isLoading = false;
    }, 1200);
  }

  private generateMockCollections(): Collection[] {
    return [
      {
        id: 'skincare-essentials',
        name: 'Skincare Essentials',
        subtitle: 'Your daily glow routine',
        description: 'Everything you need for healthy, radiant skin',
        image: 'https://picsum.photos/600/400?random=1',
        productCount: 12,
        priceRange: { min: 15, max: 85 },
        previewProducts: [
          { id: '1', name: 'Vitamin C Serum', image: 'https://picsum.photos/100/100?random=11' },
          { id: '2', name: 'Moisturizer', image: 'https://picsum.photos/100/100?random=12' },
          { id: '3', name: 'Cleanser', image: 'https://picsum.photos/100/100?random=13' }
        ],
        category: 'skincare',
        featured: true
      },
      {
        id: 'makeup-must-haves',
        name: 'Makeup Must-Haves',
        subtitle: 'Effortless beauty essentials',
        description: 'Create stunning looks with these versatile favorites',
        image: 'https://picsum.photos/600/400?random=2',
        productCount: 18,
        priceRange: { min: 12, max: 65 },
        previewProducts: [
          { id: '4', name: 'Foundation', image: 'https://picsum.photos/100/100?random=14' },
          { id: '5', name: 'Mascara', image: 'https://picsum.photos/100/100?random=15' },
          { id: '6', name: 'Lipstick', image: 'https://picsum.photos/100/100?random=16' }
        ],
        category: 'makeup',
        featured: true
      },
      // Add more collections...
    ];
  }

  viewCollection(collection: Collection): void {
    this.router.navigate(['/collections', collection.id]);
  }

  trackCollection(index: number, collection: Collection): string {
    return collection.id;
  }

  onImageLoad(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.classList.add('loaded');
  }
}