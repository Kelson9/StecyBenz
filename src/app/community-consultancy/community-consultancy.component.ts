import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

interface Particle {
  x: number;
  y: number;
  delay: number;
}

@Component({
  selector: 'app-community-consultancy',
  imports: [CommonModule],
  templateUrl: './community-consultancy.component.html',
  styleUrl: './community-consultancy.component.scss'
})
export class CommunityConsultancyComponent implements OnInit {
  particles: Particle[] = [];

  ngOnInit() {
    this.generateParticles();
  }

  generateParticles() {
    for (let i = 0; i < 15; i++) {
      this.particles.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 8
      });
    }
  }

  onCardHover(cardType: string) {
    console.log(`${cardType} card hovered`);
  }

  onCardLeave(cardType: string) {
    console.log(`${cardType} card left`);
  }

  onJoinCommunity() {
    console.log('Join community clicked');
    // Add navigation to community page or signup modal
  }

  onBookConsultation() {
    console.log('Book consultation clicked');
    // Add navigation to booking page or calendar modal
  }

  onGetStarted() {
    console.log('Get started clicked');
    // Add navigation to onboarding flow
  }

  onLearnMore() {
    console.log('Learn more clicked');
    // Add navigation to about page or info modal
  }
}