import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-legal',
  templateUrl: './legal.component.html',
  styleUrls: ['./legal.component.scss'],
  standalone: false
})
export class LegalComponent implements OnInit {

  version: string = environment.version;

  constructor() { }

  ngOnInit() {
  }

}
