import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShelluiComponent } from './shellui.component';

describe('ShelluiComponent', () => {
  let component: ShelluiComponent;
  let fixture: ComponentFixture<ShelluiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShelluiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShelluiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
