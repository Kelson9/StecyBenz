import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';

interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
}

@Component({
  selector: 'app-products',
  imports: [
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
   ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

products: Product[] = [];

  ngOnInit(): void {
    // Sample data - replace with real data fetch
    this.products = [
      { id: 1, name: 'Elegant Chair', price: 120, description: 'Comfortable and stylish.' },
      { id: 2, name: 'Wooden Table', price: 340, description: 'Solid wood craftsmanship.' },
      { id: 3, name: 'Modern Sofa', price: 560, description: 'Perfect for any living room.' }
    ];
  }

  onCreate() {
    // Logic to create a product
    alert('Create product clicked!');
  }

  onEdit(product: Product) {
    // Logic to edit a product
    alert(`Edit product: ${product.name}`);
  }

  onDelete(product: Product) {
    // Logic to delete a product
    const confirmed = confirm(`Are you sure you want to delete "${product.name}"?`);
    if (confirmed) {
      this.products = this.products.filter(p => p.id !== product.id);
    }
  }
}