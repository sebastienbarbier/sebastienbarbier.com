import { Component, Inject, OnInit, HostBinding, PLATFORM_ID } from '@angular/core';
import { formatDate } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';

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
  graph: any;
  isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    this.age = getAge(new Date(1988, 0, 31));

    // Data are stored within a typescipt object
    // (not json to have Date object instead of string)
    this.experiences = resume_json.experiences;
    this.educations = resume_json.educations;
    this.conferences = resume_json.conferences;
    this.isBrowser = isPlatformBrowser(platformId);

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

    // Radar graph to show skills
    this.graph = {
      radar: {
        indicator: [
          { name: 'HTML/CSS', max: 8 },
          { name: 'Javascript/Typescript', max: 8 },
          { name: 'Python', max: 8 },
          { name: 'Library design', max: 8 },
          { name: 'Devops', max: 8 },
          { name: 'Project Management', max: 8 },
          { name: 'Concept Development', max: 8 },
        ],
        shape: 'circle',
        splitNumber: 8,
        axisName: {
          color: 'rgb(217, 151, 0)'
        },
        splitLine: {
          lineStyle: {
            color: [
              'rgba(217, 151, 0, 0.1)',
              'rgba(217, 151, 0, 0.2)',
              'rgba(217, 151, 0, 0.2)',
              'rgba(217, 151, 0, 0.4)',
              'rgba(217, 151, 0, 0.4)',
              'rgba(217, 151, 0, 0.6)',
              'rgba(217, 151, 0, 0.6)',
              'rgba(217, 151, 0, 0.8)',
              'rgba(217, 151, 0, 1)'
            ].reverse(),
          }
        },
        splitArea: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(217, 151, 0, 0.5)'
          }
        }
      },
      series: [
        {
          type: 'radar',
          lineStyle: {
            width: 1,
            opacity: 0.5
          },
          data: [[8, 8, 6, 7, 5, 7, 7]],
          symbol: 'none',
          itemStyle: {
            color: 'rgb(168, 115, 0)'
          },
          areaStyle: {
            opacity: 0.1
          }
        }
      ]
    };
  }

  @HostBinding('@resumeTransition') '': string;

  ngOnInit(): void {
  }

}
