import { Component, OnInit, HostBinding } from '@angular/core';
import { formatDate } from '@angular/common';

import {
  sequence,
  trigger,
  stagger,
  animate,
  style,
  group,
  query,
  transition,
  keyframes,
  animateChild } from '@angular/animations';

import resume_json from './resume.data';

const resumeTransition = trigger('resumeTransition', [
  transition(':enter', [
  ]),
  transition(':leave', [
  ])
]);

// copilot generated function calculat today's age
function getAge (birthDate: Date) {
  var today = new Date();
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
  }
  return age;
}

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss'],
  animations: [ resumeTransition ]
})
export class ResumeComponent implements OnInit {

  experiences: any;
  conferences: any;
  educations: any;
  years: any;
  age: number;

  constructor() {
    this.age = getAge(new Date(1988, 0, 31));

    // Data are stored within a typescipt object
    // (not json to have Date object instead of string)
    this.experiences = resume_json.experiences;
    this.educations = resume_json.educations;
    this.conferences = resume_json.conferences;

    // Get list of year with array or conference for display purpose
    this.conferences = this.conferences.reduce((acc: any, conf: any) => {
      const year = conf.date.getFullYear();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(conf);
      return acc;
    }, {});

    // List of years for conference display
    this.years = Object.keys(this.conferences).sort((a, b) => b > a ? 1 : -1);
  }

  @HostBinding('@resumeTransition') '': string;

  ngOnInit(): void {
  }

}
