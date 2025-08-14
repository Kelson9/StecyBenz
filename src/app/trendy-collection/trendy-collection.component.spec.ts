import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendyCollectionComponent } from './trendy-collection.component';

describe('TrendyCollectionComponent', () => {
  let component: TrendyCollectionComponent;
  let fixture: ComponentFixture<TrendyCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrendyCollectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrendyCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
