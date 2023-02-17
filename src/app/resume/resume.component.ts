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
  educations: any;
  years: any;
  age: number;

  constructor() {
    this.age = getAge(new Date(1988, 0, 31));

    this.experiences = [
      {
        name: 'SAP',
        url: 'sap.com',
        location: 'Zurich, Switzerland',
        logo: '/assets/images/sap/sap.svg',
        type: 'Full-time',
        positions: [{
          title: 'Associate Development Architect',
          date: {
           start: new Date('November 01, 2020'),
           end: new Date('July 31, 2021'),
          },
          description: 'Associate Development Architect within the SAP FSM project. Working with micro front-end framework to build a unified interface. Angular base with node backend. ',
        }, {
          title: 'Senior Developer',
          date: {
           start: new Date('February 01, 2020'),
           end: new Date('October 31, 2020'),
          },
          description: 'Full stack lead developer within the SAP FSM project. Working with micro front-end framework to build a unified interface. Angular base with node backend. ',
        }],
      },
      {
        name: 'Self employed',
        location: 'Chiang-Mai, Thailand. Remote work',
        type: 'Freelance',
        logo: '/assets/images/sprb/sebastienbarbier_logo.png',
        positions: [{
          title: 'Web technologies consultant and freelancer',
          date: {
           start: new Date('September 01, 2016'),
           end: new Date('January 31, 2020'),
          },
          description: 'Senior front-end for companies like Mila AG, Mozilla, or Chefclub.',
        }],
      },
      {
        name: 'Fluance AG',
        url: 'fluance.ch',
        location: 'Solothurn, Switzerland',
        type: 'Full-time',
        logo: '/assets/images/fluance/fluance_logo.png',
        positions: [{
          title: 'Front-end Software Engineer',
          date: {
           start: new Date('June 01, 2014'),
           end: new Date('August 31, 2016'),
          },
          description: 'Full-time front-end development on Fluance project : developed an app to aggregate content from HL7 feed of clinics in a generic unified web interface. Team of four front-end. Used mostly AngularJS/jQuery. Manager with Gulp, tested with Jasmine/Karma. Documentation generated using Dgeni. Using SCRUM method.',
        }],
      },
      {
        name: 'Covalia',
        location: 'Besançon, France',
        type: 'Full-time',
        logo: '/assets/images/covalia/covalia_logo.png',
        positions: [{
          title: 'Software Engineer',
          date: {
           start: new Date('September 01, 2012'),
           end: new Date('June 30, 2014'),
          },
          description: 'Work on Covotem, a video chat application for remote medical consultation. Mostly worked on : Java with internal libraries. Interoperability in healthcare system (HL7, DICOM).',
        }],
      },
      {
        name: 'University of Franche-Comté',
        url: 'univ-fcomte.fr',
        location: 'Besançon, France',
        type: 'Part-time',
        logo: '/assets/images/univ-fcomte/univ-fcomte_logo.png',
        positions: [{
          title: 'Part-time Lecturer at ISIFC and UFR ST',
          date: {
           start: new Date('September 01, 2012'),
           end: new Date('January 31, 2013'),
          },
          description: 'Java Courses. Practical, Tutorial class, and Projects - 32 hours, third year students. In parallel to my work at Covalia Interactive S.A.',
        }, {
          title: 'Part-time Lecturer at ISIFC and UFR ST',
          date: {
           start: new Date('September 01, 2011'),
           end: new Date('January 31, 2011'),
          },
          description: 'Java Courses. Practical, Tutorial class, and Projects - 66 hours, third year students. In parallel to my work at Ionyse.',
        }],
      },
      {
        name: 'Ionyse',
        location: 'Besançon, France',
        type: 'Full-time then Part-time',
        logo: '/assets/images/ionyse/ionyse_logo.png',
        positions: [{
          title: 'Co-founder and Full-stack developer',
          date: {
           start: new Date('July 01, 2009'),
           end: new Date('June 30, 2012'),
          },
          description: 'Start this project in parallel of our studies, to help financing them. After 24 months part-time change to a full-time job. Web agency, worked on web application for small companies. ',
        }],
      }
    ];

    this.educations = [
      {
        year: 2011,
        title: 'Master degree in Computer Science - Distributed systems and networks',
        grade: 'magna cum laude',
        university: 'University of Franche-Comté, Science and technology',
        location: 'Besançon, France',
        internship: {
          company: 'Nav6 Laboratory',
          location: 'Penang, Malaysia',
          description: 'Developed C# application using Google API in a real time collaborative space. Integrated to a video chat application in purpose to have real time document edition.',
          duration_in_months: 4,
        }
      }, {
        year: 2009,
        title: 'Bachelor degree in Computer Science',
        grade: 'cum laude',
        university: 'University of Franche-Comté, Science and technology',
        location: 'Besançon, France',
        internship: {
          company: 'MagicLabVision Laboratory',
          location: 'Adelaide, Australia',
          description: 'Research team on an augmented reality application based on Python.',
          duration_in_months: 3,
        }
      }, {
        year: 2008,
        title: 'Final year in Computer Science - ERASMUS',
        university: 'University of Portsmouth',
        location: 'Portsmouth, England',
      }, {
        year: 2007,
        title: 'Higher National Certificate in Computer Science',
        university: 'IUT of Belfort',
        location: 'Belfort, France',
        internship: {
          company: 'Thales Avionics Electrical Systems',
          location: 'Chatou, Île-de-France, France',
          description: 'PHP Developer, using Oracle databases, access archives from a previous ERP.',
          duration_in_months: 3,
        }
      },
    ];


    this.conferences = [{
      date: new Date('August 01, 2022'),
      name: 'Frontend conference',
      location: 'Zurich, Switzerland'
    },{
      date: new Date('June 01, 2022'),
      name: 'NFT Art Day ZRH',
      location: 'Zurich, Switzerland'
    },{
      date: new Date('April 01, 2022'),
      name: 'Devvox France',
      location: 'Paris, France'
    },{
      date: new Date('March 01, 2022'),
      name: 'ETH Dubai',
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
      name: 'CSSConf EU and JSConf EU',
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
