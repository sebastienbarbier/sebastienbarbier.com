import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelanceComponent } from './freelance.component';

describe('FreelanceComponent', () => {
  let component: FreelanceComponent;
  let fixture: ComponentFixture<FreelanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreelanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreelanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
