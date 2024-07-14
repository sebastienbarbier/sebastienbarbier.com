import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Badge2 } from './badge.component';

describe('BadgeComponent', () => {
  let component: Badge2;
  let fixture: ComponentFixture<Badge2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Badge2]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Badge2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
