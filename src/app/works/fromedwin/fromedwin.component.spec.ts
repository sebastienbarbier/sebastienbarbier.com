import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FromedwinComponent } from './fromedwin.component';

describe('FromedwinComponent', () => {
  let component: FromedwinComponent;
  let fixture: ComponentFixture<FromedwinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FromedwinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FromedwinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
