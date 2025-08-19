import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface EventStats {
  totalEvents: number;
  activeEvents: number;
  totalAttendees: number;
  totalRevenue: number;
  averageRating: number;
  responseRate: number;
}

interface Attendee {
  id: string;
  name: string;
  email: string;
  phone: string;
  registrationDate: string;
  status: 'registered' | 'attended' | 'no-show' | 'cancelled';
  paymentStatus: 'paid' | 'pending' | 'refunded';
  ticketType: string;
  feedbackSubmitted: boolean;
  rating?: number;
  feedback?: string;
}

interface Event {
  id: string;
  name: string;
  date: string;
  time: string;
  venue: string;
  capacity: number;
  registered: number;
  attended: number;
  revenue: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  category: string;
  ticketPrice: number;
  attendees: Attendee[];
  averageRating: number;
  totalFeedback: number;
}

interface ResponseData {
  eventId: string;
  eventName: string;
  totalResponses: number;
  averageRating: number;
  satisfactionRate: number;
  recommendations: number;
}

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent implements OnInit {
  Math = Math;

  // Data
  stats: EventStats = {
    totalEvents: 45,
    activeEvents: 12,
    totalAttendees: 2847,
    totalRevenue: 85420,
    averageRating: 4.7,
    responseRate: 78.5
  };

  events: Event[] = [
    {
      id: '1',
      name: 'Summer Hair Care Workshop',
      date: '2025-08-20',
      time: '14:00',
      venue: 'StecyBenz Studio',
      capacity: 50,
      registered: 48,
      attended: 42,
      revenue: 2400,
      status: 'completed',
      category: 'Workshop',
      ticketPrice: 50,
      averageRating: 4.8,
      totalFeedback: 38,
      attendees: [
        {
          id: '1',
          name: 'Sarah Johnson',
          email: 'sarah.j@email.com',
          phone: '+1 (555) 123-4567',
          registrationDate: '2025-08-15',
          status: 'attended',
          paymentStatus: 'paid',
          ticketType: 'Regular',
          feedbackSubmitted: true,
          rating: 5,
          feedback: 'Amazing workshop! Learned so much about hair care.'
        },
        {
          id: '2',
          name: 'Michael Chen',
          email: 'michael.chen@email.com',
          phone: '+1 (555) 234-5678',
          registrationDate: '2025-08-14',
          status: 'attended',
          paymentStatus: 'paid',
          ticketType: 'VIP',
          feedbackSubmitted: true,
          rating: 4,
          feedback: 'Great event, very informative!'
        }
      ]
    },
    {
      id: '2',
      name: 'Professional Makeup Masterclass',
      date: '2025-08-25',
      time: '10:00',
      venue: 'Beauty Academy',
      capacity: 30,
      registered: 28,
      attended: 0,
      revenue: 2800,
      status: 'upcoming',
      category: 'Masterclass',
      ticketPrice: 100,
      averageRating: 0,
      totalFeedback: 0,
      attendees: []
    },
    {
      id: '3',
      name: 'Skincare Essentials Seminar',
      date: '2025-08-18',
      time: '16:00',
      venue: 'Conference Center',
      capacity: 100,
      registered: 95,
      attended: 87,
      revenue: 2850,
      status: 'completed',
      category: 'Seminar',
      ticketPrice: 30,
      averageRating: 4.6,
      totalFeedback: 72,
      attendees: []
    }
  ];

  // Filters and View State
  selectedTimeRange = '30';
  selectedStatus = '';
  selectedCategory = '';
  searchTerm = '';
  currentView = 'overview'; // overview, events, attendees, responses
  selectedEvent: Event | null = null;

  // Pagination
  currentPage = 1;
  itemsPerPage = 10;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadEventData();
  }

  loadEventData(): void {
    // Simulate API call
    console.log('Loading event data...');
  }

  // View Management
  setView(view: string): void {
    this.currentView = view;
    this.selectedEvent = null;
  }

  selectEvent(event: Event): void {
    this.selectedEvent = event;
    this.currentView = 'event-details';
  }

  // Filtering
  get filteredEvents(): Event[] {
    let filtered = [...this.events];

    if (this.searchTerm) {
      filtered = filtered.filter(event =>
        event.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        event.venue.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    if (this.selectedStatus) {
      filtered = filtered.filter(event => event.status === this.selectedStatus);
    }

    if (this.selectedCategory) {
      filtered = filtered.filter(event => event.category === this.selectedCategory);
    }

    return filtered;
  }

  get paginatedEvents(): Event[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredEvents.slice(start, start + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredEvents.length / this.itemsPerPage);
  }

  // Utility Methods
  getStatusBadgeClass(status: string): string {
    const classes = {
      'upcoming': 'badge-info',
      'ongoing': 'badge-warning',
      'completed': 'badge-success',
      'cancelled': 'badge-danger'
    };
    return classes[status as keyof typeof classes] || 'badge-secondary';
  }

  getAttendeeStatusClass(status: string): string {
    const classes = {
      'registered': 'status-info',
      'attended': 'status-success',
      'no-show': 'status-warning',
      'cancelled': 'status-danger'
    };
    return classes[status as keyof typeof classes] || 'status-secondary';
  }

  getPaymentStatusClass(status: string): string {
    const classes = {
      'paid': 'status-success',
      'pending': 'status-warning',
      'refunded': 'status-danger'
    };
    return classes[status as keyof typeof classes] || 'status-secondary';
  }

  getStars(rating: number): boolean[] {
    return Array(5).fill(false).map((_, i) => i < Math.floor(rating));
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  formatTime(timeString: string): string {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  }

  // Actions
  onCreateEvent(): void {
    this.router.navigate(['/dashboard/events/create']);
  }

  onEditEvent(event: Event): void {
    this.router.navigate(['/admin/edit-event', event.id]);
  }

  onViewEvent(event: Event): void {
    this.selectEvent(event);
  }

  onExportData(): void {
    console.log('Exporting event data...');
    // Implement export functionality
  }

  onSendReminder(attendee: Attendee): void {
    console.log('Sending reminder to:', attendee.email);
    // Implement reminder functionality
  }

  onMarkAttended(attendee: Attendee): void {
    attendee.status = 'attended';
    console.log('Marked as attended:', attendee.name);
  }

  onRefundTicket(attendee: Attendee): void {
    attendee.paymentStatus = 'refunded';
    attendee.status = 'cancelled';
    console.log('Refunded ticket for:', attendee.name);
  }

  // Pagination
  goToPage(page: number): void {
    this.currentPage = page;
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  // Analytics
  getAttendanceRate(event: Event): number {
    return event.registered > 0 ? (event.attended / event.registered) * 100 : 0;
  }

  getCapacityUtilization(event: Event): number {
    return (event.registered / event.capacity) * 100;
  }

  getRevenuePerAttendee(event: Event): number {
    return event.attended > 0 ? event.revenue / event.attended : 0;
  }
}