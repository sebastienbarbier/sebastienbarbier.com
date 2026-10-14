export default {
  experiences: [
    {
      name: "Shellui",
      company: "shellui",
      location: "Zürich, Switzerland",
      type: "Personal project",
      logo: "/assets/images/shellui/shellui_mark.svg",
      positions: [
        {
          title: "Full-Stack Developer",
          date: {
            start: new Date("January 01, 2026"),
            end: null,
          },
          description: `Building Shellui (shellui.com), an open-source microfrontend shell and CLI that gives apps one navigation and theme. Unified sign-in across apps with OAuth, SAML SSO, magic links, and Supabase Auth. Designed multi-tenant PostgreSQL schemas in Django services and built signed webhooks and Celery jobs with retries and an outbox. Protected releases with 1,000+ tests and CI/CD on each pull request (web and Tauri).`,
        },
      ],
    },
    {
      name: "Unique AG",
      company: "sebastienbarbier",
      location: "Zürich, Switzerland / Remote",
      type: "Full-time",
      logo: "/assets/images/unique/unique-logo-black.svg",
      positions: [
        {
          title: "Staff Frontend Engineer",
          date: {
            start: new Date("December 01, 2023"),
            end: new Date("December 30, 2025"),
          },
          description: `Led frontend for an agentic AI chat platform used by financial services clients. Streamed LLM answers live in the UI, with structured outputs and tool calling in production. Integrated RAG and MCP into chat flows so answers use client context and stay compliant. Partnered with product, design, and backend teams on delivery, keeping release quality high.`,
        },
      ],
    },
    {
      name: "Private investor (own capital)",
      company: "sebastienbarbier",
      location: "Zürich, Switzerland",
      type: "Self-directed",
      logo: "/assets/images/sprb/sebastienbarbier_logo.png",
      positions: [
        {
          title: "Liquidity Provider, Decentralized Finance (DeFi)",
          date: {
            start: new Date("August 01, 2021"),
            end: new Date("November 30, 2023"),
          },
          description: `Provided liquidity to on-chain DeFi AMM pools, fully funding living costs for 2+ years. In parallel, maintained Seven23, an open-source, end-to-end encrypted budget app (React, Redux, Django REST Framework, Docker), with 170+ GitHub stars across its repositories. Built FromEdwin.com as a learning project on asynchronous performance metrics, owning architecture, backend, observability, and CI/CD.`,
        },
      ],
    },
    {
      name: "SAP (Schweiz) AG, FSM",
      company: "SAP",
      url: "sap.com",
      location: "Zürich, Switzerland / Remote",
      logo: "/assets/images/sap/sap.svg",
      type: "Full-time",
      positions: [
        {
          title: "Associate Development Architect",
          date: {
            start: new Date("February 01, 2020"),
            end: new Date("July 31, 2021"),
          },
          description: `Joined the team building FSM microfrontends as Technical Lead, then promoted to Associate Development Architect. Co-designed the FSM extensibility concept for secure third-party integrations, driving partner adoption with code samples and public webinars. Prepared management decisions on FSM target architecture by assessing risks and effort. Designed, coded, and tested complex FSM features, mentored junior developers, and coached the team on architecture, simplicity, and best practices.`,
        },
      ],
    },
    {
      name: "Self-employed",
      company: "sebastienbarbier",
      location: "Chiang Mai, Thailand / Remote",
      type: "Freelance",
      logo: "/assets/images/sprb/sebastienbarbier_logo.png",
      positions: [
        {
          title: "Web Technologies Consultant and Freelancer",
          date: {
            start: new Date("September 01, 2016"),
            end: new Date("January 31, 2020"),
          },
          description: `Built the UI of Mozilla's Notes by Firefox extension and contributed to its React Native app. Delivered chatbots, PWAs, and web integrations for clients including Chefclub and Mila AG. Worked remotely and independently with international clients, from first call to release.`,
          images: [
            {
              src: "/assets/images/chefclub/chefclub-logo.png",
              alt: "Chefclub logo",
            },
            {
              src: "/assets/images/mozilla/mozilla_logo.svg",
              alt: "Mozilla logo",
            },
            {
              src: "/assets/images/mila/logo_02_blue.png",
              alt: "Mila AG logo",
            },
          ],
        },
      ],
    },
    {
      name: "Fluance AG",
      company: "Fluance",
      url: "fluance.ch",
      location: "Solothurn, Switzerland",
      type: "Full-time",
      logo: "/assets/images/fluance/fluance_logo.png",
      positions: [
        {
          title: "Front-end Developer / Technical Lead",
          date: {
            start: new Date("June 01, 2014"),
            end: new Date("August 31, 2016"),
          },
          description:
            "Led frontend in a four-person Scrum team building a cross-platform HL7 patient data interface. Owned documentation, testing, and deployment; stack: AngularJS, jQuery, and Foundation CSS.",
        },
      ],
    },
    {
      name: "Covalia",
      company: "Covalia",
      location: "Besançon, France",
      type: "Full-time",
      logo: "/assets/images/covalia/covalia_logo.png",
      positions: [
        {
          title: "Java Developer",
          date: {
            start: new Date("September 01, 2012"),
            end: new Date("June 30, 2014"),
          },
          description: `Maintained Java HL7/DICOM exchange for a telemedicine platform under ISO 13485.`,
        },
      ],
    },
    {
      name: "University of Franche-Comté",
      company: "University of Franche-Comté",
      url: "univ-fcomte.fr",
      location: "Besançon, France",
      type: "Part-time",
      logo: "/assets/images/univ-fcomte/univ-fcomte_logo.png",
      positions: [
        {
          title: "Part-time Lecturer",
          date: {
            start: new Date("September 01, 2011"),
            end: new Date("September 30, 2012"),
          },
          description:
            "Taught 98 hours of practical Java and HTML/CSS to third-year engineering students (September 2011 and September 2012).",
        },
      ],
    },
    {
      name: "Ionyse",
      company: "Ionyse",
      location: "Besançon, France",
      type: "Part-time then Full-time",
      logo: "/assets/images/ionyse/ionyse_logo.png",
      positions: [
        {
          title: "Co-founder and Full-stack Developer",
          date: {
            start: new Date("July 01, 2009"),
            end: new Date("June 30, 2012"),
          },
          description: `Co-founded a web agency during my master's, building client websites on a Python/Django CMS.`,
        },
      ],
    },
  ],
  educations: [
    {
      year: 2011,
      title: "Master's in Computer Science",
      university: "University of Franche-Comté",
      location: "Besançon, France",
      subtitle: "Distributed Systems and Networks",
    },
    {
      year: 2009,
      title: "Bachelor's in Computer Science",
      university: "University of Franche-Comté",
      location: "Besançon, France",
    },
  ],
  conferences: [
    {
      date: new Date("September 11, 2026"),
      name: "ZurichJS Conf",
      location: "Zurich, Switzerland",
    },
    {
      date: new Date("June 04, 2024"),
      name: "DjangoCon Europe",
      location: "Vigo, Spain",
    },
    {
      date: new Date("December 15, 2023"),
      name: "Pycon Thailand",
      location: "Bangkok, Thailand",
    },
    {
      date: new Date("August 01, 2022"),
      name: "Front Conference",
      location: "Zurich, Switzerland",
    },
    {
      date: new Date("June 01, 2022"),
      name: "NFT Art Day ZRH",
      location: "Zurich, Switzerland",
    },
    {
      date: new Date("April 01, 2022"),
      name: "Devvox France",
      location: "Paris, France",
    },
    {
      date: new Date("March 01, 2022"),
      name: "ETH Dubai",
      location: "Dubai, United Arab Emirates",
    },
    {
      date: new Date("August 01, 2021"),
      name: "Front Conference",
      location: "Zurich, Switzerland",
    },
    {
      date: new Date("January 01, 2020"),
      name: "FOSDEM",
      location: "Bruxelles, Belgium",
    },
    {
      date: new Date("May 01, 2019"),
      name: "CSSConf EU and JSConf EU",
      location: "Berlin, Germany",
    },
    {
      date: new Date("August 01, 2018"),
      name: "Front Conference",
      location: "Zurich, Switzerland",
    },
    {
      date: new Date("May 01, 2018"),
      name: "DjangoCon Europe",
      location: "Heidelberg, Germany",
    },
    {
      date: new Date("June 01, 2017"),
      name: "ELM Europe",
      location: "Villejuif, France",
    },
    {
      date: new Date("March 01, 2016"),
      name: "DjangoCon Europe",
      location: "Budapest, Hungary",
    },
    {
      date: new Date("October 01, 2015"),
      name: "Fronteers conference",
      location: "Amsterdam, Netherland",
    },
    {
      date: new Date("July 01, 2015"),
      name: "React Europe",
      location: "Paris, France",
    },
    {
      date: new Date("June 01, 2015"),
      name: "DjangoCon Europe",
      location: "Cardiff, Wales",
    },
    {
      date: new Date("January 01, 2015"),
      name: "FOSDEM",
      location: "Bruxelles, Belgium",
    },
    {
      date: new Date("May 01, 2014"),
      name: "DjangoCon Europe",
      location: "Toulon, France",
    },
    {
      date: new Date("April 01, 2012"),
      name: "DjangoCong",
      location: "Carnon-Montpellier, France",
    },
  ],
};
