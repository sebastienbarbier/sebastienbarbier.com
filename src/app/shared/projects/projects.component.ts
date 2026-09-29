import { Component, OnInit, Attribute, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class ProjectsComponent implements OnInit {

  quinconce: Boolean;

  constructor(@Attribute('quinconce') public q: string) {
    this.quinconce = q == '' ? true : false;
  }

  ngOnInit() {
  }

}
