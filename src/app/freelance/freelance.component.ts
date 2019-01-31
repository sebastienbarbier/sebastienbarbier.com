import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-freelance',
  templateUrl: './freelance.component.html',
  styleUrls: ['./freelance.component.scss']
})
export class FreelanceComponent implements OnInit {

  clients_order = ['chefclub', 'mozilla', 'mila'];
  clients = {
    chefclub: {
      label: 'Chefclub',
      logo: 'https://cdn2.sebastienbarbier.com/images/chefclub/chefclub-logo.png',
      date: '2018 - 2019',
      type: 'Site internet',
      location: 'freelance.chefclub.location',
      description: 'freelance.chefclub.description',
      work: 'freelance.chefclub.work',
      stack: ['freelance.tools.integration', 'CSS', 'Vanilla JS', 'Vue.js', 'Django'],
      website: 'freelance.chefclub.website',
      website_url: 'https://chefclub.tv',
      github: null,
      github_url: null,
      previous: null,
      next: 'mozilla',
    },
    mozilla: {
      label: 'Mozilla',
      logo: 'https://cdn2.sebastienbarbier.com/images/mozilla/mozilla_logo.svg',
      date: '2018',
      type: 'Extention web<br />Application Mobile',
      location: 'freelance.mozilla.location',
      description: 'freelance.mozilla.description',
      work: 'freelance.mozilla.work',
      stack: ['Web extention', 'React', 'Redux', 'Kinto.js', 'React-native', 'Material design'],
      website: 'freelance.mozilla.website',
      website_url: 'https://testpilot.firefox.com/experiments/notes',
      github: 'freelance.mozilla.github',
      github_url: 'https://github.com/mozilla/notes',
      previous: 'chefclub',
      next: 'mila',
    },
    mila: {
      label: 'Mila',
      logo: 'https://cdn2.sebastienbarbier.com/images/mila/logo_02_blue.png',
      date: '2017',
      type: 'Chatbot<br />Application web',
      location: 'freelance.mila.location',
      description: 'freelance.mila.description',
      work: 'freelance.mila.work',
      stack: ['Messenger api', 'Node.js', 'Typescript', 'Angular', 'Material design', 'Contentful.com services'],
      website: 'freelance.mila.website',
      website_url: 'https://mila.com',
      github: null,
      github_url: null,
      previous: 'mozilla',
      next: null,
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
