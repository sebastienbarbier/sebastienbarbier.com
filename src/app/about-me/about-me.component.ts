import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements OnInit {

  clients_order = ['chefclub', 'mozilla', 'mila'];
  clients = {
    chefclub: {
      label: 'Chefclub',
      logo: 'https://cdn2.sebastienbarbier.com/images/chefclub/chefclub-logo.png',
      date: '2018 - 2019',
      type: 'freelance.chefclub.type',
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
      gallery: [{
        small: 'https://cdn2.sebastienbarbier.com/images/chefclub/chefclub-saint-calentin.600.jpg',
        large: 'https://cdn2.sebastienbarbier.com/images/chefclub/chefclub-saint-calentin.1800.jpg',
        style: 'large'
      },{
        small: 'https://cdn2.sebastienbarbier.com/images/chefclub/chefclub-screens.600.jpg',
        large: 'https://cdn2.sebastienbarbier.com/images/chefclub/chefclub-screens.1800.jpg'
      },{
        small: 'https://cdn2.sebastienbarbier.com/images/chefclub/chefclub-mobile.600.jpg',
        large: 'https://cdn2.sebastienbarbier.com/images/chefclub/chefclub-mobile.1800.jpg'
      }]
    },
    mozilla: {
      label: 'Mozilla',
      logo: 'https://cdn2.sebastienbarbier.com/images/mozilla/mozilla_logo.svg',
      date: '2018',
      type: 'freelance.mozilla.type',
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
      gallery: [{
        small: 'https://cdn2.sebastienbarbier.com/images/mozilla/galery_1_screens.600.jpg',
        large: 'https://cdn2.sebastienbarbier.com/images/mozilla/galery_1_screens.1800.jpg',
        style: 'large'
      },{
        small: 'https://cdn2.sebastienbarbier.com/images/mozilla/galery_2_list.600.jpg',
        large: 'https://cdn2.sebastienbarbier.com/images/mozilla/galery_2_list.1800.jpg'
      },{
        small: 'https://cdn2.sebastienbarbier.com/images/mozilla/galery_3_note.600.jpg',
        large: 'https://cdn2.sebastienbarbier.com/images/mozilla/galery_3_note.1800.jpg'
      },{
        small: 'https://cdn2.sebastienbarbier.com/images/mozilla/galery_4_app.600.jpg',
        large: 'https://cdn2.sebastienbarbier.com/images/mozilla/galery_4_app.1800.jpg'
      }]
    },
    mila: {
      label: 'Mila',
      logo: 'https://cdn2.sebastienbarbier.com/images/mila/logo_02_blue.png',
      date: '2017',
      type: 'freelance.mila.type',
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
  gallery = []

  constructor(@Inject(DOCUMENT) private d ) {
  }

  ngOnInit() {
    for (let index in this.clients_order) {
      for (let image in this.clients[this.clients_order[index]].gallery) {
        this.gallery.push(this.clients[this.clients_order[index]].gallery[image]);
      }
    }
  }

  disableScrolling(value) {
    if (this.d) {
      if (value) {
        this.d.body.style.overflow = "hidden";
      } else {
        this.d.body.style.overflow = "auto";
      }
    }
  }

}
