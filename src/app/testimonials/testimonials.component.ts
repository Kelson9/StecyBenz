import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Testimonial {
  id: number;
  name: string;
  position: string;
  location?: string;
  message: string;
  photo: string;
  date: string;
  service?: string;
  verified: boolean;
}

@Component({
  selector: 'app-testimonials',
  imports: [CommonModule],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.scss'
})
export class TestimonialsComponent {
  featuredIndex = 0;

  testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Sarah Johnson',
      position: 'Marketing Director',
      location: 'New York, NY',
      message: 'Stecy Benz completely transformed my hair! The consultation was thorough and the products recommended were perfect for my hair type. I\'ve never felt more confident about my hair.',
      photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b131?w=400&h=400&fit=crop&crop=face',
      date: '2 weeks ago',
      service: 'Hair Consultation',
      verified: true
    },
    {
      id: 2,
      name: 'Maria Rodriguez',
      position: 'Fashion Designer',
      location: 'Los Angeles, CA',
      message: 'The community support is incredible! I love sharing my hair journey and getting tips from other members. The products are top-notch and delivery is always fast.',
      photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
      date: '1 month ago',
      service: 'Premium Package',
      verified: true
    },
    {
      id: 3,
      name: 'Jennifer Chen',
      position: 'Software Engineer',
      location: 'San Francisco, CA',
      message: 'As someone with curly hair, finding the right products was always a struggle. Stecy Benz\'s expert advice and premium products have been a game-changer for me.',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      date: '3 weeks ago',
      service: 'Curly Hair Care',
      verified: true
    },
    {
      id: 4,
      name: 'Amanda Williams',
      position: 'Teacher',
      location: 'Chicago, IL',
      message: 'The customer service is exceptional! They really care about your hair journey and provide ongoing support. My hair has never looked healthier or more vibrant.',
      photo: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop&crop=face',
      date: '1 week ago',
      service: 'Hair Restoration',
      verified: true
    },
    {
      id: 5,
      name: 'Rachel Thompson',
      position: 'Entrepreneur',
      location: 'Miami, FL',
      message: 'I\'ve tried many hair care brands, but none compare to Stecy Benz. The quality is outstanding and the results speak for themselves. Highly recommend!',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face',
      date: '2 months ago',
      service: 'Complete Hair Makeover',
      verified: true
    },
    {
      id: 6,
      name: 'Lisa Davis',
      position: 'Nurse',
      location: 'Seattle, WA',
      message: 'The free consultation was so helpful! The expert really understood my hair concerns and created a perfect routine for me. My hair feels amazing now.',
      photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face',
      date: '3 days ago',
      service: 'Free Consultation',
      verified: true
    }
  ];

  onTestimonialHover(index: number) {
    console.log(`Testimonial ${index} hovered`);
  }

  onTestimonialLeave(index: number) {
    console.log(`Testimonial ${index} left`);
  }

  onTestimonialClick(index: number) {
    this.featuredIndex = index;
    console.log(`Testimonial ${index} clicked - now featured`);
  }

  onStartJourney() {
    console.log('Start journey clicked');
    // Add navigation to products or consultation booking
  }

  onViewAllReviews() {
    console.log('View all reviews clicked');
    // Add navigation to reviews page or expand testimonials
  }
}