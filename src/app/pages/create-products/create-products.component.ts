import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';

interface Category {
  id: string;
  name: string;
  icon: string;
}

interface ProductImage {
  id: string;
  url: string;
  file?: File;
  isMain?: boolean;
}

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './create-products.component.html',
  styleUrls: ['./create-products.component.scss'],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class CreateProductsComponent implements OnInit {
  productForm!: FormGroup;
  isSubmitting = false;
  isDragOver = false;
  
  // Data
  categories: Category[] = [];
  productImages: ProductImage[] = [];
  maxImages = 8;
  maxFileSize = 5 * 1024 * 1024; // 5MB

  // Preview states
  previewMode = false;
  currentImageIndex = 0;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  private initializeForm(): void {
    this.productForm = this.fb.group({
      category: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      price: ['', [Validators.required, Validators.min(0.01)]],
      rating: [0, [Validators.min(0), Validators.max(5)]]
    });
  }

  private loadCategories(): void {
    this.categories = [
      { id: 'skincare', name: 'Skincare', icon: '🧴' },
      { id: 'makeup', name: 'Makeup', icon: '💄' },
      { id: 'fragrance', name: 'Fragrance', icon: '🌸' },
      { id: 'haircare', name: 'Hair Care', icon: '💇‍♀️' },
      { id: 'tools', name: 'Beauty Tools', icon: '🪞' },
      { id: 'wellness', name: 'Wellness', icon: '🧘‍♀️' }
    ];
  }

  // Image handling
  onFileSelect(event: any): void {
    const files = Array.from(event.target.files) as File[];
    this.processFiles(files);
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
    
    const files = Array.from(event.dataTransfer?.files || []) as File[];
    this.processFiles(files);
  }

  private processFiles(files: File[]): void {
    files.forEach(file => {
      if (this.productImages.length >= this.maxImages) {
        alert(`Maximum ${this.maxImages} images allowed`);
        return;
      }

      if (!file.type.startsWith('image/')) {
        alert('Please select only image files');
        return;
      }

      if (file.size > this.maxFileSize) {
        alert('File size must be less than 5MB');
        return;
      }

      this.addImage(file);
    });
  }

  private addImage(file: File): void {
    const reader = new FileReader();
    reader.onload = (e) => {
      const image: ProductImage = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        url: e.target?.result as string,
        file: file,
        isMain: this.productImages.length === 0
      };
      this.productImages.push(image);
    };
    reader.readAsDataURL(file);
  }

  removeImage(index: number): void {
    const removedImage = this.productImages[index];
    this.productImages.splice(index, 1);
    
    // If removed image was main, set first image as main
    if (removedImage.isMain && this.productImages.length > 0) {
      this.productImages[0].isMain = true;
    }
  }

  setMainImage(index: number): void {
    this.productImages.forEach((img, i) => {
      img.isMain = i === index;
    });
  }

  // Image preview
  openImagePreview(index: number): void {
    this.currentImageIndex = index;
    this.previewMode = true;
  }

  closeImagePreview(): void {
    this.previewMode = false;
  }

  nextImage(): void {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.productImages.length;
  }

  previousImage(): void {
    this.currentImageIndex = this.currentImageIndex === 0 
      ? this.productImages.length - 1 
      : this.currentImageIndex - 1;
  }

  // Rating
  setRating(rating: number): void {
    this.productForm.patchValue({ rating });
  }

  // Form submission
  async onSubmit(): Promise<void> {
    if (this.productForm.valid && this.productImages.length > 0) {
      this.isSubmitting = true;

      try {
        // Simulate API call
        await this.createProduct();
        
        // Show success message
        alert('Product created successfully!');
        
        // Reset form or navigate
        this.resetForm();
        // this.router.navigate(['/products']);
        
      } catch (error) {
        console.error('Error creating product:', error);
        alert('Failed to create product. Please try again.');
      } finally {
        this.isSubmitting = false;
      }
    } else {
      this.markFormGroupTouched();
      if (this.productImages.length === 0) {
        alert('Please add at least one product image');
      }
    }
  }

  private async createProduct(): Promise<void> {
    const formData = this.productForm.value;
    const productData = {
      ...formData,
      images: this.productImages.map(img => ({
        url: img.url,
        isMain: img.isMain
      })),
      createdAt: new Date().toISOString()
    };

    console.log('Creating product:', productData);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  public resetForm(): void {
    this.productForm.reset();
    this.productImages = [];
    this.productForm.patchValue({ rating: 0 });
  }

  private markFormGroupTouched(): void {
    Object.keys(this.productForm.controls).forEach(key => {
      const control = this.productForm.get(key);
      control?.markAsTouched();
    });
  }

  // Utility methods
  getFormValue(field: string): any {
    return this.productForm.get(field)?.value || '';
  }

  hasError(field: string): boolean {
    const control = this.productForm.get(field);
    return !!(control?.errors && control?.touched);
  }

  getError(field: string): string {
    const control = this.productForm.get(field);
    if (control?.errors && control?.touched) {
      if (control.errors['required']) return `${field} is required`;
      if (control.errors['minlength']) return `${field} is too short`;
      if (control.errors['maxlength']) return `${field} is too long`;
      if (control.errors['min']) return `${field} must be greater than 0`;
      if (control.errors['max']) return `${field} cannot exceed maximum value`;
    }
    return '';
  }

  getCategoryIcon(categoryId: string): string {
    return this.categories.find(c => c.id === categoryId)?.icon || '📦';
  }
}