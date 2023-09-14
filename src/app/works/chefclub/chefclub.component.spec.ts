import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChefclubComponent } from './chefclub.component';

describe('ChefclubComponent', () => {
  let component: ChefclubComponent;
  let fixture: ComponentFixture<ChefclubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChefclubComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChefclubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
