import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { HeroComponent } from './hero/hero.component';
import { FeaturesComponent } from './features/features.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { FooterComponent } from './footer/footer.component';
import { FeaturedProductsComponent } from './featured-products/featured-products.component';
import { TrendyCollectionComponent } from './trendy-collection/trendy-collection.component';
import { CommunityConsultancyComponent } from './community-consultancy/community-consultancy.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule,
    HeaderComponent,
    HeroComponent,
    FeaturesComponent,
    TestimonialsComponent,
    FeaturedProductsComponent,
    TrendyCollectionComponent,
    CommunityConsultancyComponent,
    FooterComponent,
    FormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'stecy-benz';
   isHomeRoute = false;

constructor(private router: Router) {
  this.router.events.subscribe(() => {
    this.isHomeRoute = this.router.url.startsWith('/home');
  });
}
}
