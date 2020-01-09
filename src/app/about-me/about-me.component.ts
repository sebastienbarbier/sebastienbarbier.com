import { Component, OnInit, Inject, Renderer2 } from '@angular/core';
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
      logo: '/assets/images/chefclub/chefclub-logo.png',
      date: '2018 - 2019',
      type: 'about_me.chefclub.type',
      location: 'about_me.chefclub.location',
      description: 'about_me.chefclub.description',
      work: 'about_me.chefclub.work',
      stack: ['about_me.tools.integration', 'CSS', 'Vanilla JS', 'Vue.js', 'Django'],
      website: 'about_me.chefclub.website',
      website_url: 'https://chefclub.tv',
      github: null,
      github_url: null,
      previous: null,
      next: 'mozilla',
      gallery: [{
        small: '/assets/images/chefclub/chefclub-saint-calentin.600.jpg',
        large: '/assets/images/chefclub/chefclub-saint-calentin.1800.jpg',
        style: 'large'
      },{
        small: '/assets/images/chefclub/chefclub-screens.600.jpg',
        large: '/assets/images/chefclub/chefclub-screens.1800.jpg'
      },{
        small: '/assets/images/chefclub/chefclub-mobile.600.jpg',
        large: '/assets/images/chefclub/chefclub-mobile.1800.jpg'
      }]
    },
    mozilla: {
      label: 'Mozilla',
      logo: '/assets/images/mozilla/mozilla_logo.svg',
      date: '2018',
      type: 'about_me.mozilla.type',
      location: 'about_me.mozilla.location',
      description: 'about_me.mozilla.description',
      work: 'about_me.mozilla.work',
      stack: ['Web extention', 'React', 'Redux', 'Kinto.js', 'React-native', 'Material design'],
      website: 'about_me.mozilla.website',
      website_url: 'https://testpilot.firefox.com/experiments/notes',
      github: 'about_me.mozilla.github',
      github_url: 'https://github.com/mozilla/notes',
      previous: 'chefclub',
      next: 'mila',
      gallery: [{
        small: '/assets/images/mozilla/galery_1_screens.600.jpg',
        large: '/assets/images/mozilla/galery_1_screens.1800.jpg',
        style: 'large'
      },{
        small: '/assets/images/mozilla/galery_2_list.600.jpg',
        large: '/assets/images/mozilla/galery_2_list.1800.jpg'
      },{
        small: '/assets/images/mozilla/galery_3_note.600.jpg',
        large: '/assets/images/mozilla/galery_3_note.1800.jpg'
      },{
        small: '/assets/images/mozilla/galery_4_app.600.jpg',
        large: '/assets/images/mozilla/galery_4_app.1800.jpg'
      }]
    },
    mila: {
      label: 'Mila',
      logo: '/assets/images/mila/logo_02_blue.png',
      date: '2017',
      type: 'about_me.mila.type',
      location: 'about_me.mila.location',
      description: 'about_me.mila.description',
      work: 'about_me.mila.work',
      stack: ['Messenger api', 'Node.js', 'Typescript', 'Angular', 'Material design', 'Contentful.com services'],
      website: 'about_me.mila.website',
      website_url: 'https://mila.com',
      github: null,
      github_url: null,
      previous: 'mozilla',
      next: null,
    }
  };
  gallery = []

  constructor(private renderer: Renderer2,
              @Inject(DOCUMENT) private d) {
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
        this.renderer.setAttribute(this.d.getElementById('navigation__button'), 'class', 'hide');
        this.d.body.style.overflow = "hidden";
      } else {
        this.renderer.setAttribute(this.d.getElementById('navigation__button'), 'class', 'show');
        this.d.body.style.overflow = "auto";
      }
    }
  }

}
