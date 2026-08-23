import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-legal',
  templateUrl: './legal.component.html',
  styleUrls: ['./legal.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class LegalComponent implements OnInit {

  version: string = environment.version;

  constructor() { }

  ngOnInit() {
  }

}
