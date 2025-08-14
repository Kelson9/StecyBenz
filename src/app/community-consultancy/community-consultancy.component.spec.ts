import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityConsultancyComponent } from './community-consultancy.component';

describe('CommunityConsultancyComponent', () => {
  let component: CommunityConsultancyComponent;
  let fixture: ComponentFixture<CommunityConsultancyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommunityConsultancyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommunityConsultancyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
