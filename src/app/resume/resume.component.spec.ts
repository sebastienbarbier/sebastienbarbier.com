import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeComponent } from './resume.component';

describe('ResumeComponent', () => {
  let component: ResumeComponent;
  let fixture: ComponentFixture<ResumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should link to the public resume PDF', () => {
    const link: HTMLAnchorElement | null =
      fixture.nativeElement.querySelector('a.resume-pdf__link');
    expect(link).withContext('download link').toBeTruthy();
    expect(link?.getAttribute('href')).toBe('/sebastien-barbier-resume.pdf');
    expect(link?.textContent?.trim()).toBe('Download PDF');
  });
});
