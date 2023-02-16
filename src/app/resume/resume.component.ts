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
  years: any;
  age: number;

  constructor() {
    this.age = getAge(new Date(1988, 0, 31));

    this.experiences = [
      {
        date: 'February 2020 - July 2021 (18 months)',
        company: {
          name: 'SAP',
          url: 'sap.com',
          location: 'Zurich, Switzerland'
        },
        title: 'Senior Developer and Associate Development Architect',
        description: 'Full stack lead developer (6 month), then Associate Development Architect within the SAP FSM project. Working with micro front-end framework to build a unified interface. Angular base with node backend. ',
      },
      {
        date: 'November 2016 - January 2020 (3 years and 3 months)',
        company: {
          name: 'Self employed',
          location: 'Remote work, Thailand',
        },
        title: 'Web technologies consultant and freelancer',
        description: 'Senior front-end for companies like Mila, Mozilla, or Chefclub.',
      },
      {
        date: 'June 2014 - August 2016 (2 years and 3 months)',
        company: {
          name: 'Fluance',
          url: 'fluance.ch',
          location: 'Solothurn, Switzerland',
        },
        title: 'Front-end Software Engineer',
        description: 'Full-time front-end development on Fluance project : developed an app to aggregate content from HL7 feed of clinics in a generic unified web interface. Team of four front-end. Used mostly AngularJS/jQuery. Manager with Gulp, tested with Jasmine/Karma. Documentation generated using Dgeni. Using SCRUM method.',
      },
      {
        date: 'September 2012 - June 2014 (1 year and 10 months)',
        company: {
          name: 'Covalia',
          location: 'Besançon, France',
        },
        title: 'Software Engineer',
        description: 'Work on Covotem, a video chat application for remote medical consultation. Mostly worked on : Java with internal libraries. Interoperability in healthcare system (HL7, DICOM).',
      },
      {
        date: 'First semester 2011 and first semester 2012',
        company: {
          name: 'University of Franche-Comté (ISIFC and UFR ST)',
          url: 'univ-fcomte.fr',
          location: 'Besançon, France',
        },
        title: 'Lecturer',
        description: 'Java Courses. Practical, Tutorial class, and Projects - respectively 66 and 32 hours, third year students. ',
      },
      {
        date: 'July 2009 - June 2012 (2 years part time, 1 year full time)',
        company: {
          name: 'Ionyse',
          location: 'Besançon, France',
        },
        title: 'Co-founder and web developer',
        description: 'Start this project in parallel of our studies, to help financing them. After 24 months part-time change to a full-time job. Web agency, worked on web application for small companies. ',
      }
    ];

    this.conferences = [{
      date: new Date('August 01, 2022'),
      name: 'Frontend conference',
      location: 'Zurich, Switzerland'
    },{
      date: new Date('April 01, 2022'),
      name: 'Devvox France',
      location: 'Paris, France'
    },{
      date: new Date('March 01, 2022'),
      name: 'ETHDubai',
      location: 'Dubai, United Arab Emirates'
    },{
      date: new Date('August 01, 2021'),
      name: 'Frontend conference',
      location: 'Zurich, Switzerland'
    },{
      date: new Date('January 01, 2020'),
      name: 'FOSDEM',
      location: 'Bruxelles, Belgium'
    },{
      date: new Date('May 01, 2019'),
      name: 'CSSConfEU and JSConfEU',
      location: 'Berlin, Germany'
    },{
      date: new Date('August 01, 2018'),
      name: 'Frontend conference',
      location: 'Zurich, Switzerland'
    },{
      date: new Date('May 01, 2018'),
      name: 'DjangoCon Europe',
      location: 'Heidelberg, Germany'
    },{
      date: new Date('June 01, 2017'),
      name: 'ELM Europe',
      location: 'Villejuif, France'
    },{
      date: new Date('March 01, 2016'),
      name: 'DjangoCon Europe',
      location: 'Budapest, Hungary'
    },{
      date: new Date('October 01, 2015'),
      name: 'Fronteers conference',
      location: 'Amsterdam, Netherland'
    },{
      date: new Date('July 01, 2015'),
      name: 'React Europe',
      location: 'Paris, France'
    },{
      date: new Date('June 01, 2015'),
      name: 'DjangoCon Europe',
      location: 'Cardiff, Wales'
    },{
      date: new Date('January 01, 2015'),
      name: 'FOSDEM',
      location: 'Bruxelles, Belgium'
    },{
      date: new Date('May 01, 2014'),
      name: 'DjangoCon Europe',
      location: 'Toulon, France'
    },{
      date: new Date('April 01, 2012'),
      name: 'DjangoCong',
      location: 'Carnon-Montpellier, France'
    }];

    this.conferences = this.conferences.reduce((acc: any, conf: any) => {
      const year = conf.date.getFullYear();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(conf);
      return acc;
    }, {});

    this.years = Object.keys(this.conferences).sort((a, b) => b > a ? 1 : -1);
  }

  @HostBinding('@resumeTransition') '': string;

  ngOnInit(): void {
  }

}
