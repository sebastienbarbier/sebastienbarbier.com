import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'route-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
