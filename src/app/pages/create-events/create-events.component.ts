import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface EventFormData {
  name: string;
  description: string;
  flyer: File | null;
  date: string;
  time: string;
  venue: string;
  address: string;
  capacity: number;
  ticketPrice: number;
  category: string;
  tags: string[];
  isPublic: boolean;
  requiresRegistration: boolean;
}

@Component({
  selector: 'app-create-events',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-events.component.html',
  styleUrl: './create-events.component.scss'
})
export class CreateEventsComponent implements OnInit {
  eventForm!: FormGroup;
  isSubmitting = false;
  flyerPreview: string | null = null;
  selectedFile: File | null = null;
  
  // Form validation
  showErrors = false;
  
  // Categories for events
  eventCategories = [
    'Beauty Workshop',
    'Product Launch',
    'Masterclass',
    'Pop-up Store',
    'Beauty Contest',
    'Training Session',
    'Networking Event',
    'Other'
  ];

  // Available tags
  availableTags = [
    'Hair Care', 'Skincare', 'Makeup', 'Beauty Tips', 
    'Professional', 'Beginner Friendly', 'Advanced', 
    'Hands-on', 'Certificate', 'Free Samples'
  ];

  selectedTags: string[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.eventForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      date: ['', [Validators.required]],
      time: ['', [Validators.required]],
      venue: ['', [Validators.required, Validators.minLength(3)]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      capacity: ['', [Validators.required, Validators.min(1), Validators.max(10000)]],
      ticketPrice: ['', [Validators.required, Validators.min(0)]],
      category: ['', [Validators.required]],
      isPublic: [true],
      requiresRegistration: [true]
    });

    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    this.eventForm.get('date')?.setValue(today);
  }

  // File upload handling
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        alert('Please select a valid image file (JPEG, PNG, or GIF)');
        return;
      }

      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        alert('File size must be less than 5MB');
        return;
      }

      this.selectedFile = file;
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        this.flyerPreview = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  // Remove flyer
  removeFlyerImage(): void {
    this.selectedFile = null;
    this.flyerPreview = null;
    const fileInput = document.getElementById('flyer') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  // Tag management
  toggleTag(tag: string): void {
    const index = this.selectedTags.indexOf(tag);
    if (index > -1) {
      this.selectedTags.splice(index, 1);
    } else {
      if (this.selectedTags.length < 5) { // Limit to 5 tags
        this.selectedTags.push(tag);
      }
    }
  }

  isTagSelected(tag: string): boolean {
    return this.selectedTags.includes(tag);
  }

  // Form validation helpers
  isFieldInvalid(fieldName: string): boolean {
    const field = this.eventForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched || this.showErrors));
  }

  getFieldError(fieldName: string): string {
    const field = this.eventForm.get(fieldName);
    if (field && field.errors) {
      if (field.errors['required']) return `${fieldName} is required`;
      if (field.errors['minlength']) return `${fieldName} is too short`;
      if (field.errors['maxlength']) return `${fieldName} is too long`;
      if (field.errors['min']) return `${fieldName} must be greater than ${field.errors['min'].min}`;
      if (field.errors['max']) return `${fieldName} must be less than ${field.errors['max'].max}`;
    }
    return '';
  }

  // Form submission
  onSubmit(): void {
    if (this.eventForm.valid && this.selectedFile) {
      this.isSubmitting = true;
      
      const formData = {
        ...this.eventForm.value,
        flyer: this.selectedFile,
        tags: this.selectedTags,
        createdAt: new Date().toISOString()
      };

      console.log('Event Data:', formData);
      
      // Simulate API call
      setTimeout(() => {
        this.isSubmitting = false;
        alert('Event created successfully!');
        this.router.navigate(['/admin/events']);
      }, 2000);
      
    } else {
      this.showErrors = true;
      if (!this.selectedFile) {
        alert('Please upload an event flyer');
      }
    }
  }

  // Form actions
  onSaveDraft(): void {
    const formData = {
      ...this.eventForm.value,
      flyer: this.selectedFile,
      tags: this.selectedTags,
      status: 'draft',
      createdAt: new Date().toISOString()
    };

    console.log('Draft saved:', formData);
    alert('Draft saved successfully!');
  }

  onCancel(): void {
    if (confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
      this.router.navigate(['/admin/events']);
    }
  }

  onPreview(): void {
    console.log('Preview event:', {
      ...this.eventForm.value,
      flyer: this.flyerPreview,
      tags: this.selectedTags
    });
    // Open preview modal or navigate to preview page
  }
}