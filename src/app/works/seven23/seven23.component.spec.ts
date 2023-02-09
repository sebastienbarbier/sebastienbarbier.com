import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Seven23Component } from './seven23.component';

describe('Seven23Component', () => {
  let component: Seven23Component;
  let fixture: ComponentFixture<Seven23Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Seven23Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Seven23Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
