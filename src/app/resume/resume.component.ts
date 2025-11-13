import { Component, Inject, OnInit, HostBinding, PLATFORM_ID } from '@angular/core';

import {
  trigger,
  transition,
} from '@angular/animations';

import resume_json from './resume.data';

const resumeTransition = trigger('resumeTransition', [
  transition(':enter', [
  ]),
  transition(':leave', [
  ])
]);

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
  animations: [ resumeTransition ],
  standalone: false
})
export class ResumeComponent implements OnInit {

  experiences: any;
  conferences: any;
  educations: any;
  years: any;
  age: number;
  graph: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any
  ) {
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

  ngOnInit(): void {
  }

  @HostBinding('@resumeTransition') '': string;

  // // Event to update skill graph on resize
  // @HostListener('window:resize', ['$event'])
  // onResize(event: any) {
  //   if (event.target.innerWidth < TINY_SCREEN_SIZE && !this.isTinyScreen) {
  //     this.isTinyScreen = true;
  //     this.setGraph();
  //   } else if (event.target.innerWidth >= TINY_SCREEN_SIZE && this.isTinyScreen) {
  //     this.isTinyScreen = false;
  //     this.setGraph();
  //   }
  // }

  // setGraph() {
  //   this.graph = {
  //     radar: {
  //       indicator: [
  //         { name: 'HTML/CSS', max: 8 },
  //         { name: 'Front-End', max: 8 },
  //         { name: 'Back-End', max: 8 },
  //         { name: 'Library design', max: 8 },
  //         { name: 'Devops', max: 8 },
  //         { name: 'Project Management', max: 8 },
  //         { name: 'Concept Development', max: 8 },
  //       ],
  //       center: ['40%', '55%'],
  //       radius: this.isTinyScreen ? '40%' :'65%',
  //       shape: 'circle',
  //       splitNumber: 8,
  //       axisName: {
  //         fontSize: 12,
  //         color: 'rgb(168, 115, 0)',
  //         overflow: 'breakAll',
  //       },
  //       nameGap: 15,
  //       scale: true,
  //       splitLine: {
  //         lineStyle: {
  //           color: [
  //             'rgba(168, 115, 0, 0.1)',
  //             'rgba(168, 115, 0, 0.2)',
  //             'rgba(168, 115, 0, 0.2)',
  //             'rgba(168, 115, 0, 0.4)',
  //             'rgba(168, 115, 0, 0.4)',
  //             'rgba(168, 115, 0, 0.6)',
  //             'rgba(168, 115, 0, 0.6)',
  //             'rgba(168, 115, 0, 0.8)',
  //             'rgba(168, 115, 0, 1)'
  //           ].reverse(),
  //         }
  //       },
  //       splitArea: {
  //         show: false
  //       },
  //       axisLine: {
  //         lineStyle: {
  //           color: 'rgba(168, 115, 0, 0.5)'
  //         }
  //       }
  //     },
  //     series: [
  //       {
  //         type: 'radar',
  //         lineStyle: {
  //           width: 1,
  //           opacity: 0.5
  //         },
  //         data: [[8, 8, 6, 7, 5, 7, 7]],
  //         symbol: 'none',
  //         itemStyle: {
  //           color: 'rgb(168, 115, 0)'
  //         },
  //         areaStyle: {
  //           opacity: 0.1
  //         }
  //       }
  //     ]
  //   };
  // }
}
